import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { LegacySection } from "@/components/sections/LegacySection";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { SelectedByClassSection } from "@/components/sections/SelectedByClassSection";
import { PlaceSection } from "@/components/sections/PlaceSection";
import { ConversionSection } from "@/components/sections/ConversionSection";

/**
 * Home page — 9-act narrative (ADR-013).
 *
 * Act order and palette (D6):
 *   ACT 01 Hero          dark
 *   ACT 02 Manifesto     dark → paper
 *   ACT 03 Legacy        paper
 *   ACT 04 Specialties   paper (dark media wells)
 *   ACT 05 Method        dark
 *   ACT 06 Specialists   dark
 *   ACT 07 Selected      dark
 *   ACT 08 Place         paper
 *   ACT 09 Conversion    dark
 *
 * Server Component (ADR-007). Layout provides <main id="main-content">.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <LegacySection />
      <SpecialtiesSection />
      <MethodSection />
      <SpecialistsSection />
      <SelectedByClassSection />
      <PlaceSection />
      <ConversionSection />
    </>
  );
}
