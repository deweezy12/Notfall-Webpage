import { useTheme } from "@/lib/theme";
import { asset, withBase } from "@/lib/site";

const issueTags = [
  "Stromausfall",
  "FI loest aus",
  "Sicherungskasten",
  "Kurzschluss",
  "Steckdose",
  "Leitung pruefen",
];

const serviceCards = [
  {
    title: "Stoerung in Wohnung oder Haus",
    text: "Wenn ploetzlich nichts mehr funktioniert, pruefen wir Stromkreise, Sicherungen und naheliegende Fehlerquellen direkt vor Ort.",
    image: asset("images/a.jpg"),
  },
  {
    title: "FI oder Sicherung loest wiederholt aus",
    text: "Wir grenzen den Fehler ein und sagen dir ehrlich, ob eine schnelle Reparatur reicht oder weitere Arbeiten noetig werden.",
    image: asset("images/2.jpg"),
  },
  {
    title: "Auffaellige Steckdose oder Schalter",
    text: "Geruch, Hitze oder Ausfall sind ein klares Signal. Wir priorisieren Sicherheit und eine nachvollziehbare Loesung.",
    image: asset("images/f.png"),
  },
];

const highlights = [
  {
    title: "Heute besonders gefragt",
    text: "Strom weg in einzelnen Raeumen, FI faellt, Technik steht still.",
  },
  {
    title: "Vertrauenssignal",
    text: "Klare Sprache statt Panik. Wir beschreiben, was pruefbar ist und was nicht.",
  },
  {
    title: "Einsatzlogik",
    text: "Sicherheit zuerst, dann Eingrenzung, dann Reparatur oder belastbare Empfehlung.",
  },
];

const prices = [
  {
    slot: "Mo-Fr | 08:00-18:00",
    diagnostic: "ab 99 EUR",
    repair: "ab 139 EUR",
  },
  {
    slot: "Mo-Fr | 18:00-22:00",
    diagnostic: "ab 119 EUR",
    repair: "ab 159 EUR",
  },
  {
    slot: "Mo-Fr | 22:00-08:00",
    diagnostic: "ab 149 EUR",
    repair: "ab 189 EUR",
  },
  {
    slot: "Sa, So und Feiertage",
    diagnostic: "ab 139 EUR",
    repair: "ab 179 EUR",
  },
];

const trustCards = [
  {
    title: "Saubere Fehlersuche",
    text: "Wir pruefen die Ursache strukturiert, statt nur Symptome kurzfristig zu ueberbruecken.",
  },
  {
    title: "Nur sinnvolle Arbeiten",
    text: "Wenn weitere Reparaturen noetig sind, stimmen wir das mit dir transparent ab.",
  },
];

