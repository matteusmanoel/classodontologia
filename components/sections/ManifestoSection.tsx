/**
 * Manifesto / positioning section — ISSUE-012.
 *
 * Server Component (ADR-007). Level 2 motion: CSS `@keyframes` +
 * IntersectionObserver toggling `animation-play-state` (ARCHITECTURE.md).
 * GSAP Level 3 / ManifestoReveal is not used — Foundation owns package.json.
 */

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";

const MANIFESTO_HEADING_ID = "manifesto-heading";
const MANIFESTO_BODY_ID = "manifesto-body";

const MANIFESTO_REVEAL_CSS = `
@keyframes manifesto-reveal {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.manifesto-body {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: no-preference) {
  html.js-manifesto .manifesto-body[data-manifesto-reveal] {
    animation: manifesto-reveal var(--duration-slow) var(--ease-out-expo) both;
    animation-play-state: paused;
  }

  html.js-manifesto .manifesto-body[data-manifesto-reveal].is-revealed {
    animation-play-state: running;
  }
}

@media (prefers-reduced-motion: reduce) {
  .manifesto-body[data-manifesto-reveal] {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
`;

const ENABLE_JS_REVEAL_SCRIPT = `document.documentElement.classList.add("js-manifesto");`;

const OBSERVE_REVEAL_SCRIPT = `(function () {
  var el = document.getElementById(${JSON.stringify(MANIFESTO_BODY_ID)});
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.classList.add("is-revealed");
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-revealed");
          io.unobserve(entries[i].target);
        }
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  io.observe(el);
})();`;

export function ManifestoSection() {
  return (
    <section
      aria-labelledby={MANIFESTO_HEADING_ID}
      className="bg-bg-secondary py-[--section-py]"
    >
      <style href="manifesto-section-reveal" precedence="default">
        {MANIFESTO_REVEAL_CSS}
      </style>
      <script dangerouslySetInnerHTML={{ __html: ENABLE_JS_REVEAL_SCRIPT }} />
      <Container>
        <SectionHeading id={MANIFESTO_HEADING_ID} accent>
          {copy.manifesto.headline}
        </SectionHeading>
        <p
          id={MANIFESTO_BODY_ID}
          className="manifesto-body mt-8 max-w-3xl font-display text-xl tracking-display text-text-primary md:text-2xl"
          data-manifesto-reveal=""
        >
          {copy.manifesto.body}
        </p>
      </Container>
      <script dangerouslySetInnerHTML={{ __html: OBSERVE_REVEAL_SCRIPT }} />
    </section>
  );
}
