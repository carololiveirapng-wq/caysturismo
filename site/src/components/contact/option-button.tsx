import { cn } from "@/lib/utils";

export function OptionButton({
  label,
  selected,
  onClick,
  className,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "border px-4 py-3.5 text-left text-sm transition-colors duration-300",
        selected ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink hover:border-ink/40",
        className,
      )}
    >
      {label}
    </button>
  );
}
