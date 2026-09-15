import { PaletteWash } from "@/components/cinematic/PaletteWash";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { LegacySection } from "@/components/sections/LegacySection";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { SelectedByClassSection } from "@/components/sections/SelectedByClassSection";
import { LocationSection } from "@/components/sections/LocationSection";

/**
 * Home page — demo release spine.
 *
 *   ACT 01 Hero          dark
 *   ACT 02 Manifesto     paper
 *   ACT 03 Specialties   dark
 *   ACT 04 Legacy        paper  (wash in from specialties)
 *   ACT 05 Method        dark   (wash in from legacy)
 *   ACT 06 Specialists   dark
 *   ACT 07 Selected      dark (brand marquee)
 *   ACT 08 Place         map close + CTAs
 *
 * Server Component (ADR-007). Layout provides <main id="main-content">.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <PaletteWash from="#f3efe6" to="#080808" hold={0.9} ease="sine.inOut" />
      <SpecialtiesSection />
      <PaletteWash from="#080808" to="#f3efe6" hold={1.85} ease="power1.inOut">
        <span className="palette-wash-year palette-wash-year--enter">1998</span>
      </PaletteWash>
      <LegacySection />
      <PaletteWash from="#f3efe6" to="#080808" hold={1.25} ease="power2.inOut">
        <span className="palette-wash-year palette-wash-year--exit">1998</span>
      </PaletteWash>
      <MethodSection />
      <SpecialistsSection />
      <SelectedByClassSection />
      <LocationSection />
    </>
  );
}
