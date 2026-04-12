import { useTheme } from "@/lib/theme";
import { asset, withBase } from "@/lib/site";

const metrics = [
  {
    title: "Schnell vor Ort",
    text: "Kurzfristige Terminvergabe bei Rueckstau, WC-Verstopfung und stehender Kueche.",
  },
  {
    title: "Klarer Ablauf",
    text: "Du bekommst vor Arbeitsbeginn eine verstaendliche Einschaetzung zum Einsatz.",
  },
  {
    title: "Saubere Ausfuehrung",
    text: "Wir arbeiten ordentlich und konzentriert auf die betroffene Leitung.",
  },
];

const services = [
  {
    title: "Kueche, Bad und WC",
    text: "Verstopfte Ablaufe in Wohnung und Haus loesen wir gezielt, ohne die Situation unnoetig aufzublasen.",
  },
  {
    title: "Rueckstau und Fallrohr",
    text: "Wenn Wasser zurueckdrueckt oder tiefer sitzende Leitungen betroffen sind, priorisieren wir Diagnose und schnelle Entlastung.",
  },
  {
    title: "Gewerbliche Einsaetze",
    text: "Auch fuer Buero, Laden oder Gastronomie planen wir Notfalleinsaetze mit klarer Zeitkommunikation.",
  },
];

const steps = [
  {
    title: "Telefonische Einordnung",
    text: "Du beschreibst kurz, wo das Wasser steht und seit wann die Stoerung besteht.",
  },
  {
    title: "Gezielte Anfahrt",
    text: "Wir kommen mit dem passenden Werkzeug und pruefen zuerst die wahrscheinlichste Ursache.",
  },
  {
    title: "Loesung vor Ort",
    text: "Nach der Reinigung erklaeren wir dir, was blockiert hat und ob weitere Schritte sinnvoll sind.",
  },
];

const prices = [
  {
    slot: "Mo-Fr | 08:00-18:00",
    standard: "ab 89 EUR",
    complex: "ab 129 EUR",
  },
  {
    slot: "Mo-Fr | 18:00-22:00",
    standard: "ab 109 EUR",
    complex: "ab 149 EUR",
  },
  {
    slot: "Mo-Fr | 22:00-08:00",
    standard: "ab 139 EUR",
    complex: "ab 179 EUR",
  },
  {
    slot: "Sa, So und Feiertage",
    standard: "ab 129 EUR",
    complex: "ab 169 EUR",
  },
];

const insightCards = [
  "Kuechenabfluss",
  "Bodenablauf",
  "WC-Verstopfung",
  "Rueckstau",
  "Fallrohr",
  "Notdienst",
];

const contactCards = [
  {
    title: "Transparente Abwicklung",
    text: "Wir sprechen vorab darueber, wie direkt sich der Einsatz loesen laesst und welcher Preisrahmen realistisch ist.",
  },
  {
    title: "Sinnvolle Empfehlungen",
    text: "Weitere Arbeiten sprechen wir nur an, wenn sie fuer die konkrete Leitung wirklich noetig sind.",
  },
];

