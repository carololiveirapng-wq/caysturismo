"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import { LinkArrow } from "@/components/ui/link-arrow";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TestimonialCard } from "@/components/home/testimonial-card";
// TODO CMS: reviews — substituir pela integração com a Google Places API
// assim que estiver disponível. Nunca exibir como avaliação real até lá.
import { reviews as allReviews } from "@/data/home";
import { getActiveOrderedItems } from "@/lib/content";
import type { GoogleReview } from "@/types";

export function Testimonials() {
  const reviews = getActiveOrderedItems(allReviews);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 7000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      playOnInit: false,
    }),
  );
  const [api, setApi] = useState<CarouselApi>();

  // Depoimento aberto no modal "ler completo" — null = modal fechado.
  const [activeReview, setActiveReview] = useState<GoogleReview | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  function openReview(review: GoogleReview, trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setActiveReview(review);
  }

  function closeReview() {
    setActiveReview(null);
    // Devolve o foco pro botão "Ler depoimento completo" que abriu o modal.
    lastTriggerRef.current?.focus();
    lastTriggerRef.current = null;
  }

  useEffect(() => {
    if (!api) return;
    const plugin = api.plugins().autoplay;
    if (!plugin) return;

    // Modal aberto pausa o autoplay, assim como reduced-motion; os dois têm
    // prioridade sobre a visibilidade da aba.
    if (reducedMotion || activeReview) {
      plugin.stop();
      return;
    }
    plugin.play();

    const onVisibility = () => {
      if (document.hidden) plugin.stop();
      else plugin.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [api, reducedMotion, activeReview]);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-sand py-16 md:py-20">
      <Container className="text-center">
        <EditorialHeading as="h2" size="lg" className="mx-auto max-w-xl">
          Histórias de quem já viajou com a Cays.
        </EditorialHeading>
      </Container>

      <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay]} setApi={setApi}>
        <Container className="mt-10 md:mt-12">
          <div className="relative">
            <CarouselContent className="-ml-5">
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="min-w-0 basis-[85%] self-start pl-5 sm:basis-[55%] lg:basis-[35%]"
                >
                  <TestimonialCard review={review} onReadMore={openReview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselCircleNav tone="light" edge="outset" />
          </div>
        </Container>
      </Carousel>

      <Dialog open={activeReview !== null} onOpenChange={(open) => !open && closeReview()}>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[calc(100%-1.5rem)] rounded-none border border-ink/10 bg-ivory p-0 text-ink ring-0 sm:max-w-xl md:max-w-2xl"
        >
          {activeReview && (
            <div className="relative max-h-[85svh] overflow-y-auto p-7 md:max-h-[75vh] md:p-10">
              <DialogClose className="absolute top-4 right-4 flex size-10 shrink-0 items-center justify-center border border-ink/15 bg-ivory text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-sand">
                <X className="size-4" aria-hidden />
                <span className="sr-only">Fechar</span>
              </DialogClose>

              <DialogTitle className="sr-only">
                Depoimento completo de {activeReview.authorName}
              </DialogTitle>

              <StarRating rating={activeReview.rating} />
              <blockquote className="mt-5 max-w-none pr-8 font-serif text-xl leading-relaxed whitespace-pre-line text-ink md:text-2xl md:leading-[1.5]">
                &ldquo;{activeReview.text}&rdquo;
              </blockquote>

              <figcaption className="mt-7 text-sm text-stone">
                <span className="block font-medium text-ink">{activeReview.authorName}</span>
                {activeReview.relativeTime && (
                  <span className="mt-0.5 block">{activeReview.relativeTime}</span>
                )}
              </figcaption>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-stone/80">
                  <GoogleIcon className="size-3.5" />
                  Google Reviews
                </span>
                {activeReview.reviewUrl && (
                  <LinkArrow href={activeReview.reviewUrl} target="_blank" rel="noopener noreferrer" className="text-xs">
                    Ver no Google
                  </LinkArrow>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
