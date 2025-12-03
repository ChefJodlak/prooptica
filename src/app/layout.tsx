import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { baseMetadata, viewport as viewportConfig } from "@/lib/seo/metadata";
import { HomePageSchema, SkipToContent } from "@/components/seo";

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

// Export viewport configuration
export const viewport: Viewport = viewportConfig;

// Export comprehensive metadata
export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl-PL" suppressHydrationWarning>
      <head>
        {/* Preconnect to important origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Geo meta tags for local SEO */}
        <meta name="geo.region" content="PL-MZ" />
        <meta name="geo.placename" content="Piaseczno" />
        <meta name="geo.position" content="52.0814;21.0236" />
        <meta name="ICBM" content="52.0814, 21.0236" />
        
        {/* Dublin Core metadata for enhanced indexing */}
        <meta name="DC.title" content="Prooptica - Twoje Oczy. Nasza Pasja." />
        <meta name="DC.creator" content="Prooptica" />
        <meta name="DC.subject" content="Usługi optyczne, badanie wzroku, okulary" />
        <meta name="DC.description" content="Rodzinna firma optyczna z 20-letnią tradycją." />
        <meta name="DC.publisher" content="Prooptica" />
        <meta name="DC.language" content="pl" />
        <meta name="DC.coverage" content="Polska" />
        
        {/* Content Security Policy - basic version */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="upgrade-insecure-requests" 
        />
        
        {/* X-UA-Compatible for older browsers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          cormorant.variable,
          dmSans.variable
        )}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <SmoothScroll>
          {/* Skip to content link for accessibility */}
          <SkipToContent />
          
          {/* Schema.org structured data */}
          <HomePageSchema />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main content */}
          <main className="flex-1" id="main-content" role="main">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
