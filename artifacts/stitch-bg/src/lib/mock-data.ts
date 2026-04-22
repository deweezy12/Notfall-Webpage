/**
 * Mock-Daten für alle Notdienst-Beispielseiten
 *
 * Diese Daten sind ausschließlich für Demonstrationszwecke gedacht.
 * Alle Firmen, Adressen, Telefonnummern und E-Mail-Adressen sind frei erfunden.
 */

export type ServiceKey =
  | "schluessel"
  | "rohr"
  | "elektrik"
  | "heizung"
  | "wanzleben";

export interface MockCompany {
  /** Vollständiger Firmenname */
  name: string;
  /** Straße und Hausnummer */
  street: string;
  /** PLZ und Stadt */
  city: string;
  /** Telefonnummer im internationalen Format (für tel: Link) */
  phone: string;
  /** Telefonnummer formatiert für Anzeige */
  phoneDisplay: string;
  /** E-Mail-Adresse */
  email: string;
  /** Google Maps Embed URL für iFrame */
  mapsEmbedUrl: string;
  /** Google Maps Link URL (öffnet in neuem Tab) */
  mapsLinkUrl: string;
  /** Kurzbeschreibung der Leistungen */
  services: string;
}

export const mockCompanies: Record<ServiceKey, MockCompany> = {
  schluessel: {
    name: "Schlüsseldienst Wuppertal",
    street: "Varresbecker Str. 193",
    city: "42115 Wuppertal",
    phone: "+4920212345678",
    phoneDisplay: "0202 123 45 678",
    email: "notdienst@example.de",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde",
    mapsLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal",
    services: "Türöffnung, Schlosswechsel, Zylinderwechsel, 24/7 Notdienst",
  },

  rohr: {
    name: "Sanitär Notdienst Wuppertal",
    street: "Varresbecker Str. 193",
    city: "42115 Wuppertal",
    phone: "+4920212345679",
    phoneDisplay: "0202 123 45 679",
    email: "notdienst@example.de",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde",
    mapsLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal",
    services:
      "Sanitär Notdienst, Abflussreinigung, WC-Verstopfung, Rückstau-Notdienst",
  },

  elektrik: {
    name: "Notfall Elektriker Wuppertal",
    street: "Varresbecker Str. 193",
    city: "42115 Wuppertal",
    phone: "+4920212345680",
    phoneDisplay: "0202 123 45 680",
    email: "notdienst@example.de",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde",
    mapsLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal",
    services:
      "Elektriker-Notdienst, Stromausfall, Sicherungskasten, FI- und Störungsprüfung",
  },

  heizung: {
    name: "Heizung Notdienst Wuppertal",
    street: "Varresbecker Str. 193",
    city: "42115 Wuppertal",
    phone: "+4920212345681",
    phoneDisplay: "0202 123 45 681",
    email: "notdienst@example.de",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde",
    mapsLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal",
    services:
      "Heizungs-Notdienst, Heizungsausfall, Warmwasser-Störungen, Thermostat-Reparatur",
  },

  wanzleben: {
    name: "Sanitär Notdienst Wanzleben",
    street: "Varresbecker Str. 193",
    city: "39164 Wanzleben-Börde",
    phone: "+4920212345679",
    phoneDisplay: "0202 123 45 679",
    email: "notdienst@example.de",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.123!2d11.447!3d52.068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDA0JzA0LjgiTiAxMcKwMjYnNDkuMiJF!5e0!3m2!1sde!2sde!4v1000000000000!5m2!1sde!2sde",
    mapsLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+39164+Wanzleben-Börde",
    services:
      "Sanitär Notdienst, Abflussreinigung, WC-Verstopfung, Rückstau-Notdienst",
  },
};

/**
 * Zentrale Kontaktdaten für Impressum und Datenschutz
 *
 * WICHTIG: Dies ist eine fiktive Beispiel-Firma für Demonstrationszwecke.
 */
export const legalEntity = {
  companyName: "Spacefield Media GmbH",
  legalForm: "Gesellschaft mit beschränkter Haftung",
  street: "Beispielstraße 42",
  city: "10115 Berlin",
  country: "Deutschland",
  phone: "+49 30 9876 5432",
  phoneDisplay: "030 9876 5432",
  email: "kontakt@spacefield-media-beispiel.de",
  managingDirector: "Max Mustermann",
  registrationCourt: "Amtsgericht Berlin-Charlottenburg",
  registrationNumber: "HRB 123456 B",
  vatId: "DE123456789",
  website: "www.spacefield-media-beispiel.de",
  disclaimer:
    "Dies ist eine fiktive Beispiel-Website für Demonstrationszwecke. Alle Daten sind frei erfunden.",
};
