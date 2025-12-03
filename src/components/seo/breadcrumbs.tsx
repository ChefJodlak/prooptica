"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbSchema } from "./schema-org";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Prepare items for schema
  const schemaItems = [
    { name: "Strona główna", url: "/" },
    ...items.map((item) => ({ name: item.name, url: item.href })),
  ];

  return (
    <>
      {/* Schema.org structured data */}
      <BreadcrumbSchema items={schemaItems} />

      {/* Visual breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm", className)}
      >
        <ol
          className="flex items-center space-x-1"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home link */}
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              className="text-[#737373] hover:text-[#C4A77D] transition-colors duration-300"
              itemProp="item"
            >
              <Home className="w-4 h-4" aria-label="Strona główna" />
              <meta itemProp="name" content="Strona główna" />
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {/* Separator and items */}
          {items.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-4 h-4 text-[#a3a3a3] mx-1" />
              {index === items.length - 1 ? (
                // Current page (not a link)
                <span
                  className="text-[#1a1a1a] font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                // Link to parent page
                <Link
                  href={item.href}
                  className="text-[#737373] hover:text-[#C4A77D] transition-colors duration-300"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Compact version for smaller spaces
export function BreadcrumbsCompact({ items, className }: BreadcrumbsProps) {
  const lastItem = items[items.length - 1];
  const parentItem = items[items.length - 2];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
    >
      {parentItem ? (
        <Link
          href={parentItem.href}
          className="flex items-center gap-1 text-[#737373] hover:text-[#C4A77D] transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>{parentItem.name}</span>
        </Link>
      ) : (
        <Link
          href="/"
          className="flex items-center gap-1 text-[#737373] hover:text-[#C4A77D] transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Strona główna</span>
        </Link>
      )}
    </nav>
  );
}

