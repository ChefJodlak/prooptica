import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { LocationsPageSchema } from "@/components/seo/schema-org";

export const metadata: Metadata = generatePageMetadata("locations");

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocationsPageSchema />
      {children}
    </>
  );
}

