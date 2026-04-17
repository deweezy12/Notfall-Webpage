/**
 * StructuredData Komponente
 *
 * Rendert Schema.org JSON-LD strukturierte Daten für SEO.
 * Hilft Suchmaschinen die Seite besser zu verstehen und
 * ermöglicht Rich Snippets in Suchergebnissen.
 */

import type { ServiceKey } from "@/lib/mock-data";
import { generateLocalBusinessSchema } from "@/lib/seo-config";

interface StructuredDataProps {
  service: ServiceKey;
}

export function StructuredData({ service }: StructuredDataProps) {
  const schema = generateLocalBusinessSchema(service);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
