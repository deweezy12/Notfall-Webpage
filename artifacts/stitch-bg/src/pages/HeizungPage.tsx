import { useTheme } from "@/lib/theme";
import { withBase } from "@/lib/site";
import { mockCompanies } from "@/lib/mock-data";
import { StructuredData } from "@/components/StructuredData";

const company = mockCompanies.heizung;

const signalCards = [
  {
    status: "live",
    title: "Heizung bleibt kalt",
    text: "Wir prüfen Anlage, Druck und typische Fehlerquellen direkt vor Ort.",
  },
  {
    status: "priority",
    title: "Warmwasser plötzlich weg",
    text: "Bei fehlendem Warmwasser priorisieren wir Diagnose und schnelle Wiederherstellung.",
  },
  {
    status: "ready",
    title: "Störung an der Anlage",
    text: "Fehlermeldung, Startprobleme oder Druckverlust ordnen wir ohne Umwege ein.",
  },
];

const runbook = [
  "Störung kurz beschreiben",
  "Anlage und Fehlersignal prüfen",
  "Direkte Maßnahme oder klares Follow-up",
];

const prices = [
  {
    slot: "Mo-Fr | 08:00-18:00",
    diagnostic: "ab 99 EUR",
    repair: "ab 149 EUR",
  },
  {
    slot: "Mo-Fr | 18:00-22:00",
    diagnostic: "ab 119 EUR",
    repair: "ab 169 EUR",
  },
  {
    slot: "Mo-Fr | 22:00-08:00",
    diagnostic: "ab 149 EUR",
    repair: "ab 199 EUR",
  },
  {
    slot: "Sa, So und Feiertage",
    diagnostic: "ab 139 EUR",
    repair: "ab 189 EUR",
  },
];

const scrollItems = [
  "warmwasser",
  "heizkörper",
  "druckverlust",
  "brenner",
  "störung",
  "anlage startet nicht",
];

const contactCards = [
  {
    title: "Ehrliche Einschätzung",
    text: "Wir sagen offen, ob eine schnelle Reparatur möglich ist oder ob weitere Schritte nötig werden.",
  },
  {
    title: "Saubere Abstimmung",
    text: "Wenn Ersatzteile oder weitere Maßnahmen nötig sind, stimmen wir das klar mit dir ab.",
  },
];

