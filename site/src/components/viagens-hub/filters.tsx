"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { azDestinations } from "@/data/destinations-hub";
import { discoveryYears } from "@/data/travel-discovery";
import { durationOptions } from "@/lib/contact-schema";
import { TYPE_LABEL } from "@/lib/travel-product-status";
import { cn } from "@/lib/utils";
import type { ExperienceDetail } from "@/types";

const selectClassName = cn(
  "w-full cursor-pointer border-0 border-b border-ink/20 bg-transparent px-0 py-2.5 text-sm text-ink outline-none transition-colors duration-300 focus:border-ink",
);

function FilterFields({
  idPrefix,
  experiences,
}: {
  idPrefix: string;
  experiences: Pick<ExperienceDetail, "slug" | "name">[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const hasActiveFilters = ["destino", "experiencia", "tipo", "duracao", "periodo"].some((k) => searchParams.get(k));

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
      <div>
        <label htmlFor={`${idPrefix}-destino`} className="text-xs tracking-[0.1em] text-stone uppercase">
          Destino
        </label>
        <select
          id={`${idPrefix}-destino`}
          className={cn(selectClassName, "mt-1.5")}
          value={searchParams.get("destino") ?? ""}
          onChange={(e) => set("destino", e.target.value)}
        >
          <option value="">Qualquer destino</option>
          {azDestinations.map((d) => (
            <option key={d.slug} value={d.slug}>{d.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-experiencia`} className="text-xs tracking-[0.1em] text-stone uppercase">
          Experiência
        </label>
        <select
          id={`${idPrefix}-experiencia`}
          className={cn(selectClassName, "mt-1.5")}
          value={searchParams.get("experiencia") ?? ""}
          onChange={(e) => set("experiencia", e.target.value)}
        >
          <option value="">Qualquer experiência</option>
          {experiences.map((exp) => (
            <option key={exp.slug} value={exp.slug}>{exp.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-tipo`} className="text-xs tracking-[0.1em] text-stone uppercase">
          Tipo
        </label>
        <select
          id={`${idPrefix}-tipo`}
          className={cn(selectClassName, "mt-1.5")}
          value={searchParams.get("tipo") ?? ""}
          onChange={(e) => set("tipo", e.target.value)}
        >
          <option value="">Qualquer tipo</option>
          {Object.entries(TYPE_LABEL).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-periodo`} className="text-xs tracking-[0.1em] text-stone uppercase">
          Período
        </label>
        <select
          id={`${idPrefix}-periodo`}
          className={cn(selectClassName, "mt-1.5")}
          value={searchParams.get("periodo") ?? ""}
          onChange={(e) => set("periodo", e.target.value)}
        >
          <option value="">Qualquer período</option>
          {discoveryYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-duracao`} className="text-xs tracking-[0.1em] text-stone uppercase">
          Duração
        </label>
        <select
          id={`${idPrefix}-duracao`}
          className={cn(selectClassName, "mt-1.5")}
          value={searchParams.get("duracao") ?? ""}
          onChange={(e) => set("duracao", e.target.value)}
        >
          <option value="">Qualquer duração</option>
          {durationOptions.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="col-span-2 text-left text-xs font-medium tracking-wide text-stone underline underline-offset-2 hover:text-ink sm:col-span-3 lg:col-span-5 lg:w-fit"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}

/** Mesmos campos duas vezes — um recolhível no mobile, outro sempre visível no desktop (mesmo padrão do índice de artigo). */
export function TravelProductFilters({ experiences }: { experiences: Pick<ExperienceDetail, "slug" | "name">[] }) {
  return (
    <div>
      <details className="border border-ink/10 p-4 lg:hidden">
        <summary className="cursor-pointer list-none text-xs font-medium tracking-[0.15em] text-stone uppercase marker:content-none">
          Filtrar viagens
        </summary>
        <div className="mt-5">
          <FilterFields idPrefix="mobile" experiences={experiences} />
        </div>
      </details>

      <div className="hidden lg:block">
        <FilterFields idPrefix="desktop" experiences={experiences} />
      </div>
    </div>
  );
}
