/**
 * Video slots — wired, poster-first, and inert until a source is set.
 *
 * To activate a slot, set `src` (a file under `public/assets/video/` or an absolute
 * URL from a video host). Until then the site renders the poster/photo only, so no
 * dead player or empty frame ever ships.
 *
 * Delivery (ADR-005): H.264 MP4. Short loops: muted, no audio track, <= ~2 MB, 8-20 s.
 * The long founder story (60-90 s, with audio) should live on a video host
 * (Vercel Blob, Mux or Cloudflare Stream), not in `public/`.
 */

export interface LoopSlot {
  /** Muted, looping, plays only while visible. */
  src: string | null;
  alt: string;
}

export interface StorySlot {
  /** 60-90 s with audio, opened by an explicit click. */
  src: string | null;
  poster: string;
  /** WebVTT captions (pt-BR). Required before shipping a spoken video. */
  captionsSrc: string | null;
  label: string;
  durationLabel: string;
}

export interface MediaSlots {
  clinicLoop: LoopSlot;
  methodLoops: Record<"scan" | "proof", LoopSlot>;
  founderStory: StorySlot;
}

export const mediaSlots: MediaSlots = {
  /** Ambient loop over the last Clinic folio plate. */
  clinicLoop: {
    src: null,
    alt: "Ambiente da Class Odontologia",
  },
  /** Real-technology loops that replace "Imagem a definir" in the Method. */
  methodLoops: {
    scan: { src: null, alt: "Escaneamento intraoral na Class Odontologia" },
    proof: { src: null, alt: "Prova do planejamento digital na Class Odontologia" },
  },
  /** Founder statement, opened from the Clinic folio CTA. */
  founderStory: {
    src: null,
    poster: "/assets/people/dr-alessandro.webp",
    captionsSrc: null,
    label: "Assistir à história da Class",
    durationLabel: "1 min",
  },
};
