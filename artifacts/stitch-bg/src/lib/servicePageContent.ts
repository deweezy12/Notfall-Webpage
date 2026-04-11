import type { ServiceKey } from "@/lib/site";

export type ServicePriceRow = {
  time: string;
  primary: string;
  secondary: string;
};

export type ServiceStat = {
  title: string;
  text: string;
};

export type ServiceCard = {
  label: string;
  title: string;
  text: string;
};

export type ServiceContactCard = {
  title: string;
  text: string;
};

export type ServicePageContent = {
  key: Exclude<ServiceKey, "schluessel">;
  brand: string;
  city: string;
  phone: string;
  phoneHref: string;
  address: string;
  email: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  stats: ServiceStat[];
  galleryTitle: string;
  galleryLead: string;
  galleryCards: ServiceCard[];
  pricingTitle: string;
  pricingColumns: {
    primary: string;
    secondary: string;
  };
  prices: ServicePriceRow[];
  insightTitle: string;
  insightCards: string[];
  contactTitle: string;
  contactLead: string;
  contactCards: ServiceContactCard[];
  footerServices: string;
};

export const servicePageContent: Record<
  Exclude<ServiceKey, "schluessel">,
  ServicePageContent
> = {
  rohr: {
    key: "rohr",
    brand: "Notfall Rohrreinigung Berlin",
    city: "Berlin",
    phone: "030 123 45 679",
    phoneHref: "+493012345679",
    address: "Musterstraße 12, 10115 Berlin",
    email: "rohr@example.de",
    heroEyebrow: "24/7 Rohrreinigung in Berlin",
    heroTitle: "Schnelle Hilfe bei verstopften Rohren.",
    heroLead:
      "Ob Küche, Bad, WC oder Bodenablauf: Wir kommen kurzfristig vorbei, prüfen die Ursache und sorgen dafür, dass das Wasser wieder sauber abläuft.",
    aboutTitle: "Rohrreinigung, wenn es sofort gelöst werden muss.",
    aboutParagraphs: [
      "Wenn das Wasser stehen bleibt oder zurückdrückt, zählt vor allem eine schnelle und saubere Lösung. Wir helfen bei akuten Verstopfungen in Wohnung, Haus und Gewerbe.",
      "Wir arbeiten strukturiert, erklären dir den Ablauf und setzen genau dort an, wo das Problem sitzt. So wird aus einer stressigen Situation schnell wieder ein normaler Alltag.",
      "Typische Einsätze sind verstopfte Küchenabflüsse, blockierte WCs, zugesetzte Fallrohre und hartnäckige Ablagerungen, die sich mit Hausmitteln nicht mehr lösen lassen.",
    ],
    stats: [
      {
        title: "Schnell vor Ort",
        text: "Kurze Reaktionszeit bei akuten Verstopfungen und Rückstau.",
      },
      {
        title: "Saubere Arbeit",
        text: "Wir arbeiten ordentlich und hinterlassen keine unnötige Baustelle.",
      },
      {
        title: "Klare Einschätzung",
        text: "Du erfährst vor Beginn, womit du rechnen kannst.",
      },
    ],
    galleryTitle: "Typische Einsätze aus unserem Alltag.",
    galleryLead:
      "Noch ohne Bilder, aber inhaltlich klar: Wir richten die Seite auf genau die Situationen aus, in denen Kundinnen und Kunden jetzt gerade Hilfe brauchen.",
    galleryCards: [
      {
        label: "Einsatzbild folgt",
        title: "Küchenabfluss wieder frei",
        text: "Wenn sich das Wasser in der Spüle staut, reinigen wir den Abfluss gezielt und bringen den Ablauf schnell wieder in Gang.",
      },
      {
        label: "Einsatzbild folgt",
        title: "WC und Fallrohr im Notfall",
        text: "Bei starken Verstopfungen oder Rückstau prüfen wir die Situation vor Ort und lösen das Problem mit passendem Werkzeug und klarer Vorgehensweise.",
      },
    ],
    pricingTitle: "Preise",
    pricingColumns: {
      primary: "Standard-Einsatz",
      secondary: "Aufwendiger Einsatz",
    },
    prices: [
      {
        time: "Mo-Fr | 08:00-18:00",
        primary: "ab 89 EUR",
        secondary: "ab 129 EUR",
      },
      {
        time: "Mo-Fr | 18:00-22:00",
        primary: "ab 109 EUR",
        secondary: "ab 149 EUR",
      },
      {
        time: "Mo-Fr | 22:00-08:00",
        primary: "ab 139 EUR",
        secondary: "ab 179 EUR",
      },
      {
        time: "Sa, So und Feiertage",
        primary: "ab 129 EUR",
        secondary: "ab 169 EUR",
      },
    ],
    insightTitle: "Einblicke",
    insightCards: [
      "Küchenabfluss",
      "Badewanne",
      "WC-Verstopfung",
      "Bodenablauf",
      "Fallrohr",
      "Rückstau",
    ],
    contactTitle: "Ruf uns an, bevor der Schaden größer wird.",
    contactLead:
      "Du schilderst kurz, wo das Wasser nicht mehr abläuft oder zurückdrückt. Wir ordnen den Einsatz ein, nennen dir den Rahmen und machen uns direkt auf den Weg.",
    contactCards: [
      {
        title: "Transparente Abwicklung",
        text: "Wir erklären dir vor Arbeitsbeginn, wie wir vorgehen und welcher Preisrahmen realistisch ist.",
      },
      {
        title: "Sinnvolle Maßnahmen",
        text: "Wir reinigen gezielt die betroffene Leitung und empfehlen nur dann weitere Schritte, wenn sie wirklich notwendig sind.",
      },
    ],
    footerServices:
      "Rohrreinigung, Abflussreinigung, WC-Verstopfung, Rückstau-Notdienst",
  },
  elektrik: {
    key: "elektrik",
    brand: "Notfall Elektriker Berlin",
    city: "Berlin",
    phone: "030 123 45 680",
    phoneHref: "+493012345680",
    address: "Beispielweg 8, 10115 Berlin",
    email: "elektrik@example.de",
    heroEyebrow: "24/7 Elektriker-Notdienst in Berlin",
    heroTitle: "Stromausfall oder Defekt? Wir helfen sofort.",
    heroLead:
      "Wenn Sicherung, FI oder Stromversorgung Probleme machen, prüfen wir die Ursache vor Ort und sorgen schnell für eine sichere Lösung.",
    aboutTitle: "Elektriker-Notdienst für akute Störungen.",
    aboutParagraphs: [
      "Bei Stromausfall, defekten Sicherungen oder auffälligen Installationen solltest du nicht lange warten. Wir helfen schnell, sicher und mit klarer Einschätzung vor Ort.",
      "Wir prüfen Stromkreise, Sicherungen, FI-Schalter und typische Fehlerquellen systematisch. So bekommst du nicht nur eine schnelle Reaktion, sondern eine nachvollziehbare Lösung.",
      "Typische Einsätze sind plötzlicher Stromausfall in einzelnen Räumen, Probleme am Sicherungskasten, defekte Steckdosen oder akute elektrische Störungen nach Kurzschluss.",
    ],
    stats: [
      {
        title: "Sicher prüfen",
        text: "Wir gehen Störungen strukturiert und mit Blick auf die Sicherheit an.",
      },
      {
        title: "Schnelle Hilfe",
        text: "Kurze Abstimmung am Telefon, dann direkte Einsatzplanung.",
      },
      {
        title: "Klare Kommunikation",
        text: "Du bekommst eine ehrliche Einschätzung statt unklarer Versprechen.",
      },
    ],
    galleryTitle: "Typische Störungen, bei denen wir helfen.",
    galleryLead:
      "Die Bildflächen bleiben vorerst leer, die Inhalte sind aber bereits auf reale Notfälle zugeschnitten: Strom weg, Sicherung raus, Technik still.",
    galleryCards: [
      {
        label: "Einsatzbild folgt",
        title: "Stromausfall in Wohnung oder Haus",
        text: "Wenn plötzlich nichts mehr funktioniert, prüfen wir Stromkreise, Sicherungen und mögliche Fehlerquellen direkt vor Ort.",
      },
      {
        label: "Einsatzbild folgt",
        title: "Sicherung oder FI-Schalter löst aus",
        text: "Wir finden die Ursache, grenzen den Fehler ein und sorgen dafür, dass die Anlage wieder sicher genutzt werden kann.",
      },
    ],
    pricingTitle: "Preise",
    pricingColumns: {
      primary: "Störung prüfen",
      secondary: "Reparatur vor Ort",
    },
    prices: [
      {
        time: "Mo-Fr | 08:00-18:00",
        primary: "ab 99 EUR",
        secondary: "ab 139 EUR",
      },
      {
        time: "Mo-Fr | 18:00-22:00",
        primary: "ab 119 EUR",
        secondary: "ab 159 EUR",
      },
      {
        time: "Mo-Fr | 22:00-08:00",
        primary: "ab 149 EUR",
        secondary: "ab 189 EUR",
      },
      {
        time: "Sa, So und Feiertage",
        primary: "ab 139 EUR",
        secondary: "ab 179 EUR",
      },
    ],
    insightTitle: "Einblicke",
    insightCards: [
      "Sicherungskasten",
      "FI-Schalter",
      "Steckdose",
      "Kurzschluss",
      "Leitungsprüfung",
      "Stromkreis",
    ],
    contactTitle: "Bei Stromproblemen zählt eine sichere Lösung.",
    contactLead:
      "Ruf uns an, beschreibe kurz die Störung und wir ordnen ein, was sofort notwendig ist. Danach planen wir den Einsatz so, dass du schnell wieder Sicherheit hast.",
    contactCards: [
      {
        title: "Saubere Fehlersuche",
        text: "Wir prüfen die Ursache strukturiert, statt nur Symptome kurzfristig zu überbrücken.",
      },
      {
        title: "Nur sinnvolle Arbeiten",
        text: "Wenn weitere Reparaturen nötig sind, stimmen wir das mit dir transparent ab.",
      },
    ],
    footerServices:
      "Elektriker-Notdienst, Stromausfall, Sicherungskasten, FI- und Störungsprüfung",
  },
  heizung: {
    key: "heizung",
    brand: "Notfall Heizungsdienst Berlin",
    city: "Berlin",
    phone: "030 123 45 681",
    phoneHref: "+493012345681",
    address: "Beispielallee 22, 10115 Berlin",
    email: "heizung@example.de",
    heroEyebrow: "24/7 Heizungsdienst in Berlin",
    heroTitle: "Heizung ausgefallen? Wir sind sofort da.",
    heroLead:
      "Wenn die Heizung kalt bleibt oder das Warmwasser plötzlich weg ist, kommen wir kurzfristig vorbei, prüfen die Ursache und bringen die Anlage wieder in Gang.",
    aboutTitle: "Schnelle Hilfe bei Heizungsstörung und Ausfall.",
    aboutParagraphs: [
      "Gerade bei Kälte oder fehlendem Warmwasser ist ein Heizungsausfall sofort ein Problem. Wir helfen schnell, prüfen die Anlage vor Ort und setzen auf eine klare, direkte Lösung.",
      "Wir kümmern uns um akute Störungen, sichtbare Fehlermeldungen, Druckprobleme und typische Ausfälle im Heizungsbetrieb. Dabei erklären wir dir nachvollziehbar, was kaputt ist und was als Nächstes passiert.",
      "Typische Einsätze sind kalte Heizkörper, komplett ausgefallene Heizungen, fehlendes Warmwasser oder Störungen, bei denen die Anlage nicht mehr sauber startet.",
    ],
    stats: [
      {
        title: "Schnell erreichbar",
        text: "Kurze Abstimmung und schnelle Einsatzplanung im Notfall.",
      },
      {
        title: "Klare Diagnose",
        text: "Wir prüfen die Ursache vor Ort und sagen dir offen, was möglich ist.",
      },
      {
        title: "Direkte Hilfe",
        text: "Wo möglich, beheben wir die Störung sofort beim ersten Termin.",
      },
    ],
    galleryTitle: "Typische Ausfälle aus unserem Alltag.",
    galleryLead:
      "Die späteren Bilder kommen noch. Die Seite ist aber bereits auf die wichtigsten Notfälle zugeschnitten: kalt, kein Warmwasser, Anlage steht.",
    galleryCards: [
      {
        label: "Einsatzbild folgt",
        title: "Heizung bleibt kalt",
        text: "Wenn die Heizkörper nicht mehr warm werden, prüfen wir Anlage, Druck und typische Fehlerquellen direkt vor Ort.",
      },
      {
        label: "Einsatzbild folgt",
        title: "Warmwasser plötzlich weg",
        text: "Fehlt plötzlich das Warmwasser, sorgen wir für eine schnelle Diagnose und setzen alles daran, die Versorgung wiederherzustellen.",
      },
    ],
    pricingTitle: "Preise",
    pricingColumns: {
      primary: "Diagnose",
      secondary: "Reparatur vor Ort",
    },
    prices: [
      {
        time: "Mo-Fr | 08:00-18:00",
        primary: "ab 99 EUR",
        secondary: "ab 149 EUR",
      },
      {
        time: "Mo-Fr | 18:00-22:00",
        primary: "ab 119 EUR",
        secondary: "ab 169 EUR",
      },
      {
        time: "Mo-Fr | 22:00-08:00",
        primary: "ab 149 EUR",
        secondary: "ab 199 EUR",
      },
      {
        time: "Sa, So und Feiertage",
        primary: "ab 139 EUR",
        secondary: "ab 189 EUR",
      },
    ],
    insightTitle: "Einblicke",
    insightCards: [
      "Störung",
      "Warmwasser",
      "Heizkörper",
      "Brenner",
      "Druckverlust",
      "Anlage startet nicht",
    ],
    contactTitle: "Ruf uns an, damit Wärme und Warmwasser zurückkommen.",
    contactLead:
      "Du schilderst kurz den Ausfall, wir ordnen die Störung ein und planen den nächsten Schritt. So bekommst du schnell wieder eine funktionierende Heizung.",
    contactCards: [
      {
        title: "Ehrliche Einschätzung",
        text: "Wir sagen dir offen, ob eine schnelle Reparatur möglich ist oder ob weitere Arbeiten nötig werden.",
      },
      {
        title: "Saubere Abstimmung",
        text: "Wenn Ersatzteile oder weitere Maßnahmen nötig sind, stimmen wir das klar mit dir ab.",
      },
    ],
    footerServices:
      "Heizungsnotdienst, Störungsdiagnose, Warmwasser-Ausfall, Reparatur vor Ort",
  },
};
