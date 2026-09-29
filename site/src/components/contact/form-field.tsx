import { cn } from "@/lib/utils";

export function FormField({
  label,
  htmlFor,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-xs font-medium tracking-[0.1em] text-stone uppercase">
        {label} {optional && <span className="text-stone/60 normal-case">(opcional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-magenta">{error}</p>}
    </div>
  );
}

export const textInputClassName = cn(
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2.5 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone/50 focus:border-ink",
);
