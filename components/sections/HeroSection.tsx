/**
 * Hero section — Server Component (ADR-007).
 *
 * Semantic `<section aria-label="Hero">` and the page `<h1>` live here
 * so they appear in the HeroSection server HTML. Copy is passed to
 * HeroCinematic as serializable props.
 */

import { HeroCinematic } from "@/components/cinematic/HeroCinematic";
import { copy } from "@/content/copy";

export function HeroSection() {
  return (
    <section aria-label="Hero" className="bg-bg-primary">
      <HeroCinematic
        heading={copy.hero.heading}
        tagline={copy.hero.tagline}
      >
        <h1 className="font-display text-hero tracking-display text-balance text-text-primary">
          {copy.hero.heading}
        </h1>
      </HeroCinematic>
    </section>
  );
}
