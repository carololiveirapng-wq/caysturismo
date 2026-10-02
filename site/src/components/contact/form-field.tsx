import { useId } from "react";
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
  const generatedId = useId();
  const errorId = `${htmlFor ?? generatedId}-error`;

  return (
    <div className={className} data-field-error={error ? "" : undefined}>
      <label htmlFor={htmlFor} className="text-xs font-medium tracking-[0.1em] text-stone uppercase">
        {label} {optional && <span className="text-stone/80 normal-case">(opcional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}

// `ring` (box-shadow, não `outline`) pro indicador de foco: não participa
// do box model, então não empurra o layout quando aparece — só troca a cor
// da borda (já existente) + desenha um contorno deslocado por fora. (Usar
// `outline`/`outline-2` aqui foi testado e descartado: o `cn()` baseado em
// tailwind-merge remove o `outline` "base" como redundante com `outline-2`,
// deixando `--tw-outline-style` em `none` — sem contorno nenhum visível.)
export const textInputClassName = cn(
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2.5 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone/50 focus:border-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/30",
);
