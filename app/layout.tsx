import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.address.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
      className={`${geistSans.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/cinematic/tooth/tooth-cinematic-prototype-poster.webp"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans font-light antialiased">
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        {siteConfig.showSiteHeader ? <SiteHeader /> : null}
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
