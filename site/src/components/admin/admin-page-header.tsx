import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6">
      <div>
        <h1 className="font-serif text-2xl text-ink md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-stone">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
