"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { href: "#manifesto", id: "manifesto", label: copy.nav.clinic },
  { href: "#specialties", id: "specialties", label: copy.nav.specialties },
  { href: "#method", id: "method", label: copy.nav.method },
  { href: "#specialists", id: "specialists", label: copy.nav.specialists },
  { href: "#place", id: "place", label: copy.nav.visit },
] as const;

const DARK: [number, number, number] = [8, 8, 8];
const PAPER: [number, number, number] = [243, 239, 230];
const GOLD_DARK: [number, number, number] = [201, 168, 76];
const GOLD_PAPER: [number, number, number] = [122, 94, 20];
const INK_DARK: [number, number, number] = [245, 245, 245];
const INK_PAPER: [number, number, number] = [26, 24, 20];

type Rgb = [number, number, number];

function parseCssColor(input: string): { rgb: Rgb; a: number } | null {
  const match = input.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(",").map((part) => Number(part.trim()));
  if (parts.length < 3 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  return {
    rgb: [parts[0]!, parts[1]!, parts[2]!],
    a: parts[3] ?? 1,
  };
}

function relativeLuminance(rgb: Rgb): number {
  const toLinear = (channel: number) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(rgb[0]);
  const g = toLinear(rgb[1]);
  const b = toLinear(rgb[2]);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mixRgb(from: Rgb, to: Rgb, amount: number): Rgb {
  const t = Math.min(1, Math.max(0, amount));
  return [
    Math.round(from[0] + (to[0] - from[0]) * t),
    Math.round(from[1] + (to[1] - from[1]) * t),
    Math.round(from[2] + (to[2] - from[2]) * t),
  ];
}

function readBackground(el: Element | null): Rgb | null {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const parsed = parseCssColor(getComputedStyle(node).backgroundColor);
    if (parsed && parsed.a > 0.18) {
      return parsed.rgb;
    }
    node = node.parentElement;
  }
  return null;
}

function readPinnedField(): Rgb | null {
  const pinned = document.querySelectorAll<HTMLElement>(
    ".palette-wash-pin, .hero-cinematic-pin, .manifesto-line-pin, .clinic-folio-pin",
  );
  for (const node of pinned) {
    const rect = node.getBoundingClientRect();
    const position = getComputedStyle(node).position;
    const covering =
      rect.top <= 8 &&
      rect.bottom > 64 &&
      (position === "fixed" || position === "sticky");
    if (!covering) continue;
    const parsed = parseCssColor(getComputedStyle(node).backgroundColor);
    if (parsed && parsed.a > 0.18) {
      return parsed.rgb;
    }
  }
  return null;
}

function sampleField(header: HTMLElement): Rgb {
  const pinned = readPinnedField();
  if (pinned) return pinned;

  const x = Math.round(window.innerWidth * 0.5);
  const y = Math.round(Math.min(window.innerHeight * 0.12, 88));
  const stack = document.elementsFromPoint(x, y);
  const hit = stack.find((node) => !header.contains(node) && !node.closest(".skip-link"));
  return readBackground(hit ?? document.body) ?? DARK;
}

function heroHasReleased(): boolean {
  const manifesto = document.getElementById("manifesto");
  if (manifesto) {
    return manifesto.getBoundingClientRect().top <= window.innerHeight * 0.28;
  }
  return !document.querySelector(".hero-cinematic");
}

function readActiveId(): string {
  let current = NAV[0].id;
  for (const item of NAV) {
    const node = document.getElementById(item.id);
    if (node && node.getBoundingClientRect().top <= window.innerHeight * 0.32) {
      current = item.id;
    }
  }
  return current;
}

function WhatsAppMark() {
  return (
    <svg
      className="site-header-cta-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tone, setTone] = useState<"dark" | "paper">("paper");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("manifesto");
  const menuId = useId();

  const applyField = useCallback((rgb: Rgb, nextVisible: boolean) => {
    const header = headerRef.current;
    if (!header) return;

    const paperAmount = Math.min(
      1,
      Math.max(0, (relativeLuminance(rgb) - 0.06) / 0.78),
    );
    const field = mixRgb(DARK, PAPER, paperAmount);
    const ink = mixRgb(INK_DARK, INK_PAPER, paperAmount);
    const gold = mixRgb(GOLD_DARK, GOLD_PAPER, paperAmount);
    const nextTone: "dark" | "paper" = paperAmount > 0.45 ? "paper" : "dark";

    header.style.setProperty("--nav-field", field.join(", "));
    header.style.setProperty("--nav-ink", ink.join(", "));
    header.style.setProperty("--nav-gold", gold.join(", "));
    header.dataset.tone = nextTone;

    setTone((current) => (current === nextTone ? current : nextTone));
    setVisible((current) => (current === nextVisible ? current : nextVisible));
    const nextActive = readActiveId();
    setActiveId((current) => (current === nextActive ? current : nextActive));
    if (!nextVisible) {
      setMenuOpen((open) => (open ? false : open));
    }
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    let idle = 0;

    const sync = () => {
      applyField(sampleField(header), heroHasReleased());
    };

    const onScroll = () => {
      window.clearTimeout(idle);
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        sync();
        idle = window.setTimeout(sync, 180);
      });
    };

    frame = window.requestAnimationFrame(() => {
      frame = 0;
      sync();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    ScrollTrigger.addEventListener("update", onScroll);
    ScrollTrigger.addEventListener("refresh", onScroll);

    const fieldObserver = new IntersectionObserver(onScroll, {
      threshold: [0, 0.08, 0.24, 0.5, 0.8, 1],
    });
    document
      .querySelectorAll(
        "#manifesto, #clinic-folio, .hero-cinematic, .palette-wash-pin, .manifesto-line-pin, .clinic-folio-pin",
      )
      .forEach((node) => fieldObserver.observe(node));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ScrollTrigger.removeEventListener("update", onScroll);
      ScrollTrigger.removeEventListener("refresh", onScroll);
      fieldObserver.disconnect();
      window.clearTimeout(idle);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [applyField]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    setActiveId(id);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      block: "start",
      behavior: prefersReduced ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);
    const header = headerRef.current;
    if (header) {
      window.requestAnimationFrame(() => {
        applyField(sampleField(header), heroHasReleased());
      });
    }
  };

  return (
    <header
      ref={headerRef}
      role="banner"
      data-tone={tone}
      data-visible={visible ? "true" : "false"}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
      className="site-header"
    >
      <span className="site-header-rule" aria-hidden="true" />
      <span className="site-header-tick site-header-tick--a" aria-hidden="true" />
      <span className="site-header-tick site-header-tick--b" aria-hidden="true" />

      <div className="site-header-bar">
        <Link href="/" className="site-header-brand" aria-label={siteConfig.name}>
          <Image
            src="/assets/brand/logo-class-hero.webp"
            alt={siteConfig.name}
            width={1672}
            height={941}
            className="site-header-logo"
            priority
          />
        </Link>

        <nav className="site-header-nav" aria-label={copy.nav.primary}>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="site-header-link"
              aria-current={activeId === item.id ? "location" : undefined}
              onClick={(event) => goTo(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.whatsapp}
          className="site-header-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="site-header-cta-shimmer" aria-hidden="true" />
          <WhatsAppMark />
          <span>{copy.cta.buttonLabel}</span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="site-header-menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? copy.nav.menuClose : copy.nav.menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header-menu-line" />
          <span className="site-header-menu-line" />
        </button>
      </div>

      <div
        ref={panelRef}
        id={menuId}
        className="site-header-panel"
        role="dialog"
        aria-modal="true"
        aria-label={copy.nav.primary}
        hidden={!menuOpen}
      >
        <nav className="site-header-panel-nav" aria-label={copy.nav.primary}>
          {NAV.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className="site-header-panel-link"
              aria-current={activeId === item.id ? "location" : undefined}
              style={{ "--nav-i": String(index) } as React.CSSProperties}
              onClick={(event) => goTo(event, item.id)}
            >
              <span className="site-header-panel-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={siteConfig.whatsapp}
          className="site-header-cta site-header-cta--panel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="site-header-cta-shimmer" aria-hidden="true" />
          <WhatsAppMark />
          <span>{copy.cta.buttonLabel}</span>
        </a>
      </div>
    </header>
  );
}
