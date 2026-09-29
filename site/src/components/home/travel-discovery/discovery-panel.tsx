"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DiscoveryPanelProps {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
  /**
   * Ancoragem no desktop, relativa ao *contexto de posicionamento mais
   * próximo* (definido por quem usa o painel — pode ser a barra inteira ou
   * só a coluna do próprio gatilho):
   * - "full"  — ocupa toda a largura do contexto (usado pelo Destino, que
   *   precisa de espaço para as regiões).
   * - "left"  — nasce da borda esquerda do contexto, largura própria do
   *   conteúdo (Quando).
   * - "right" — nasce da borda direita do contexto, largura própria do
   *   conteúdo (Como quer viajar, perto do CTA).
   */
  align?: "full" | "left" | "right";
  /** Largura no desktop quando align != "full", ex. "md:w-[380px]". */
  widthClassName?: string;
}

const ALIGN_CLASSES = {
  full: "md:inset-x-0",
  left: "md:left-0",
  right: "md:right-0",
} as const;

/**
 * Bottom sheet no mobile (fixed, base da tela, largura cheia), painel do
 * tamanho do próprio conteúdo no desktop. Mesma árvore, só a posição/largura
 * muda por breakpoint — evita duplicar o conteúdo do painel.
 */
export function DiscoveryPanel({
  id,
  labelledBy,
  children,
  align = "full",
  widthClassName,
}: DiscoveryPanelProps) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 max-h-[75svh] overflow-y-auto border-t border-ink/15 bg-ivory p-6 shadow-[0_-12px_30px_-18px_rgba(0,0,0,0.25)]",
        "md:absolute md:top-full md:right-auto md:bottom-auto md:left-auto md:z-40 md:mt-3 md:max-h-[65vh] md:border md:border-ink/15 md:p-8 md:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]",
        ALIGN_CLASSES[align],
        align !== "full" && "md:w-max md:max-w-[92vw]",
        widthClassName,
      )}
    >
      {children}
    </motion.div>
  );
}
