import { StructuredData } from "@/components/StructuredData";
import { mockCompanies } from "@/lib/mock-data";
import { asset } from "@/lib/site";
import { useTheme } from "@/lib/theme";

const company = mockCompanies.physiotherapie;

const practice = {
  name: "Physiotherapie Praxis Berlin",
  street: "Friedrichstra\u00dfe 85",
  city: "10117 Berlin",
  phoneDisplay: "030 123 456 78",
  email: "kontakt@physiotherapie-berlin-beispiel.de",
};

const heroImage = asset("images/physiotherapie/clinic-hero.png");

const services = [
  {
    title: "Krankengymnastik",
    text: "Aktive Therapie nach Verletzungen, Operationen und bei chronischen Beschwerden.",
    items: [
      ["Klassische Krankengymnastik", "20 min", "Rezept"],
      ["Krankengymnastik am Ger\u00e4t", "30 min", "Rezept"],
      ["Atemtherapie", "20 min", "Rezept"],
    ],
  },
  {
    title: "Manuelle Therapie",
    text: "Gezielte Behandlung von Gelenken, Muskeln und Faszien mit ruhigen Grifftechniken.",
    items: [
      ["Manuelle Therapie", "20-30 min", "Rezept"],
      ["Lymphdrainage", "30-60 min", "Rezept"],
      ["W\u00e4rme- und K\u00e4ltetherapie", "15 min", "Rezept"],
    ],
  },
  {
    title: "Sportphysiotherapie",
    text: "Aufbau, Stabilit\u00e4t und Belastungssteuerung f\u00fcr Training und Alltag.",
    items: [
      ["Sportphysiotherapie", "30 min", "ab 45 EUR"],
      ["Kinesio-Taping", "15 min", "ab 15 EUR"],
      ["Trainingsberatung", "45 min", "ab 60 EUR"],
    ],
  },
  {
    title: "Massage & Wellness",
    text: "Ruhige Privatleistungen zur L\u00f6sung von Verspannungen und Regeneration.",
    items: [
      ["Teilk\u00f6rpermassage", "20 min", "ab 30 EUR"],
      ["Ganzk\u00f6rpermassage", "45 min", "ab 55 EUR"],
      ["Fu\u00dfreflexzonenmassage", "30 min", "ab 35 EUR"],
    ],
  },
];

const highlights = [
  ["01", "Befund zuerst", "Jede Behandlung beginnt mit einer klaren Analyse statt Standardprogramm."],
  ["02", "Ruhige Praxis", "Helle R\u00e4ume, kurze Wege und eine Atmosph\u00e4re ohne Klinikstress."],
  ["03", "Aktiver Aufbau", "Therapie und Training greifen ineinander, damit Fortschritt bleibt."],
];

const reviews = [
  ["Michael K.", "Nach wenigen Sitzungen waren meine R\u00fcckenschmerzen deutlich besser. Sehr kompetentes und ruhiges Team."],
  ["Anna S.", "Moderne Praxis, klare Erkl\u00e4rungen und ein Behandlungsplan, der wirklich zu meinem Alltag passt."],
  ["Thomas B.", "Nach einer Sportverletzung wurde ich sauber aufgebaut. Die Mischung aus Therapie und Training war stark."],
];

const openingHours = [
  ["Montag - Donnerstag", "08:00 - 19:00 Uhr"],
  ["Freitag", "08:00 - 17:00 Uhr"],
  ["Samstag", "Nach Vereinbarung"],
];

function Icon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d={path} />
    </svg>
  );
}

