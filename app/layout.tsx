import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.address.city}`;

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <header role="banner" className="border-b border-border px-[--section-px] py-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/assets/brand/class-gray.webp"
              alt={siteConfig.name}
              width={752}
              height={264}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </header>
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
