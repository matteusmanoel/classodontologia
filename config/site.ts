export const siteConfig = {
  name: "Class Odontologia",
  tagline: "Odontologia de especialidade em Foz do Iguaçu.",
  description:
    "Class Odontologia em Foz do Iguaçu: estética, implantes, ortodontia e reabilitação oral com especialistas desde 1998.",
  url: "https://classodontologia.com.br",
  locale: "pt_BR",
  phone: "(45) 99844-3993",
  whatsapp: "https://wa.me/5545998443993",
  address: {
    street: "Rua Engenheiro Rebouças, 441",
    city: "Foz do Iguaçu",
    state: "PR",
    postalCode: "85851-190",
    country: "BR",
  },
  hours: "Segunda a sexta, com hora marcada",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua%20Engenheiro%20Rebou%C3%A7as%2C%20441%2C%20Foz%20do%20Igua%C3%A7u%20-%20PR%2C%2085851-190",
  instagram: "https://www.instagram.com/classodontologiafoz/",
  facebook: "https://www.facebook.com/ClassOdontologiaFoz/",
} as const

/** E.164 number taken from the WhatsApp link, the number the site already publishes. */
function telephoneE164(): string {
  const digits = siteConfig.whatsapp.replace(/\D/g, "")
  return `+${digits}`
}

/** Dentist structured data. Hours stay out: the site only says visits are by appointment. */
export function dentistStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: telephoneE164(),
    image: `${siteConfig.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    hasMap: siteConfig.mapsUrl,
    sameAs: [siteConfig.instagram, siteConfig.facebook],
  }
}

/** Pre-filled WhatsApp message shared by every visit CTA. */
export function whatsappHref(): string {
  const text =
    "Olá! Vim pelo site da Class Odontologia e gostaria de agendar uma visita."
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`
}