export function RohrPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="rohr-page" id="start">
      <header className="rohr-topbar">
        <div className="site-shell rohr-topbar__inner">
          <a className="rohr-brand" href="#start">
            Notfall Rohrreinigung Berlin
          </a>

          <div className="rohr-topbar__actions">
            <nav className="rohr-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
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

            <a className="rohr-call" href="tel:+493012345679">
              030 123 45 679
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="rohr-hero">
          <div className="site-shell rohr-hero__layout">
            <div className="rohr-hero__copy">
              <p className="section-eyebrow section-eyebrow--light">
                24/7 Rohrreinigung in Berlin
              </p>
              <h1>Schnelle Hilfe bei verstopften Rohren.</h1>
              <p className="rohr-hero__lead">
                Ob Kueche, Bad, WC oder Bodenablauf: Wir kommen kurzfristig
                vorbei, pruefen die Ursache und sorgen dafuer, dass das Wasser
                wieder sauber ablaeuft.
              </p>

              <div className="rohr-hero__actions">
                <a className="rohr-button rohr-button--primary" href="tel:+493012345679">
                  Jetzt anrufen
                </a>
                <a className="rohr-button rohr-button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>

            <aside className="rohr-hero__panel" aria-label="Schnelle Uebersicht">
              <span className="rohr-panel__label">Naechster Einsatz</span>
              <strong>Akute Verstopfung ohne unnoetigen Umweg.</strong>
              <p>
                Wir fokussieren Diagnose, Reinigung und verstaendliche
                Kommunikation statt generischer Notdienst-Phrasen.
              </p>

              <div className="rohr-hero__metrics">
                {metrics.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="leistungen" className="rohr-section rohr-section--surface">
          <div className="site-shell rohr-story">
            <div className="rohr-story__intro">
              <p className="section-eyebrow">Leistungen</p>
              <h2>Rohrhilfe, die auf klare Prioritaeten gebaut ist.</h2>
              <p>
                Diese Seite bleibt bewusst ruhig und fokussiert. Statt eines
                generischen Multi-Service-Templates betont sie schnelle
                Einordnung, sauberes Vorgehen und die typische Rohr-Realitaet:
                Wasser steht, Zeit drueckt, die Loesung muss direkt greifen.
              </p>
            </div>

            <div className="rohr-service-grid">
              {services.map((item) => (
                <article className="rohr-service-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ablauf" className="rohr-section rohr-section--editorial">
          <div className="site-shell rohr-editorial">
            <article className="rohr-editorial__card">
              <img
                className="rohr-editorial__image"
                src={asset("slide-cylinder.svg")}
                alt="Schematische Rohrreinigungs-Grafik"
              />
              <div>
                <p className="section-eyebrow">Ablauf</p>
                <h2>Strukturiert statt hektisch.</h2>
                <p>
                  Der Ausbau folgt einer eigenen Rohr-Erzaehlung: klares
                  Erstgespraech, gezielte Pruefung, dann direkte Umsetzung vor
                  Ort. Kein Copy-Paste aus Elektrik oder Heizung.
                </p>
              </div>
            </article>

            <div className="rohr-process">
              {steps.map((item, index) => (
                <article className="rohr-process__card" key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="preise" className="rohr-section rohr-section--pricing">
          <div className="site-shell rohr-pricing">
            <div>
              <p className="section-eyebrow section-eyebrow--light">Preise</p>
              <h2>Klare Zeitfenster statt diffuser Notfallrhetorik.</h2>

              <div className="rohr-price-table">
                <div className="rohr-price-table__head">
                  <span>Zeitfenster</span>
                  <span>Standard</span>
                  <span>Aufwendiger Einsatz</span>
                </div>

                {prices.map((row) => (
                  <div className="rohr-price-table__row" key={row.slot}>
                    <span>{row.slot}</span>
                    <strong>{row.standard}</strong>
                    <strong>{row.complex}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="rohr-pricing__aside">
              <p className="section-eyebrow section-eyebrow--light">Einblicke</p>
              <p>
                Die visuelle Sprache bleibt reduziert: helle Flaechen, dunkler
                Hero und ein ruhiger Lauf aus typischen Einsatzbegriffen.
              </p>

              <div className="rohr-rail" aria-label="Typische Einsaetze">
                <div className="rohr-rail__track">
                  {[...insightCards, ...insightCards].map((item, index) => (
                    <div className="rohr-rail__pill" key={`${item}-${index}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="rohr-section rohr-section--surface">
          <div className="site-shell rohr-contact">
            <div className="rohr-contact__copy">
              <p className="section-eyebrow">Kontakt</p>
              <h2>Ruf uns an, bevor der Schaden groesser wird.</h2>
              <p>
                Du schilderst kurz, wo das Wasser nicht mehr ablaeuft oder
                zurueckdrueckt. Wir ordnen den Einsatz ein, nennen dir den
                Rahmen und machen uns direkt auf den Weg.
              </p>

              <div className="rohr-hero__actions">
                <a className="rohr-button rohr-button--primary" href="tel:+493012345679">
                  030 123 45 679
                </a>
                <a className="rohr-button rohr-button--secondary" href={withBase()}>
                  Zur Landingpage
                </a>
              </div>
            </div>

            <div className="rohr-contact__cards">
              {contactCards.map((item) => (
                <article className="rohr-contact-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="rohr-footer">
        <div className="site-shell rohr-footer__meta">
          <div>
            <strong>Notfall Rohrreinigung Berlin</strong>
            <p>Musterstrasse 12, 10115 Berlin</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Rohrreinigung, Abflussreinigung, WC-Verstopfung, Rueckstau-Notdienst</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 030 123 45 679 | rohr@example.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
