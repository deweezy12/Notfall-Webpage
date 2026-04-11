export type ServiceKey = "schluessel" | "rohr" | "elektrik" | "heizung";

export type ServiceLink = {
  key: ServiceKey;
  label: string;
  title: string;
  href: string;
  note: string;
};

export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanedPath = path.replace(/^\/+/, "");
  return cleanedPath ? `${normalizedBase}${cleanedPath}` : normalizedBase;
}

export function asset(path: string): string {
  return withBase(path);
}

export const serviceLinks: ServiceLink[] = [
  {
    key: "schluessel",
    label: "Schlüssel",
    title: "Notfall Schlüsseldienst",
    href: withBase("schluessel/"),
    note: "Die bestehende Originalseite bleibt hier bewusst unveraendert.",
  },
  {
    key: "rohr",
    label: "Rohr",
    title: "Notfall Rohrreinigung",
    href: withBase("rohr/"),
    note: "Als naechste Variante entlang des Rohr-Designsystems.",
  },
  {
    key: "elektrik",
    label: "Elektrik",
    title: "Notfall Elektriker",
    href: withBase("elektrik/"),
    note: "Sicherheitsfokussierte Service-Seite mit klaren Stoerungsszenarien.",
  },
  {
    key: "heizung",
    label: "Heizung",
    title: "Notfall Heizungsdienst",
    href: withBase("heizung/"),
    note: "Warm-versus-Ausfall-Dramaturgie fuer die spaetere vierte Seite.",
  },
];
