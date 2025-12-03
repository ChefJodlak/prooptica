import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { LocationsPreview } from "@/components/sections/home/locations-preview";
import { BrandsMarquee } from "@/components/sections/home/brands-marquee";
import { LensesSection } from "@/components/sections/home/lenses-section";
import { EyeExamSection } from "@/components/sections/home/eye-exam-section";
import { InstagramSection } from "@/components/sections/home/instagram-section";
import { ArticlesSection } from "@/components/sections/home/articles-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <BrandsMarquee />
      <Intro />
      <EyeExamSection />
      <LensesSection />
      <LocationsPreview />
      <InstagramSection />
      <ArticlesSection />
    </div>
  );
}
