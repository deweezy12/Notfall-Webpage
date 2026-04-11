import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const themeStorageKey = "schluesseldienst-theme";
const baseUrl = import.meta.env.BASE_URL;
const withBase = (path: string) => `${baseUrl}${path.replace(/^\/+/, "")}`;

const prices = [
  {
    time: "Mo-Fr | 08:00-18:00",
    simple: "ab 79 EUR",
    locked: "ab 109 EUR",
  },
  {
    time: "Mo-Fr | 18:00-22:00",
    simple: "ab 99 EUR",
    locked: "ab 139 EUR",
  },
  {
    time: "Mo-Fr | 22:00-08:00",
    simple: "ab 129 EUR",
    locked: "ab 169 EUR",
  },
  {
    time: "Sa, So und Feiertage",
    simple: "ab 119 EUR",
    locked: "ab 159 EUR",
  },
];

const galleryCards = [
  {
    image: withBase("/images/1.jpg"),
    title: "Zugefallene Tür schnell geöffnet",
    text: "Wenn deine Tür nur zugefallen ist, öffnen wir sie in der Regel schnell und möglichst ohne Schäden. So kommst du zügig wieder in deine Wohnung oder dein Haus.",
  },
  {
    image: withBase("/images/2.jpg"),
    title: "Auch bei abgeschlossener Tür vor Ort",
    text: "Ist die Tür abgeschlossen oder der Zylinder defekt, arbeiten wir mit Erfahrung und dem passenden Werkzeug. Wir prüfen die Situation vor Ort und sagen dir klar, was möglich ist.",
  },
];

const slides = [
  withBase("/images/a.jpg"),
  withBase("/images/b.png"),
  withBase("/images/c.png"),
  withBase("/images/d.png"),
  withBase("/images/e.png"),
  withBase("/images/f.png"),
];

