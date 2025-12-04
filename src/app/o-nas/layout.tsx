import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { AboutPageSchema } from "@/components/seo/schema-org";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AboutPageSchema />
      {children}
    </>
  );
}

