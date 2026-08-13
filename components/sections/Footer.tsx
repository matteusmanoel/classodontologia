/**
 * Site footer — ISSUE-015.
 *
 * Server Component (ADR-007). Motion Level 0. Brand mark, contact
 * placeholders, and approved social URLs from siteConfig/copy.
 * Copyright year is injected at render time.
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
    <footer role="contentinfo" className="border-t border-border bg-bg-primary py-[--section-py]">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Image
            src="/assets/brand/class-gray.png"
            alt={siteConfig.name}
            width={2172}
            height={724}
            className="h-10 w-[calc(2.5rem*2172/724)] object-contain"
          />

          <address className="not-italic">
            <ul className="flex flex-col gap-3 font-sans text-base text-text-primary">
              <li>
                <span className="block font-sans text-sm tracking-label uppercase text-gold">
                  Telefone
                </span>
                {siteConfig.phone}
              </li>
              <li>
                <span className="block font-sans text-sm tracking-label uppercase text-gold">
                  Endereço
                </span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state}
                <br />
                {siteConfig.address.postalCode}
              </li>
              <li>
                <span className="block font-sans text-sm tracking-label uppercase text-gold">
                  Horário
                </span>
                {siteConfig.hours}
              </li>
            </ul>
          </address>

          <nav aria-label="Redes sociais">
            <ul className="flex flex-col gap-3">
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

        <p className="mt-12 font-sans text-sm text-text-primary">{copyright}</p>
      </Container>
    </footer>
  );
}
