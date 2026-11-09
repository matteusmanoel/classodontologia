"use client";

/**
 * VideoLightbox — click-to-play story video in a native modal <dialog>.
 *
 * Never autoplays on page load: playback (with sound) starts from an explicit
 * click, which browsers allow. Esc, the close button and the backdrop all close
 * it; focus returns to the trigger. Render only when a source exists.
 */

import { useRef } from "react";

interface VideoLightboxProps {
  src: string;
  poster: string;
  captionsSrc?: string | null;
  label: string;
  durationLabel: string;
}

export function VideoLightbox({
  src,
  poster,
  captionsSrc,
  label,
  durationLabel,
}: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    videoRef.current?.play().catch(() => undefined);
  };

  const close = () => dialogRef.current?.close();

  const handleClosed = () => {
    videoRef.current?.pause();
    document.body.style.overflow = "";
  };

  return (
    <>
      <button type="button" className="soft-cta-link soft-cta-link--play" onClick={open}>
        <svg className="soft-cta-play" viewBox="0 0 12 14" aria-hidden="true" focusable="false">
          <path d="M1 1 L11 7 L1 13 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span>
          {label} · {durationLabel}
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className="video-lightbox"
        aria-label={label}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="video-lightbox-frame">
          <button
            type="button"
            className="video-lightbox-close"
            aria-label="Fechar vídeo"
            onClick={close}
          >
            <span aria-hidden="true">×</span>
          </button>
          <video
            ref={videoRef}
            className="video-lightbox-video"
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
          >
            {captionsSrc ? (
              <track kind="captions" src={captionsSrc} srcLang="pt-BR" label="Português" default />
            ) : null}
          </video>
        </div>
      </dialog>
    </>
  );
}
