/**
 * Hero section — Server Component (ADR-007).
 *
 * Semantic `<section aria-label="Hero">` and the page `<h1>` live here
 * so they appear in the HeroSection server HTML.
 * Factual fix: decade beat removed (Scene Contract HERO.md, WP-18).
 */

import { ClassWordmark } from "@/components/brand/ClassWordmark";
import { HeroCinematic } from "@/components/cinematic/HeroCinematic";
import { copy } from "@/content/copy";

export function HeroSection() {
  return (
    <section aria-label="Hero" className="bg-bg-primary">
      <HeroCinematic
        heading={copy.hero.heading}
        tagline={copy.hero.tagline}
        scrollLines={copy.hero.scrollLines}
      >
        <ClassWordmark />
      </HeroCinematic>
    </section>
  );
}
