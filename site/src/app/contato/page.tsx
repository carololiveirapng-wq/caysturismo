import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactFlow } from "@/components/contact/contact-flow";
import { getDestinationDetailBySlug } from "@/data/destinations";
import { getExperienceDetailBySlug } from "@/data/experiences";
import { getTravelProductBySlug } from "@/data/travel-products";
import { experienceTypeValues, type TripStepValues } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";
import { getSettings } from "@/lib/cms";

const title = "Planeje sua viagem | Cays Turismo";
const description = "Conte para a Cays como você imagina sua próxima viagem — a gente cuida do resto.";

export const metadata: Metadata = {
  // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
  // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
  title: { absolute: title },
  description,
  alternates: { canonical: "/contato" },
  openGraph: { title, description, url: `${siteConfig.url}/contato` },
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isKnownExperienceType(slug: string): slug is TripStepValues["tipoExperiencia"] {
  return (experienceTypeValues as readonly string[]).includes(slug);
}

export default async function ContatoPage({ searchParams }: PageProps<"/contato">) {
  const [params, settings] = await Promise.all([searchParams, getSettings()]);
  const destinoSlug = first(params.destino);
  const experienciaSlug = first(params.experiencia);
  const viagemSlug = first(params.viagem);

  let planningLabel: string | undefined;
  let sourcePath: string | undefined;
  let travelProduct: string | undefined;
  const initialTripValues: Partial<TripStepValues> = {};

  if (destinoSlug) {
    const destination = getDestinationDetailBySlug(destinoSlug);
    planningLabel = `Você está planejando: ${destination?.name ?? destinoSlug}`;
    initialTripValues.destinos = [destinoSlug];
    sourcePath = `/destinos/${destinoSlug}`;
  } else if (viagemSlug) {
    const product = getTravelProductBySlug(viagemSlug);
    if (product) {
      planningLabel = `Você está planejando: ${product.title}`;
      initialTripValues.destinos = product.destinations;
      const matchedType = product.experiences.find(isKnownExperienceType);
      if (matchedType) initialTripValues.tipoExperiencia = matchedType;
      travelProduct = product.slug;
      sourcePath = `/viagens/${viagemSlug}`;
    } else {
      planningLabel = "Vamos planejar sua próxima viagem";
    }
  } else if (experienciaSlug) {
    const experience = getExperienceDetailBySlug(experienciaSlug);
    planningLabel = `Você está interessado em: ${experience?.name ?? experienciaSlug}`;
    if (isKnownExperienceType(experienciaSlug)) {
      initialTripValues.tipoExperiencia = experienciaSlug;
    }
    sourcePath = `/experiencias/${experienciaSlug}`;
  }

  return (
    <section className="bg-ivory pt-28 pb-16 md:pt-32 md:pb-24">
      <Container>
        <ContactFlow
          planningLabel={planningLabel}
          initialTripValues={initialTripValues}
          travelProduct={travelProduct}
          sourcePath={sourcePath}
          settings={settings}
        />
      </Container>
    </section>
  );
}
