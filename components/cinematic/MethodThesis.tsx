"use client";

/**
 * Method thesis — declaration that dissolves on scroll.
 * Costura keeps the canonical purpose line; the H2 is the full sentence.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StoryLine } from "@/components/brand/StoryLine";
import { copy } from "@/content/copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const METHOD_HEADING_ID = "method-heading";

export function MethodThesis() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const lead = leadRef.current;
      const mark = markRef.current;
      if (!root || !lead || !mark) {
        return;
      }

      if (reduced) {
        gsap.set([lead, mark], { autoAlpha: 1 });
        return;
      }

      gsap.set(lead, { autoAlpha: 1 });
      gsap.set(mark, { autoAlpha: 0.28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "top 18%",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      tl.to(lead, { autoAlpha: 0.14, ease: "none", duration: 1 }, 0);
      tl.to(mark, { autoAlpha: 1, ease: "none", duration: 1 }, 0.12);
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="method-lockup">
      <StoryLine kind="crop-tl" tone="dark" className="method-lockup-crop" />
      <p className="display-stitch">{copy.method.stitch}</p>
      <h2 id={METHOD_HEADING_ID} className="method-lockup-heading">
        <span className="sr-only">{copy.method.headline}</span>
        <span aria-hidden="true" className="method-dissolve">
          <span ref={leadRef} className="method-dissolve-lead">
            {copy.method.dissolveLead}
          </span>
          <span ref={markRef} className="method-dissolve-mark">
            {copy.method.dissolveMark}
          </span>
        </span>
      </h2>
      <p className="method-lockup-body">{copy.method.body}</p>
    </div>
  );
}