const contactCards = [
  {
    title: "Klare Preise, klare Abwicklung",
    text: "Du erfährst vor Arbeitsbeginn, in welchem Preisrahmen sich die Türöffnung bewegt. Wir arbeiten sauber, erklären den Ablauf und empfehlen nur, was wirklich nötig ist.",
  },
  {
    title: "Wichtiger Hinweis",
    text: "Damit wir keine unberechtigten Öffnungen durchführen, können wir vor Ort einen Nachweis deiner Zugangsberechtigung verlangen, zum Beispiel deinen Ausweis mit passender Anschrift. Bei ausdrücklich angeforderten Notöffnungen kann das Widerrufsrecht nach § 312g Abs. 2 Nr. 11 BGB ausgeschlossen sein; zusätzliche Arbeiten erfolgen nur nach deiner Zustimmung.",
  },
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <>
      <header className={`top-bar ${isScrolled ? "top-bar--scrolled" : ""}`}>
        <div className="top-bar__inner">
          <a className="brand" href="#start">
            Schlüsseldienst Berlin
          </a>
          <div className="top-bar__actions">
            <nav className="top-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#referenzen">Referenzen</a>
              <a href="#preise">Preise</a>
              <a href="#kontakt">Kontakt</a>
            </nav>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-pressed={isDark}
              aria-label={
                isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"
              }
            >
              {isDark ? "Hell" : "Dunkel"}
            </button>
            <a className="call-pill" href="tel:+493012345678">
              030 123 45 678
            </a>
          </div>
        </div>
      </header>

      <main id="start">
        <section className="hero">
          <div className="section-shell hero__layout">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--dark">
                24/7 Schlüsseldienst in Berlin
              </p>
              <h1>Schnelle Türöffnung. Wir helfen sofort.</h1>
              <p className="hero__lead">
                Ob zugefallene Tür, abgeschlossene Tür oder defektes Schloss:
                Wir sind schnell vor Ort, nennen dir den Preisrahmen vorab und
                sorgen dafür, dass du wieder reinkommst.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="tel:+493012345678">
                  Jetzt anrufen
                </a>
                <a className="button button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="about">
          <div className="section-shell about__layout">
            <div className="about__copy">
              <p className="eyebrow">Leistungen</p>
              <h2>Schnelle Hilfe, wenn du nicht mehr reinkommst.</h2>
              <p>
                Ob die Tür nur zugefallen ist oder der Schlüssel von innen
                steckt: Wir sorgen dafür, dass du schnell und möglichst
                beschädigungsfrei wieder in deine Wohnung oder dein Haus
                gelangst.
              </p>
              <p>
                Wir öffnen Türen fachgerecht und mit größter Sorgfalt. In vielen
                Fällen gelingt die Öffnung ohne Schäden, schnell, sauber und
                zuverlässig.
              </p>
              <p>
                Wir helfen bei <strong>zugefallenen Türen</strong>,{" "}
                <strong>abgeschlossenen Türen</strong>,{" "}
                <strong>Schlüsselproblemen</strong> sowie beim{" "}
                <strong>Schloss- und Zylinderwechsel</strong>, wenn ein Austausch
                nötig ist oder du dir wieder ein sicheres Gefühl verschaffen
                willst.
              </p>
            </div>
          </div>
        </section>

        <section id="referenzen" className="gallery">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">Referenzen</p>
              <h2 className="section-heading__title--nowrap">
                Typische Einsätze aus unserem Alltag.
              </h2>
            </div>

            <div className="gallery__stack">
              {galleryCards.map((card, index) => (
                <article
                  className={`gallery-card ${index % 2 === 1 ? "gallery-card--reverse" : ""}`}
                  key={card.title}
                >
                  <img src={card.image} alt={card.title} />
                  <div className="gallery-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="preise" className="pricing">
          <div className="section-shell pricing__layout">
            <div className="pricing__split">
              <div className="pricing__column pricing__column--table">
                <div className="section-heading pricing__intro">
                  <h2>Preise</h2>
                </div>

                <div className="price-table">
                  <div className="price-table__head">
                    <span>Zeitfenster</span>
                    <span>Zugefallene Tür</span>
                    <span>Abgeschlossene Tür</span>
                  </div>

                  {prices.map((row) => (
                    <div className="price-table__row" key={row.time}>
                      <span>{row.time}</span>
                      <strong>{row.simple}</strong>
                      <strong>{row.locked}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="pricing__column pricing__column--insights"
                id="einblicke"
              >
                <div className="pricing__aside-copy">
                  <h2>Einblicke</h2>
                </div>

                <div className="slider slider--dark">
                  <div className="slider__track">
                    {[...slides, ...slides].map((slide, index) => (
                      <div className="slide" key={`${slide}-${index}`}>
                        <img
                          src={slide}
                          alt={`Werkzeug und Einsatzbild ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="trust">
          <div className="section-shell trust__layout">
            <div className="trust__copy">
              <p className="eyebrow">Kontakt</p>
              <h2>Ruf uns an, wir kümmern uns um den Rest.</h2>
              <p>
                Du schilderst kurz die Situation, wir ordnen den Einsatz ein und
                machen uns auf den Weg. So bekommst du im Notfall schnell Hilfe,
                ohne lange Umwege.
              </p>

              <div className="hero__actions trust__actions">
                <a className="button button--primary" href="tel:+493012345678">
                  030 123 45 678
                </a>
                <a className="button button--secondary" href="#referenzen">
                  Einsätze ansehen
                </a>
              </div>
            </div>

            <div className="trust-list">
              {contactCards.map((point) => (
                <article className="trust-card" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer__meta">
          <div>
            <strong>Schlüsseldienst Berlin</strong>
            <p>Musterstraße 12, 10115 Berlin</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Türöffnung, Schlosswechsel, Zylinderwechsel, 24/7 Notdienst</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 030 123 45 678 | info@example.de</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
