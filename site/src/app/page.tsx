import { Hero } from "@/components/home/hero";
import { TravelDiscovery } from "@/components/home/travel-discovery/travel-discovery";
import { Manifesto } from "@/components/home/manifesto";
import { Experiences } from "@/components/home/experiences";
import { JourneyProcess } from "@/components/home/journey-process";
import { DestinationsSection } from "@/components/home/destinations/destinations-section";
import { Journal } from "@/components/home/journal";
import { FeaturedJourney } from "@/components/home/featured-journey";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCTA } from "@/components/home/final-cta";
import { homeSections } from "@/data/home-sections";

export default function Home() {
  return (
    <>
      <Hero />
      {homeSections.travelDiscovery && <TravelDiscovery />}
      {homeSections.manifesto && <Manifesto />}
      {homeSections.experiences && <Experiences />}
      {homeSections.journeyProcess && <JourneyProcess />}
      {homeSections.destinations && <DestinationsSection />}
      {homeSections.journal && <Journal />}
      {homeSections.featuredJourney && <FeaturedJourney />}
      {homeSections.testimonials && <Testimonials />}
      {homeSections.finalCTA && <FinalCTA />}
    </>
  );
}
