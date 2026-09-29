"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";

interface FaqAccordionProps {
  items: { question: string; answer: string }[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root className="divide-y divide-line border-t border-line">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={i}>
          <Accordion.Header>
            <Accordion.Trigger className="group/trigger flex w-full items-center justify-between gap-6 py-4 text-left">
              <span className="text-[0.95rem] font-medium text-ink md:text-base">{item.question}</span>
              <Plus
                aria-hidden
                className="size-4 shrink-0 text-stone transition-transform duration-300 group-data-[panel-open]/trigger:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-[var(--ease-editorial)] data-[ending-style]:h-0 data-[starting-style]:h-0">
            <p className="max-w-2xl pr-10 pb-4 text-sm leading-relaxed text-stone">{item.answer}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
