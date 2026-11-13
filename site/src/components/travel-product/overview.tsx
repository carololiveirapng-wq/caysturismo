import { SplitSection } from "./split-section";

export function ProductOverview({ id, text }: { id: string; text: string }) {
  return (
    <SplitSection id={id} title="Visão geral">
      <p className="max-w-2xl text-lg leading-relaxed text-ink/80">{text}</p>
    </SplitSection>
  );
}
