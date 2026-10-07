"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: string;
}

/** Link interno (next/link) que dispara um evento no dataLayer antes de navegar. */
export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}

interface TrackedAnchorProps extends ComponentProps<"a"> {
  event: string;
}

/** Mesma ideia, para links externos (WhatsApp, Instagram) que usam <a> em vez de <Link>. */
export function TrackedAnchor({ event, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}
