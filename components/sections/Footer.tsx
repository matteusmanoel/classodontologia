/**
 * Site footer — compact contact strip (ADR-007, Motion Level 0).
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
      className="border-t border-border bg-bg-primary py-10 md:py-14"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <Image
            src="/assets/brand/class-gray.png"
            alt={siteConfig.name}
            width={2172}
            height={724}
            className="footer-logo h-8 w-[calc(2rem*2172/724)] object-contain md:h-9 md:w-[calc(2.25rem*2172/724)]"
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
            <ul className="flex flex-row gap-6 lg:flex-col lg:gap-3">
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

        <p className="mt-10 pt-2 text-right font-sans text-xs font-light text-text-secondary md:mt-12">
          {copyright}
        </p>
      </Container>
    </footer>
  );
}
