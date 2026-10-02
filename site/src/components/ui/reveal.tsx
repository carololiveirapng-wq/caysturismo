"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** Mesmo conteúdo final, sem o deslocamento/fade — motion/react ainda cumpre a transição (instantânea), então nada trava em "hidden". */
const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps extends React.ComponentProps<"div"> {
  delay?: number;
}

/** Fades and lifts children into place once, the first time they enter view. Respeita prefers-reduced-motion — sem a animação, o conteúdo já aparece no lugar final. */
export function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={shouldReduceMotion ? reducedVariants : variants}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}
