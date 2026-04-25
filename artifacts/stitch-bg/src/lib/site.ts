export type ServiceKey =
  | "schluessel"
  | "rohr"
  | "elektrik"
  | "heizung"
  | "nagelstudio"
  | "soundfield"
  | "wanzleben";

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
    label: "Sanitär",
    title: "Sanitär Notdienst",
    href: withBase("rohr/"),
    note: "Klare Sanitär-Notdienst-Seite für akute Probleme in Bad, Küche und Leitung.",
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
  {
    key: "nagelstudio",
    label: "Nagelstudio",
    title: "Nagelstudio",
    href: withBase("nagelstudio/"),
    note: "Leere Platzhalter-Seite für das Nagelstudio.",
  },
  {
    key: "soundfield",
    label: "Soundfield",
    title: "Soundfield",
    href: withBase("soundfield/"),
    note: "Soundfield service page.",
  },
  {
    key: "wanzleben",
    label: "Sanitär Wanzleben",
    title: "Sanitär Notdienst Wanzleben",
    href: withBase("wanzleben/"),
    note: "Sanitär-Notdienst-Seite für akute Probleme in Wanzleben-Börde.",
  },
];
