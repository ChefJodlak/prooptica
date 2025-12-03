import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { BookingPageSchema } from "@/components/seo";

export const metadata: Metadata = generatePageMetadata("booking");

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BookingPageSchema />
      {children}
    </>
  );
}

