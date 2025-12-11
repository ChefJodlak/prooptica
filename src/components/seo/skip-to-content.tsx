"use client";

import { cn } from "@/lib/utils";

interface SkipToContentProps {
  href?: string;
  className?: string;
}

/**
 * Skip to Content link for accessibility
 * Allows keyboard users to skip navigation and go directly to main content
 */
export function SkipToContent({
  href = "#main-content",
  className,
}: SkipToContentProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4",
        "bg-[#E31F25] text-[#1a1a1a] px-4 py-2 font-medium text-sm",
        "focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2",
        "transition-all duration-200",
        className
      )}
    >
      Przejdź do treści
    </a>
  );
}

