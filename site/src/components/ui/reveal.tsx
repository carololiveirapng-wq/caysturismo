"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps extends React.ComponentProps<"div"> {
  delay?: number;
}

/** Fades and lifts children into place once, the first time they enter view. */
export function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}
