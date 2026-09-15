/**
 * Site footer — compact contact strip (ADR-007, Motion Level 0).
 */

import Image from "next/image";
import { StoryLine } from "@/components/brand/StoryLine";
import { StorySpine } from "@/components/brand/StorySpine";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

function InstagramIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.2-1.3H17V3h-2.1C12.5 3 11 4.6 11 6.8v1.7H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.05 20.15a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

const SOCIAL_LINK_CLASSES = "footer-social-link";

export function Footer() {
  const copyright = copy.footer.copyright.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-border bg-bg-primary py-10 md:py-14"
    >
      <StorySpine tone="dark" columns={2} />
      <StoryLine kind="rail" tone="dark" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px opacity-70" />
      <Container className="relative z-[2]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_auto] md:items-start md:gap-12">
          <Image
            src="/assets/brand/logo-class-hero.webp"
            alt={siteConfig.name}
            width={1672}
            height={941}
            className="footer-logo"
          />

          <address className="not-italic">
            <ul className="flex flex-col gap-5 font-sans text-sm font-light text-text-primary md:text-base md:gap-6">
              <li>
                <span className="mb-1.5 block font-sans text-xs font-medium tracking-label uppercase text-gold">
                  WhatsApp
                </span>
                <a
                  href={siteConfig.whatsapp}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="mb-1.5 block font-sans text-xs font-medium tracking-label uppercase text-gold">
                  Endereço
                </span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state}
                <br />
                {siteConfig.address.postalCode}
              </li>
              <li>
                <span className="mb-1.5 block font-sans text-xs font-medium tracking-label uppercase text-gold">
                  Horário
                </span>
                {siteConfig.hours}
              </li>
            </ul>
          </address>

          <nav aria-label="Redes sociais">
            <ul className="flex flex-row gap-3">
              <li>
                <a
                  href={siteConfig.instagram}
                  className={SOCIAL_LINK_CLASSES}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  className={SOCIAL_LINK_CLASSES}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  className={SOCIAL_LINK_CLASSES}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-right font-sans text-xs font-light text-text-secondary md:mt-12">
          {copyright}
        </p>
      </Container>
    </footer>
  );
}
