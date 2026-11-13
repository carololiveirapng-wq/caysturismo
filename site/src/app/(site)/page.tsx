import { Hero } from "@/components/home/hero";
import { OnlineBooking } from "@/components/home/online-booking";
import { Manifesto } from "@/components/home/manifesto";
import { Positioning } from "@/components/home/positioning";
import { Experiences } from "@/components/home/experiences";
import { JourneyProcess } from "@/components/home/journey-process";
import { DestinationsSection } from "@/components/home/destinations/destinations-section";
import { Journal } from "@/components/home/journal";
import { FeaturedJourney } from "@/components/home/featured-journey";
import { TravelerStories } from "@/components/home/traveler-stories";
import { Testimonials } from "@/components/home/testimonials";
import { BeyondItinerary } from "@/components/home/beyond-itinerary";
import { FinalCTA } from "@/components/home/final-cta";
import { getHome, getSettings, getTestimonials } from "@/lib/cms";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** SEO da Home: usa o que está no Studio (Páginas > Home > SEO) e, se vazio, cai no padrão do layout. */
export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  const title = home?.seo?.title?.trim();
  const description = home?.seo?.description?.trim();
  if (!title && !description) return {};
  const ogImage = home?.hero.image?.src ?? home?.hero.images?.[0]?.src ?? home?.hero.videoPoster?.src;
  return {
    ...(title && { title: { absolute: title } }),
    ...(description && { description }),
    alternates: { canonical: "/" },
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "pt_BR",
      type: "website",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function Home() {
  const [home, settings, testimonials] = await Promise.all([
    getHome(),
    getSettings(),
    getTestimonials(),
  ]);

  if (!home) notFound();

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;

  return (
    <>
      <Hero hero={home.hero} city={settings.city} foundedYear={foundedYear} />
      <OnlineBooking />
      {home.manifesto && <Manifesto manifesto={home.manifesto} />}
      {settings.slogan && (
        <Positioning slogan={settings.slogan} foundedYear={foundedYear} positioning={home.positioning} />
      )}
      {home.featuredExperiences.length > 0 && <Experiences experiences={home.featuredExperiences} />}
      {(home.featuredDestinations.length > 0 || home.destinationCollections.length > 0) && (
        <DestinationsSection destinations={home.featuredDestinations} collections={home.destinationCollections} />
      )}
      {home.featuredTravelProducts.length > 0 && <FeaturedJourney travelProducts={home.featuredTravelProducts} />}
      {home.process && <JourneyProcess process={home.process} />}
      <TravelerStories stories={home.travelerStories} />
      {testimonials.length > 0 && <Testimonials reviews={testimonials} />}
      <BeyondItinerary data={home.beyondItinerary} />
      {home.finalCta && <FinalCTA finalCta={home.finalCta} />}
      {home.featuredArticles.length > 0 && <Journal articles={home.featuredArticles} />}
    </>
  );
}
