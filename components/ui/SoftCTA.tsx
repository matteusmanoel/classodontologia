/**
 * SoftCTA — a whisper between acts.
 *
 * One quiet sentence and a text link with a gold hairline and arrow. Never a
 * filled button, modal or pop-up, and never placed over a scrubbed scene.
 * Server Component (ADR-007). Copy lives in `copy.cta.soft`.
 */

import { Reveal } from "@/components/ui/Reveal";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { whatsappHref } from "@/config/site";
import { copy } from "@/content/copy";
import { mediaSlots } from "@/content/media";

type SoftCTAId = keyof typeof copy.cta.soft;

interface SoftCTAProps {
  id: SoftCTAId;
  tone: "dark" | "paper";
}

export function SoftCTA({ id, tone }: SoftCTAProps) {
  const { lead, label } = copy.cta.soft[id];
  const story = mediaSlots.founderStory;

  return (
    <aside
      className={`soft-cta soft-cta--${tone}`}
      data-soft-cta={id}
      aria-label="Convite para agendar uma visita"
    >
      <Reveal className="soft-cta-inner">
        <p className="soft-cta-lead">{lead}</p>
        <div className="soft-cta-actions">
          <a
            href={whatsappHref()}
            className="soft-cta-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{label}</span>
            <svg
              className="soft-cta-arrow"
              viewBox="0 0 24 12"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M0 6 H22 M17 1 L22 6 L17 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </a>
          {id === "folio" && story.src ? (
            <VideoLightbox
              src={story.src}
              poster={story.poster}
              captionsSrc={story.captionsSrc}
              label={story.label}
              durationLabel={story.durationLabel}
            />
          ) : null}
        </div>
      </Reveal>
    </aside>
  );
}
