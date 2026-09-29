"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import { LinkArrow } from "@/components/ui/link-arrow";
// TODO CMS: reviews — substituir pela integração com a Google Places API
// assim que estiver disponível. Nunca exibir como avaliação real até lá.
import { reviews as allReviews } from "@/data/home";
import { getActiveOrderedItems } from "@/lib/content";

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

  useEffect(() => {
    if (!api) return;
    const plugin = api.plugins().autoplay;
    if (!plugin) return;

    if (reducedMotion) {
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
  }, [api, reducedMotion]);

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
                  className="basis-[85%] pl-5 sm:basis-[55%] lg:basis-[35%]"
                >
                  <figure className="flex h-full flex-col justify-between border border-ink/10 bg-ivory p-7 md:p-8">
                    <div>
                      <StarRating rating={review.rating} />
                      <blockquote className="mt-4 font-serif text-lg leading-snug text-ink md:text-xl">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>
                    </div>

                    <div className="mt-7">
                      <figcaption className="text-sm text-stone">
                        <span className="block font-medium text-ink">{review.authorName}</span>
                        {review.relativeTime && <span className="mt-0.5 block">{review.relativeTime}</span>}
                      </figcaption>

                      <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-stone/80">
                          <GoogleIcon className="size-3.5" />
                          Google Reviews
                        </span>
                        {review.reviewUrl && (
                          <LinkArrow
                            href={review.reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                          >
                            Ver no Google
                          </LinkArrow>
                        )}
                      </div>
                    </div>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselCircleNav tone="light" />
          </div>
        </Container>
      </Carousel>
    </section>
  );
}
