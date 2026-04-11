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
    note: "Die bestehende Originalseite bleibt hier bewusst unverändert.",
  },
  {
    key: "rohr",
    label: "Rohr",
    title: "Notfall Rohrreinigung",
    href: withBase("rohr/"),
    note: "Klare Rohrreinigungs-Seite mit schneller Hilfe bei Verstopfungen.",
  },
  {
    key: "elektrik",
    label: "Elektrik",
    title: "Notfall Elektriker",
    href: withBase("elektrik/"),
    note: "Sicherheitsfokussierte Service-Seite für akute elektrische Störungen.",
  },
  {
    key: "heizung",
    label: "Heizung",
    title: "Notfall Heizungsdienst",
    href: withBase("heizung/"),
    note: "Notdienst-Seite für Heizungsausfall und fehlendes Warmwasser.",
  },
];
