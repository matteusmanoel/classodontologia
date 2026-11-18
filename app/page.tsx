import { PaletteWash } from "@/components/cinematic/PaletteWash";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ClinicFolioSection } from "@/components/sections/ClinicFolioSection";
// Legacy (paper, "1998") retired from the spine: the year now lives in the Hero
// subtitle and the Manifesto eyebrow. Component kept for reference.
// import { LegacySection } from "@/components/sections/LegacySection";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { SelectedByClassSection } from "@/components/sections/SelectedByClassSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { SoftCTA } from "@/components/ui/SoftCTA";

/**
 * Home page — condensed spine (narrative-tightening release).
 *
 *   ACT 01 Hero          dark
 *   ACT 02 Manifesto     paper
 *   ACT 02b Clinic folio paper → dark (+ soft CTA 1)
 *   ACT 03 Specialties   dark       (+ soft CTA 2)
 *   ----   wash          dark → paper
 *   ACT 04 Method        paper      (+ soft CTA 3)
 *   ----   wash          paper → dark
 *   ACT 05 Specialists   dark       (+ soft CTA 4)
 *   ACT 06 Selected      dark (brand marquee)
 *   ACT 07 Place         map close + primary CTAs
 *
 * Server Component (ADR-007). Layout provides <main id="main-content">.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ClinicFolioSection />
      <SoftCTA id="folio" tone="dark" />
      <SpecialtiesSection />
      <SoftCTA id="specialties" tone="dark" />
      <PaletteWash from="#080808" to="#f3efe6" hold={1.0} ease="power1.inOut" />
      <MethodSection />
      <SoftCTA id="method" tone="paper" />
      <PaletteWash from="#f3efe6" to="#080808" hold={0.9} ease="power2.inOut" />
      <SpecialistsSection />
      <SoftCTA id="specialists" tone="dark" />
      <SelectedByClassSection />
      <LocationSection />
    </>
  );
}
