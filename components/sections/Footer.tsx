/**
 * Site footer — ISSUE-015.
 *
 * Server Component (ADR-007). Motion Level 0.
 */

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { copy } from "@/content/copy";

const SOCIAL_LINK_CLASSES = [
  "font-sans text-sm tracking-label uppercase text-text-primary",
  "transition-colors [transition-duration:var(--duration-fast)]",
  "hover:text-gold",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus",
].join(" ");

export function Footer() {
  const copyright = copy.footer.copyright.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-bg-primary py-[--section-py]"
    >
      <Container>
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <Image
            src="/assets/brand/class-gray.png"
            alt={siteConfig.name}
            width={2172}
            height={724}
            className="footer-logo h-10 w-[calc(2.5rem*2172/724)] object-contain"
          />

          <address className="not-italic">
            <ul className="flex flex-col gap-8 font-sans text-base font-light text-text-primary">
              <li>
                <span className="mb-2 block font-sans text-sm font-medium tracking-label uppercase text-gold">
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
                <span className="mb-2 block font-sans text-sm font-medium tracking-label uppercase text-gold">
                  Endereço
                </span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state}
                <br />
                {siteConfig.address.postalCode}
              </li>
              <li>
                <span className="mb-2 block font-sans text-sm font-medium tracking-label uppercase text-gold">
                  Horário
                </span>
                {siteConfig.hours}
              </li>
            </ul>
          </address>

          <nav aria-label="Redes sociais">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={siteConfig.instagram}
                  className={SOCIAL_LINK_CLASSES}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  className={SOCIAL_LINK_CLASSES}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-20 font-sans text-sm font-light text-text-secondary">
          {copyright}
        </p>
      </Container>
    </footer>
  );
}
