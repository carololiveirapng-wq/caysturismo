export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between border border-ink/15 px-4 py-3.5">
      <span className="text-sm text-ink">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Diminuir ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex size-7 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-ink/40"
        >
          −
        </button>
        <span className="w-4 text-center text-sm text-ink tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`Aumentar ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          className="flex size-7 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-ink/40"
        >
          +
        </button>
      </div>
    </div>
  );
}
