import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { BrandsPageSchema } from "@/components/seo/schema-org";

export const metadata: Metadata = generatePageMetadata("brands");

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrandsPageSchema />
      {children}
    </>
  );
}