export function HeizungPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="heizung-page" id="start">
      <StructuredData service="heizung" />
      <header className="heizung-topbar">
        <div className="site-shell heizung-topbar__inner">
          <a className="heizung-brand" href="#start">
            {company.name}
          </a>

          <div className="heizung-topbar__actions">
            <nav className="heizung-nav" aria-label="Seitenbereiche">
              <a href="#stoerungen">Störungen</a>
              <a href="#ablauf">Ablauf</a>
              <a href="#preise">Preise</a>
              <a href="#kontakt">Kontakt</a>
            </nav>

            <button
              type="button"
              className={`theme-toggle theme-toggle--${theme}`}
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Zu hellem Design wechseln"
                  : "Zu dunklem Design wechseln"
              }
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
            >
              <span className="theme-toggle__label">D</span>
              <span className="theme-toggle__label">L</span>
              <span className="theme-toggle__thumb" />
            </button>

            <a className="heizung-call" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="heizung-hero">
          <div className="site-shell heizung-hero__layout">
            <div className="heizung-hero__copy">
              <span className="heizung-status">system online</span>
              <h1>Heizung ausgefallen? Wir sind sofort da.</h1>
              <p className="heizung-hero__lead">
                Die Heizung-Route bekommt die lauteste Identität: starke
                Gradient-Flächen, pill-förmige Module und eine energische
                Display-Typografie statt eines neutralen Templates.
              </p>

              <div className="heizung-hero__actions">
                <a
                  className="heizung-button heizung-button--primary"
                  href={`tel:${company.phone}`}
                >
                  Jetzt anrufen
                </a>
                <a
                  className="heizung-button heizung-button--secondary"
                  href="#preise"
                >
                  Preise ansehen
                </a>
              </div>
            </div>

            <div className="heizung-hero__panel">
              <p className="section-eyebrow section-eyebrow--light">
                Störungsbild
              </p>
              <div className="heizung-signal-stack">
                {signalCards.map((item) => (
                  <article className="heizung-signal-card" key={item.title}>
                    <span
                      className={`heizung-signal-card__status heizung-signal-card__status--${item.status}`}
                    >
                      {item.status}
                    </span>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="stoerungen"
          className="heizung-section heizung-section--surface"
        >
          <div className="site-shell heizung-surface-intro">
            <p className="section-eyebrow">Störungen</p>
            <h2>Sichtbar anders gebaut als Rohr und Elektrik.</h2>
            <p>
              Diese Seite setzt auf übergroße Schlagzeilen, dunkle
              Kontrastflächen und runde Module. Sie soll sich wie ein eigenes
              Produkt anfühlen, nicht wie dieselbe Seite in anderer Farbe.
            </p>
          </div>
        </section>

        <section id="ablauf" className="heizung-section heizung-section--dark">
          <div className="site-shell heizung-runbook">
            <div className="heizung-runbook__copy">
              <p className="section-eyebrow section-eyebrow--light">Ablauf</p>
              <h2>Ein kleines Runbook für den Heizungsnotfall.</h2>
              <p>
                Die Replicate-inspirierte Route arbeitet mit starkem Kontrast,
                Statuschips und einer fast toolartigen Sprache für den
                Einsatzablauf.
              </p>
            </div>

            <div className="heizung-runbook__list">
              {runbook.map((item, index) => (
                <article className="heizung-runbook__item" key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="preise"
          className="heizung-section heizung-section--surface"
        >
          <div className="site-shell heizung-pricing">
            <div>
              <p className="section-eyebrow">Preise</p>
              <h2>Diagnose und Reparatur klar getrennt.</h2>
            </div>

            <div className="heizung-price-grid">
              {prices.map((row) => (
                <article className="heizung-price-pill" key={row.slot}>
                  <span>{row.slot}</span>
                  <strong>{row.diagnostic}</strong>
                  <p>Diagnose</p>
                  <strong>{row.repair}</strong>
                  <p>Reparatur vor Ort</p>
                </article>
              ))}
            </div>

            <div className="heizung-scroll" aria-label="Schlagworte">
              <div className="heizung-scroll__track">
                {[...scrollItems, ...scrollItems].map((item, index) => (
                  <span
                    className="heizung-scroll__chip"
                    key={`${item}-${index}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="kontakt"
          className="heizung-section heizung-section--contact"
        >
          <div className="site-shell heizung-contact">
            <div className="heizung-contact__copy">
              <p className="section-eyebrow">Kontakt</p>
              <h2>Ruf uns an, damit Wärme und Warmwasser zurückkommen.</h2>
              <p>
                Du schilderst kurz den Ausfall, wir ordnen die Störung ein und
                planen den nächsten Schritt. So bekommst du schnell wieder eine
                funktionierende Heizung.
              </p>

              <div className="heizung-hero__actions">
                <a
                  className="heizung-button heizung-button--primary"
                  href={`tel:${company.phone}`}
                >
                  {company.phoneDisplay}
                </a>
                <a
                  className="heizung-button heizung-button--secondary"
                  href={withBase()}
                >
                  Zur Landingpage
                </a>
              </div>
            </div>

            <div className="heizung-contact__cards">
              {contactCards.map((item) => (
                <article className="heizung-contact-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="heizung-footer">
        <div className="site-shell business-footer__grid">
          <div className="business-footer__column">
            <strong>{company.name}</strong>
            <p>{company.street}</p>
            <p>{company.city}</p>
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="business-footer__column">
            <strong>Links</strong>
            <a href="#stoerungen">Leistung</a>
            <a href="#kontakt">Angebot einholen</a>
          </div>
          <div className="business-footer__column">
            <strong>Folge uns auf</strong>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div className="business-footer__column">
            <strong>Rechtliches</strong>
            <a href={withBase("impressum/")}>Impressum</a>
            <a href={withBase("datenschutz/")}>Datenschutzerklärung</a>
            <a href="#start">AGB</a>
          </div>
        </div>
        <div className="site-shell heizung-footer__meta">
          <div>
            <strong>{company.name}</strong>
            <p>
              {company.street}, {company.city}
            </p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>{company.services}</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>
              24/7 erreichbar | {company.phoneDisplay} | {company.email}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
