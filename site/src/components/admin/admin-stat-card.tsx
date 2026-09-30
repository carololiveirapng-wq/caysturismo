export function AdminStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="border border-ink/10 bg-ivory p-5">
      <p className="text-xs font-medium tracking-[0.1em] text-stone uppercase">{label}</p>
      <p className="mt-2.5 font-serif text-3xl text-ink tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-stone/80">{hint}</p>}
    </div>
  );
}
