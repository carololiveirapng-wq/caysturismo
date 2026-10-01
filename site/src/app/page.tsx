import { Hero } from "@/components/home/hero";
import { TravelDiscovery } from "@/components/home/travel-discovery/travel-discovery";
import { Manifesto } from "@/components/home/manifesto";
import { Positioning } from "@/components/home/positioning";
import { Experiences } from "@/components/home/experiences";
import { JourneyProcess } from "@/components/home/journey-process";
import { DestinationsSection } from "@/components/home/destinations/destinations-section";
import { Journal } from "@/components/home/journal";
import { FeaturedJourney } from "@/components/home/featured-journey";
import { TravelerStories } from "@/components/home/traveler-stories";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCTA } from "@/components/home/final-cta";
import { getHome, getSettings, getTestimonials, getDiscoveryOptions } from "@/lib/cms";
import { notFound } from "next/navigation";

export default async function Home() {
  const [home, settings, testimonials, { regions, experiences: discoveryExperiences }] = await Promise.all([
    getHome(),
    getSettings(),
    getTestimonials(),
    getDiscoveryOptions(),
  ]);

  if (!home) notFound();

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;

  return (
    <>
      <Hero hero={home.hero} />
      <TravelDiscovery content={home.travelDiscovery} regions={regions} experiences={discoveryExperiences} />
      {home.manifesto && <Manifesto manifesto={home.manifesto} />}
      {settings.slogan && (
        <Positioning slogan={settings.slogan} foundedYear={foundedYear} positioning={home.positioning} />
      )}
      {home.featuredExperiences.length > 0 && <Experiences experiences={home.featuredExperiences} />}
      {home.process && <JourneyProcess process={home.process} />}
      {home.featuredDestinations.length > 0 && <DestinationsSection destinations={home.featuredDestinations} />}
      {home.featuredArticles.length > 0 && <Journal articles={home.featuredArticles} />}
      {home.featuredTravelProducts.length > 0 && <FeaturedJourney travelProducts={home.featuredTravelProducts} />}
      <TravelerStories stories={home.travelerStories} />
      {testimonials.length > 0 && <Testimonials reviews={testimonials} />}
      {home.finalCta && <FinalCTA finalCta={home.finalCta} />}
    </>
  );
}