export function PhysiotherapiePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="physiotherapie-page" id="start">
      <StructuredData service="physiotherapie" />
      <a href="#leistungen" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      <header className="physiotherapie-header">
        <div className="physiotherapie-shell physiotherapie-header__inner">
          <a className="physiotherapie-brand" href="#start">
            {practice.name}
          </a>
          <nav className="physiotherapie-nav" aria-label="Seitenbereiche">
            <a href="#leistungen">Leistungen</a>
            <a href="#preise">Preise</a>
            <a href="#bewertungen">Bewertungen</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <button
            type="button"
            className="physiotherapie-theme"
            onClick={toggleTheme}
            aria-label="Theme wechseln"
          >
            {theme === "dark" ? "Hell" : "Dunkel"}
          </button>
        </div>
      </header>

      <main>
        <section className="physiotherapie-hero" aria-labelledby="hero-title">
          <div className="physiotherapie-shell physiotherapie-hero__layout">
            <div className="physiotherapie-hero__copy">
              <p className="physiotherapie-eyebrow">Berlin Mitte</p>
              <h1 id="hero-title">Physiotherapie, die wieder leicht macht.</h1>
              <p className="physiotherapie-hero__lead">
                Pr\u00e4zise Befundung, moderne Behandlung und ein klarer Plan
                f\u00fcr Mobilit\u00e4t, Kraft und einen Alltag mit weniger Schmerz.
              </p>
              <div className="physiotherapie-hero__actions">
                <a className="physiotherapie-button physiotherapie-button--primary" href="#kontakt">
                  Termin vereinbaren
                </a>
                <a className="physiotherapie-button physiotherapie-button--secondary" href="#preise">
                  Leistungen ansehen
                </a>
              </div>
            </div>
            <div className="physiotherapie-hero__media">
              <img src={heroImage} alt="Helle Physiotherapie Praxis mit Behandlungssituation" />
              <div className="physiotherapie-hero__card">
                <strong>4.9</strong>
                <span>Patientenbewertung</span>
              </div>
            </div>
          </div>
        </section>

        <section className="physiotherapie-section" id="leistungen">
          <div className="physiotherapie-shell">
            <div className="physiotherapie-section__head">
              <p className="physiotherapie-eyebrow">Therapieansatz</p>
              <h2>Ruhig, strukturiert und messbar.</h2>
              <p>
                Wir verbinden manuelle Techniken mit aktiver Bewegungstherapie.
                So entsteht Behandlung, die sich gut anf\u00fchlt und im Alltag
                weiterwirkt.
              </p>
            </div>
            <div className="physiotherapie-highlight-grid">
              {highlights.map(([number, title, text]) => (
                <article className="physiotherapie-highlight" key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="physiotherapie-section physiotherapie-section--soft" id="preise">
          <div className="physiotherapie-shell">
            <div className="physiotherapie-section__head">
              <p className="physiotherapie-eyebrow">Leistungen & Preise</p>
              <h2>Klare Angebote ohne visuelles Chaos.</h2>
            </div>
            <div className="physiotherapie-service-grid">
              {services.map((service) => (
                <article className="physiotherapie-service" key={service.title}>
                  <div className="physiotherapie-service__icon">
                    <Icon path="M4 12h4l3-8 4 16 3-8h2" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="physiotherapie-price-list">
                    {service.items.map(([name, duration, price]) => (
                      <div className="physiotherapie-price-row" key={name}>
                        <span>{name}</span>
                        <small>{duration}</small>
                        <strong>{price}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="physiotherapie-gallery" aria-label="Praxis Eindruck">
          <div className="physiotherapie-shell physiotherapie-gallery__layout">
            <img src={heroImage} alt="Moderner Behandlungsraum einer Physiotherapie Praxis" />
            <div>
              <p className="physiotherapie-eyebrow">Praxis</p>
              <h2>Helle R\u00e4ume, klare Abl\u00e4ufe, kein Notdienst-Look.</h2>
              <p>
                Die Seite nutzt jetzt eine ruhige medizinische Farbwelt,
                hochwertige Fl\u00e4chen und stabile Bildformate statt fehlender
                Medien und kaputter Karten.
              </p>
            </div>
          </div>
        </section>

        <section className="physiotherapie-section physiotherapie-section--reviews" id="bewertungen">
          <div className="physiotherapie-shell">
            <div className="physiotherapie-section__head">
              <p className="physiotherapie-eyebrow">Bewertungen</p>
              <h2>Patientenstimmen</h2>
            </div>
            <div className="physiotherapie-review-grid">
              {reviews.map(([author, text]) => (
                <article className="physiotherapie-review" key={author}>
                  <div className="physiotherapie-stars" aria-label="5 von 5 Sternen">
                    {"★★★★★"}
                  </div>
                  <p>{text}</p>
                  <strong>{author}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="physiotherapie-contact" id="kontakt">
          <div className="physiotherapie-shell physiotherapie-contact__layout">
            <div className="physiotherapie-contact__panel">
              <p className="physiotherapie-eyebrow">Kontakt</p>
              <h2>Termin anfragen</h2>
              <p>
                {practice.name}
                <br />
                {practice.street}
                <br />
                {practice.city}
              </p>
              <div className="physiotherapie-contact__links">
                <a href={`tel:${company.phone}`}>{practice.phoneDisplay}</a>
                <a href={`mailto:${practice.email}`}>{practice.email}</a>
              </div>
              <div className="physiotherapie-hours">
                {openingHours.map(([day, hours]) => (
                  <p key={day}>
                    <strong>{day}</strong>
                    <span>{hours}</span>
                  </p>
                ))}
              </div>
            </div>
            <iframe
              src={company.mapsEmbedUrl}
              title="Google Maps Standort"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="physiotherapie-footer">
        <div className="physiotherapie-shell">
          <p>
            &copy; 2026 {practice.name} · <a href="/impressum/">Impressum</a> ·{" "}
            <a href="/datenschutz/">Datenschutz</a>
          </p>
        </div>
      </footer>

      <nav className="physiotherapie-mobile-cta" aria-label="Schnellzugriff">
        <a href="#preise">Preise</a>
        <a href={`tel:${company.phone}`}>Anrufen</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </div>
  );
}
