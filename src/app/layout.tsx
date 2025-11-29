import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SchemaOrg } from "@/components/seo/schema-org";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prooptica - Twoje Oczy. Nasza Pasja.",
    template: "%s | Prooptica",
  },
  description: "Rodzinna firma optyczna z 20-letnią tradycją. Salony w Warszawie, Piasecznie i Grójcu. Profesjonalne badanie wzroku i markowe oprawy.",
  keywords: ["optyk", "badanie wzroku", "okulary", "Warszawa", "Piaseczno", "Grójec", "Prooptica", "okulista", "soczewki"],
  authors: [{ name: "Prooptica" }],
  creator: "Prooptica",
  publisher: "Prooptica",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://prooptica.pl",
    siteName: "Prooptica",
    title: "Prooptica - Twoje Oczy. Nasza Pasja.",
    description: "Rodzinna firma optyczna z 20-letnią tradycją.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl-PL" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          cormorant.variable,
          dmSans.variable
        )}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <SmoothScroll>
          <SchemaOrg />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
