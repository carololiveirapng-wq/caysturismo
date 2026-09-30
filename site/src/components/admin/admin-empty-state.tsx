export function AdminEmptyState({
  title,
  supporting,
}: {
  title: string;
  supporting?: string;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-ink/15 px-6 py-16 text-center">
      <p className="font-serif text-lg text-ink">{title}</p>
      {supporting && <p className="mt-2 max-w-sm text-sm text-stone">{supporting}</p>}
    </div>
  );
}
