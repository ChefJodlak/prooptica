import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { ArticlesPageSchema } from "@/components/seo/schema-org";

export const metadata: Metadata = generatePageMetadata("articles");

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticlesPageSchema />
      {children}
    </>
  );
}

