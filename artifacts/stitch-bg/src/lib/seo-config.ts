/**
 * SEO-Konfiguration für alle Notdienst-Beispielseiten
 *
 * Zentrale Verwaltung von Meta-Tags, Open Graph, Twitter Cards
 * und strukturierten Daten für bessere Suchmaschinen-Optimierung.
 */

import type { ServiceKey } from "./mock-data";
import { mockCompanies } from "./mock-data";
import { withBase } from "./site";

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl: string;
}

export const pageSEO: Record<ServiceKey | "landing", PageSEO> = {
  landing: {
    title: "Notfall Webpage | Landingpage Showcase",
    description:
      "Portfolio-Showcase für Notfall-Landingpages mit interaktiver Startseite, Theme-Toggle und separaten Unterseiten für Schlüssel, Rohr, Elektrik und Heizung.",
    canonicalUrl: withBase(),
  },

  schluessel: {
    title: "Schlüsseldienst Berlin | Schnelle Türöffnung und 24/7 Notdienst",
    description:
      "Schlüsseldienst in Berlin für schnelle Türöffnungen, Hilfe bei Schlossproblemen und 24/7 Notdienst mit klaren Preisen.",
    canonicalUrl: withBase("schluessel/"),
  },

  rohr: {
    title: "Notfall Rohrreinigung Berlin | Schnelle Hilfe bei Verstopfungen",
    description:
      "Notfall Rohrreinigung in Berlin für schnelle Hilfe bei verstopften Abflüssen, WC-Verstopfungen und Rückstau.",
    canonicalUrl: withBase("rohr/"),
  },

  elektrik: {
    title: "Notfall Elektriker Berlin | Schnelle Hilfe bei Stromausfall",
    description:
      "Elektriker-Notdienst in Berlin für Stromausfall, defekte Sicherungen und akute elektrische Störungen.",
    canonicalUrl: withBase("elektrik/"),
  },

  heizung: {
    title: "Heizung Notdienst Berlin | Schnelle Hilfe bei Heizungsausfall",
    description:
      "Heizungs-Notdienst in Berlin für Heizungsausfall, fehlende Warmwasser und dringende Heizungsprobleme.",
    canonicalUrl: withBase("heizung/"),
  },
};

/**
 * Generiert Schema.org LocalBusiness strukturierte Daten
 * für bessere SEO und Rich Snippets in Suchergebnissen
 */
export function generateLocalBusinessSchema(serviceKey: ServiceKey) {
  const company = mockCompanies[serviceKey];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: pageSEO[serviceKey].description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.city.split(" ")[1], // Extract city name
      postalCode: company.city.split(" ")[0], // Extract postal code
      addressCountry: "DE",
    },
    telephone: company.phone,
    email: company.email,
    url: pageSEO[serviceKey].canonicalUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    areaServed: {
      "@type": "City",
      name: company.city.split(" ")[1],
    },
  };
}

/**
 * Generiert Meta-Tags für Open Graph (Facebook, LinkedIn, etc.)
 */
export function generateOpenGraphTags(
  pageKey: ServiceKey | "landing",
  ogImage?: string,
) {
  const seo = pageSEO[pageKey];

  return {
    "og:title": seo.title,
    "og:description": seo.description,
    "og:url": seo.canonicalUrl,
    "og:type": "website",
    "og:image": ogImage || withBase("og-image.jpg"),
    "og:locale": "de_DE",
  };
}

/**
 * Generiert Twitter Card Meta-Tags
 */
export function generateTwitterCardTags(
  pageKey: ServiceKey | "landing",
  twitterImage?: string,
) {
  const seo = pageSEO[pageKey];

  return {
    "twitter:card": "summary_large_image",
    "twitter:title": seo.title,
    "twitter:description": seo.description,
    "twitter:image": twitterImage || withBase("og-image.jpg"),
  };
}