export function ElektrikPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="elektrik-page" id="start">
      <header className="elektrik-topbar">
        <div className="site-shell elektrik-topbar__inner">
          <a className="elektrik-brand" href="#start">
            Notfall Elektriker Berlin
          </a>

          <div className="elektrik-topbar__actions">
            <nav className="elektrik-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#einsaetze">Einsaetze</a>
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

            <a className="elektrik-call" href="tel:+493012345680">
              030 123 45 680
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="elektrik-hero">
          <div className="site-shell elektrik-hero__layout">
            <div className="elektrik-hero__copy">
              <p className="section-eyebrow">24/7 Elektriker-Notdienst in Berlin</p>
              <h1>Stromausfall oder Defekt? Wir helfen sofort.</h1>
              <p className="elektrik-hero__lead">
                Die Elektrik-Seite wirkt absichtlich wie ein browsebares
                Service-Angebot: freundlich, klar gegliedert und mit mehr
                visuellem Vertrauen als die reduzierte Rohr-Seite.
              </p>

              <div className="elektrik-hero__actions">
                <a className="elektrik-button elektrik-button--primary" href="tel:+493012345680">
                  Jetzt anrufen
                </a>
                <a className="elektrik-button elektrik-button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>

            <aside className="elektrik-hero__panel">
              <span className="elektrik-panel__badge">Heute verfuegbar</span>
              <strong>Sicherheit zuerst, schnelle Einordnung direkt danach.</strong>
              <p>
                Statt eines generischen Templates nutzt diese Route eine
                waermere, card-lastige Struktur mit klaren CTA-Schwerpunkten.
              </p>

              <div className="elektrik-highlight-list">
                {highlights.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="leistungen" className="elektrik-section elektrik-section--surface">
          <div className="site-shell">
            <div className="elektrik-tag-row" aria-label="Typische Stoerungen">
              {issueTags.map((item) => (
                <span className="elektrik-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="elektrik-intro">
              <p className="section-eyebrow">Leistungen</p>
              <h2>Akute Stoerungen klar gegliedert, nicht nur textlich abgehandelt.</h2>
              <p>
                Die Elektrik-Route bekommt ein eigenes Browse-Gefuehl mit
                bildgetragenen Einsatzkarten, weichen Schatten und warmen
                Flaechen. Damit trennt sie sich klar von Rohr und Heizung.
              </p>
            </div>
          </div>
        </section>

        <section id="einsaetze" className="elektrik-section elektrik-section--gallery">
          <div className="site-shell elektrik-gallery">
            {serviceCards.map((card) => (
              <article className="elektrik-card" key={card.title}>
                <img src={card.image} alt={card.title} />
                <div className="elektrik-card__body">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="preise" className="elektrik-section elektrik-section--pricing">
          <div className="site-shell elektrik-pricing">
            <div className="elektrik-pricing__table">
              <p className="section-eyebrow">Preise</p>
              <h2>Verstaendliche Preisfenster fuer Notfaelle.</h2>

              <div className="elektrik-price-table">
                <div className="elektrik-price-table__head">
                  <span>Zeitfenster</span>
                  <span>Stoerung pruefen</span>
                  <span>Reparatur vor Ort</span>
                </div>

                {prices.map((row) => (
                  <div className="elektrik-price-table__row" key={row.slot}>
                    <span>{row.slot}</span>
                    <strong>{row.diagnostic}</strong>
                    <strong>{row.repair}</strong>
                  </div>
                ))}
              </div>
            </div>

            <aside className="elektrik-pricing__aside">
              <p className="section-eyebrow">Vertrauen</p>
              <h2>Warm, klar, nicht technokratisch.</h2>
              <p>
                Die Seite lehnt sich an ein marktplatzartiges Design an:
                bildstarke Karten, rote Aktivpunkte, helle Flaechen und eine
                ruhigere Vertrauenssprache.
              </p>

              <div className="elektrik-trust-points">
                {trustCards.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="kontakt" className="elektrik-section elektrik-section--contact">
          <div className="site-shell elektrik-contact">
            <div>
              <p className="section-eyebrow">Kontakt</p>
              <h2>Bei Stromproblemen zaehlt eine sichere Loesung.</h2>
              <p>
                Ruf uns an, beschreibe kurz die Stoerung und wir ordnen ein, was
                sofort notwendig ist. Danach planen wir den Einsatz so, dass du
                schnell wieder Sicherheit hast.
              </p>
            </div>

            <div className="elektrik-contact__actions">
              <a className="elektrik-button elektrik-button--primary" href="tel:+493012345680">
                030 123 45 680
              </a>
              <a className="elektrik-button elektrik-button--secondary" href={withBase()}>
                Zur Landingpage
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="elektrik-footer">
        <div className="site-shell elektrik-footer__meta">
          <div>
            <strong>Notfall Elektriker Berlin</strong>
            <p>Beispielweg 8, 10115 Berlin</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Elektriker-Notdienst, Stromausfall, Sicherungskasten, FI- und Stoerungspruefung</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 030 123 45 680 | elektrik@example.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
