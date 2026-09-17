"use client";

/**
 * Clinic folio — stacked plates between A clínica and Especialidades.
 * Paper field → plates rise from below with a settling zoom → dark veil out.
 * No copy overlay.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clinicPlates } from "@/content/clinic";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PAPER = "#f3efe6";
const DARK = "#080808";
const IN = 0.36;
const TURN = 0.4;
const OUT = 0.36;
const INCOMING_SCALE = 1.085;
const HEADING_ID = "clinic-folio-heading";

export function ClinicFolio() {
  const pinRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      const pin = pinRef.current;
      const veil = veilRef.current;
      if (!pin || !veil || reduced) {
        return;
      }

      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      const zooms = zoomRefs.current.filter(Boolean) as HTMLDivElement[];
      if (layers.length !== clinicPlates.length || zooms.length !== clinicPlates.length) {
        return;
      }

      const hidden = "inset(100% 0% 0% 0%)";
      const shown = "inset(0% 0% 0% 0%)";

      layers.forEach((layer, index) => {
        gsap.set(layer, { clipPath: hidden });
        gsap.set(zooms[index], {
          scale: INCOMING_SCALE,
          transformOrigin: "50% 50%",
        });
      });
      gsap.set(veil, { clipPath: hidden });
      gsap.set(pin, { backgroundColor: PAPER });

      const turns = clinicPlates.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * (IN + turns * TURN + OUT))}`,
        },
      });

      tl.fromTo(
        layers[0],
        { clipPath: hidden },
        { clipPath: shown, duration: IN, ease: "none" },
        0,
      );
      tl.fromTo(
        zooms[0],
        { scale: INCOMING_SCALE },
        { scale: 1, duration: IN, ease: "none" },
        0,
      );

      for (let i = 1; i < layers.length; i += 1) {
        const at = IN + (i - 1) * TURN;
        tl.fromTo(
          layers[i],
          { clipPath: hidden },
          { clipPath: shown, duration: TURN, ease: "none" },
          at,
        );
        tl.fromTo(
          zooms[i],
          { scale: INCOMING_SCALE },
          { scale: 1, duration: TURN, ease: "none" },
          at,
        );
      }

      const outAt = IN + turns * TURN;
      tl.fromTo(
        veil,
        { clipPath: hidden },
        { clipPath: shown, duration: OUT, ease: "none" },
        outAt,
      );
      tl.to(pin, { backgroundColor: DARK, duration: OUT, ease: "none" }, outAt);
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  if (reduced) {
    return (
      <section
        id="clinic-folio"
        aria-labelledby={HEADING_ID}
        className="clinic-folio clinic-folio--static bg-bg-primary"
      >
        <h2 id={HEADING_ID} className="sr-only">
          Espaços da clínica
        </h2>
        <ul className="clinic-folio-stack">
          {clinicPlates.map((plate) => (
            <li key={plate.id} className="clinic-folio-stack-item">
              <Image
                src={plate.src}
                alt={plate.alt}
                fill
                sizes="100vw"
                className="clinic-folio-image"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={pinRef}
      id="clinic-folio"
      aria-labelledby={HEADING_ID}
      className="clinic-folio clinic-folio-pin relative h-dvh w-full overflow-hidden"
      style={{ backgroundColor: PAPER }}
    >
      <h2 id={HEADING_ID} className="sr-only">
        Espaços da clínica
      </h2>
      <div className="clinic-folio-stage">
        {clinicPlates.map((plate, index) => (
          <div
            key={plate.id}
            ref={(node) => {
              layerRefs.current[index] = node;
            }}
            className="clinic-folio-layer"
            style={{ zIndex: index + 1 }}
          >
            <div
              ref={(node) => {
                zoomRefs.current[index] = node;
              }}
              className="clinic-folio-zoom"
            >
              <Image
                src={plate.src}
                alt={plate.alt}
                fill
                sizes="100vw"
                className="clinic-folio-image"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
        <div
          ref={veilRef}
          className="clinic-folio-veil"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
