import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header
      role="banner"
      className="site-header pointer-events-none fixed inset-x-0 top-0 z-[--z-nav]"
    >
      <div className="pointer-events-auto flex items-center justify-between px-[--section-px] py-5 md:py-7">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/assets/brand/class-gray.png"
            alt={siteConfig.name}
            width={2172}
            height={724}
            className="site-header-logo h-7 w-[calc(1.75rem*2172/724)] object-contain md:h-8 md:w-[calc(2rem*2172/724)]"
            priority
            loading="eager"
          />
        </Link>
        <a
          href={siteConfig.whatsapp}
          className="site-header-cta font-sans text-sm font-medium tracking-label uppercase text-gold transition-colors duration-[var(--duration-fast)] hover:text-gold-light"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}
