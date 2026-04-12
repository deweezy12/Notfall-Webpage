import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useTheme } from "@/lib/theme";
import { asset, withBase } from "@/lib/site";

const serviceCards = [
  {
    title: "Stromausfall und Sicherung sauber eingegrenzt",
    text: "Wenn plötzlich ganze Bereiche ausfallen oder Sicherungen nicht mehr halten, prüfen wir Stromkreise, Verteilung und naheliegende Fehlerquellen direkt vor Ort. So bekommst du schnell eine klare Einschätzung, statt lange im Dunkeln zu stehen.",
    image: asset("images/elektrik/elektriker1.png"),
  },
  {
    title: "FI-Fehler, Steckdosen und Schalter direkt geprüft",
    text: "Wenn der FI wiederholt auslöst, Steckdosen auffällig werden oder einzelne Anschlüsse plötzlich ausfallen, arbeiten wir strukturiert und nachvollziehbar. Wir sagen dir klar, was sofort gelöst werden kann und wo weitere Arbeiten sinnvoll sind.",
    image: asset("images/elektrik/elektriker2.jpg"),
  },
];

const carouselSlides = [
  {
    image: asset("images/elektrik/elektriker3.png"),
    alt: "Elektriker Notdienst Einblick 1",
  },
  {
    image: asset("images/elektrik/elektriker4.png"),
    alt: "Elektriker Notdienst Einblick 2",
  },
  {
    image: asset("images/elektrik/elektriker5.png"),
    alt: "Elektriker Notdienst Einblick 3",
  },
  {
    image: asset("images/elektrik/elektriker6.png"),
    alt: "Elektriker Notdienst Einblick 4",
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

const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde";

const mapsLinkUrl =
  "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal";

export function ElektrikPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--elektrik-spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--elektrik-spot-y", `${y}%`);
    event.currentTarget.style.setProperty("--elektrik-spot-opacity", "1");
  };

  const handleHeroPointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--elektrik-spot-x", "50%");
    event.currentTarget.style.setProperty("--elektrik-spot-y", "38%");
    event.currentTarget.style.setProperty("--elektrik-spot-opacity", "0");
  };

  const handleSliderPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX;
    dragPointerIdRef.current = event.pointerId;
    setIsDraggingSlider(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSliderPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      dragStartXRef.current === null ||
      dragPointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    setDragOffset(event.clientX - dragStartXRef.current);
  };

  const handleSliderPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      dragStartXRef.current === null ||
      dragPointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const threshold = 48;
    const nextOffset = event.clientX - dragStartXRef.current;

    if (nextOffset <= -threshold && activeSlide < carouselSlides.length - 1) {
      setActiveSlide((current) => current + 1);
    } else if (nextOffset >= threshold && activeSlide > 0) {
      setActiveSlide((current) => current - 1);
    }

    dragStartXRef.current = null;
    dragPointerIdRef.current = null;
    setDragOffset(0);
    setIsDraggingSlider(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="elektrik-page" id="start">
      <header className="elektrik-topbar">
        <div className="site-shell elektrik-topbar__inner">
          <a className="elektrik-brand" href="#start">
            Notfall Elektriker Wuppertal
          </a>

          <div className="elektrik-topbar__actions">
            <nav className="elektrik-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#einsaetze">Einsätze</a>
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

            <a className="elektrik-call" href="tel:+4920212345680">
              0202 123 45 680
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          className="elektrik-hero"
          onPointerEnter={handleHeroPointerMove}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className="site-shell elektrik-hero__layout">
            <div className="elektrik-hero__copy">
              <p className="section-eyebrow">24/7 Elektriker-Notdienst in Wuppertal</p>
              <h1>Stromausfall oder Defekt? Wir helfen sofort.</h1>
              <p className="elektrik-hero__lead">
                Ob Sicherung, FI oder plötzlicher Ausfall: Wir kommen schnell,
                prüfen sauber und bringen die Elektrik wieder in Ordnung.
              </p>

              <div className="elektrik-hero__actions">
                <a className="elektrik-button elektrik-button--primary" href="tel:+4920212345680">
                  Jetzt anrufen
                </a>
                <a className="elektrik-button elektrik-button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>

          </div>
        </section>

        <section id="leistungen" className="elektrik-section elektrik-section--surface">
          <div className="site-shell">
            <div className="elektrik-intro">
              <p className="section-eyebrow">Leistungen</p>
              <h2>Schnelle Hilfe bei Stromausfall, FI-Fehlern und defekten Anschlüssen.</h2>
              <p>
                Ob in einzelnen Räumen plötzlich der Strom ausfällt, der FI
                wiederholt auslöst oder eine Steckdose auffällig wird: Wir
                verschaffen dir schnell einen klaren Überblick und prüfen die
                Lage direkt vor Ort.
              </p>
              <p>
                Wir arbeiten strukturiert an Stromkreisen, Sicherungen,
                Steckdosen, Schaltern und typischen Fehlerquellen im Haus oder
                in der Wohnung. Ziel ist immer, die Störung sauber einzugrenzen
                und eine nachvollziehbare Lösung zu schaffen.
              </p>
              <p>
                Wenn eine direkte Reparatur möglich ist, setzen wir sie vor Ort
                um. Wenn weitere Arbeiten nötig sind, sagen wir dir offen, was
                jetzt sinnvoll ist und was nicht.
              </p>
            </div>
          </div>
        </section>

        <section id="einsaetze" className="elektrik-section elektrik-section--gallery">
          <div className="site-shell">
            <div className="section-heading">
              <p className="eyebrow">Referenzen</p>
              <h2 className="section-heading__title--nowrap">
                Typische Einsätze aus unserem Alltag.
              </h2>
            </div>

            <div className="gallery__stack">
              {serviceCards.map((card, index) => (
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

        <section id="preise" className="elektrik-section elektrik-section--pricing">
          <div className="site-shell elektrik-pricing">
            <div className="elektrik-pricing__table">
              <p className="section-eyebrow">Preise</p>
              <h2>Verständliche Preisfenster für Notfälle.</h2>

              <div className="elektrik-price-table">
                <div className="elektrik-price-table__head">
                  <span>Zeitfenster</span>
                  <span>Störung prüfen</span>
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
              <p className="section-eyebrow">Einblicke</p>
              <h2>Einblicke in typische Elektriker-Einsätze.</h2>

              <div className="elektrik-carousel">
                <div
                  className={`elektrik-carousel__viewport ${isDraggingSlider ? "elektrik-carousel__viewport--dragging" : ""}`}
                  onPointerDown={handleSliderPointerDown}
                  onPointerMove={handleSliderPointerMove}
                  onPointerUp={handleSliderPointerEnd}
                  onPointerCancel={handleSliderPointerEnd}
                >
                  <div
                    className="elektrik-carousel__track"
                    style={{
                      transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
                    }}
                  >
                    {carouselSlides.map((slide) => (
                      <div className="elektrik-carousel__slide" key={slide.image}>
                        <img src={slide.image} alt={slide.alt} draggable={false} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="elektrik-carousel__dots" aria-label="Einblicke auswählen">
                  {carouselSlides.map((slide, index) => (
                    <button
                      key={`${slide.image}-dot`}
                      type="button"
                      className={`elektrik-carousel__dot ${activeSlide === index ? "elektrik-carousel__dot--active" : ""}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Bild ${index + 1} anzeigen`}
                      aria-pressed={activeSlide === index}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="kontakt" className="elektrik-section elektrik-section--contact">
          <div className="site-shell elektrik-contact">
            <div className="elektrik-contact__copy">
              <p className="section-eyebrow">Kontakt</p>
              <h2>Bei Stromproblemen zählt eine sichere Lösung.</h2>
              <p>
                Ruf uns an, beschreibe kurz die Störung und wir ordnen ein, was
                sofort notwendig ist. Danach planen wir den Einsatz so, dass du
                schnell wieder Sicherheit hast.
              </p>

              <div className="elektrik-contact__actions">
                <a className="elektrik-button elektrik-button--primary" href="tel:+4920212345680">
                  0202 123 45 680
                </a>
                <a className="elektrik-button elektrik-button--secondary" href={withBase()}>
                  Zur Landingpage
                </a>
              </div>
            </div>

            <article className="elektrik-map-card">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                className="elektrik-map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Elektriker Notdienst"
              />
              <div className="elektrik-map-linkbar">
                <a
                  className="elektrik-button elektrik-button--secondary"
                  href={mapsLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps öffnen
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="elektrik-footer">
        <div className="site-shell business-footer__grid">
          <div className="business-footer__column">
            <strong>Notfall Elektriker Wuppertal</strong>
            <p>Varresbecker Str. 193</p>
            <p>42115 Wuppertal</p>
            <a href="tel:+4920212345680">0202 123 45 680</a>
            <a href="mailto:Notdienst@example.de">Notdienst@example.de</a>
          </div>
          <div className="business-footer__column">
            <strong>Links</strong>
            <a href="#leistungen">Leistung</a>
            <a href="#kontakt">Angebot einholen</a>
          </div>
          <div className="business-footer__column">
            <strong>Folge uns auf</strong>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="business-footer__column">
            <strong>Rechtliches</strong>
            <a href="#start">Impressum</a>
            <a href="#start">Datenschutzerklärung</a>
            <a href="#start">AGB</a>
          </div>
        </div>
        <div className="site-shell elektrik-footer__meta">
          <div>
            <strong>Notfall Elektriker Wuppertal</strong>
            <p>Varresbecker Str. 193, 42115 Wuppertal</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Elektriker-Notdienst, Stromausfall, Sicherungskasten, FI- und Störungsprüfung</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 0202 123 45 680 | Notdienst@example.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
