import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata("eyeExam");

export default function EyeExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

