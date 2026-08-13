import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";

/**
 * Home page — ISSUE-016.
 *
 * Server Component (ADR-007). Layout already provides `<main id="main-content">`;
 * do not wrap sections in a second landmark. Footer is rendered in layout after
 * `</main>` so it is not nested inside the main landmark (ACCESSIBILITY.md).
 *
 * Hero is the STOP-06 placeholder (GoldenLogo + h1; tooth cinematic omitted).
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <SpecialtiesSection />
      <SpecialistsSection />
      <AppointmentCTA />
    </>
  );
}
