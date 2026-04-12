import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { asset, withBase } from "@/lib/site";
import { useTheme } from "@/lib/theme";

const services = [
  {
    title: "24h erreichbar",
    text: "Wenn es schnell gehen muss, sind wir tagsüber, abends und im Notfall direkt erreichbar und kurzfristig im Einsatz.",
    image: asset("images/rohr/notdienst2.png"),
    alt: "Sanitär Notdienst Fahrzeug",
  },
  {
    title: "Küche und Ablauf",
    text: "Verstopfte Spüle, Bodenablauf oder hartnäckige Ablagerungen behandeln wir sauber und ohne unnötige Umwege.",
    image: asset("images/rohr/notdienst3.png"),
    alt: "Sanitär Arbeit an einer Küche",
  },
  {
    title: "Bad und Sanitär",
    text: "Ob Bad, WC oder Sanitärbereich: Wir ordnen die Störung schnell ein und setzen direkt an der Ursache an.",
    image: asset("images/rohr/notdienst4.png"),
    alt: "Sanitär Notdienst im Bad",
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

const carouselSlides = [
  {
    image: asset("images/rohr/notdienst1.png"),
    alt: "Sanitär Notdienst Einblick 1",
  },
  {
    image: asset("images/rohr/notdienst5.png"),
    alt: "Sanitär Notdienst Einblick 2",
  },
  {
    image: asset("images/rohr/notdienst6.png"),
    alt: "Sanitär Notdienst Einblick 3",
  },
  {
    image: asset("images/rohr/notdienst7.png"),
    alt: "Sanitär Notdienst Einblick 4",
  },
];

const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.14880073439!2d7.101293577003866!3d51.2531695717566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d6e0b7a63ed9%3A0x8aea528dc914d126!2sVarresbecker%20Str.%20193%2C%2042115%20Wuppertal!5e0!3m2!1sde!2sde!4v1773623012764!5m2!1sde!2sde";

const mapsLinkUrl =
  "https://www.google.com/maps/search/?api=1&query=Varresbecker+Str.+193,+42115+Wuppertal";

export function RohrPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const forcedLightRef = useRef(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!forcedLightRef.current && theme === "dark") {
      forcedLightRef.current = true;
      toggleTheme();
    }
  }, [theme, toggleTheme]);

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
    <div className="rohr-page" id="start">
      <header className="rohr-topbar">
        <div className="site-shell rohr-topbar__inner">
          <a className="rohr-brand" href="#start">
            Sanitär Notdienst Wuppertal
          </a>

          <div className="rohr-topbar__actions">
            <nav className="rohr-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
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

            <a className="rohr-call" href="tel:+4920212345679">
              0202 123 45 679
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="rohr-hero">
          <div className="site-shell rohr-hero__layout">
            <div className="rohr-hero__copy">
              <p className="section-eyebrow">24/7 Sanitär Notdienst in Wuppertal</p>
              <h1>Sanitär Notdienst. Sofort da.</h1>
              <p className="rohr-hero__lead">
                Verstopfung, Rückstau oder akute Sanitär-Störung? Wir kommen
                schnell vorbei und lösen das Problem sauber.
              </p>

              <div className="rohr-hero__actions">
                <a className="rohr-button rohr-button--primary" href="tel:+4920212345679">
                  Jetzt anrufen
                </a>
                <a className="rohr-button rohr-button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="rohr-section rohr-section--surface">
          <div className="site-shell rohr-story">
            <div className="rohr-story__intro">
              <p className="section-eyebrow">Leistungen</p>
              <h2>Schnelle Hilfe in Bad, Küche und Leitung.</h2>
            </div>

            <div className="rohr-service-grid">
              {services.map((item) => (
                <article className="rohr-service-photo-card" key={item.title}>
                  <img src={item.image} alt={item.alt} />
                  <div className="rohr-service-photo-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="preise" className="rohr-section rohr-section--pricing">
          <div className="site-shell rohr-pricing">
            <div>
              <p className="section-eyebrow">Preise</p>
              <h2>Wir stehen zu unserem Wort: Verlässlichkeit beginnt beim Preis</h2>

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
              <p className="section-eyebrow">Einblicke</p>

              <div className="rohr-carousel">
                <div
                  className={`rohr-carousel__viewport ${isDraggingSlider ? "rohr-carousel__viewport--dragging" : ""}`}
                  onPointerDown={handleSliderPointerDown}
                  onPointerMove={handleSliderPointerMove}
                  onPointerUp={handleSliderPointerEnd}
                  onPointerCancel={handleSliderPointerEnd}
                >
                  <div
                    className="rohr-carousel__track"
                    style={{
                      transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
                    }}
                  >
                    {carouselSlides.map((slide) => (
                      <div className="rohr-carousel__slide" key={slide.image}>
                        <img src={slide.image} alt={slide.alt} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rohr-carousel__dots" aria-label="Einblicke auswählen">
                  {carouselSlides.map((slide, index) => (
                    <button
                      key={`${slide.image}-dot`}
                      type="button"
                      className={`rohr-carousel__dot ${activeSlide === index ? "rohr-carousel__dot--active" : ""}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Bild ${index + 1} anzeigen`}
                      aria-pressed={activeSlide === index}
                    />
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
              <h2>Ruf an, wir kümmern uns um den Rest.</h2>
              <p>
                Du schilderst kurz die Störung, wir ordnen den Einsatz ein und
                machen uns direkt auf den Weg.
              </p>

              <div className="rohr-hero__actions">
                <a className="rohr-button rohr-button--primary" href="tel:+4920212345679">
                  0202 123 45 679
                </a>
                <a className="rohr-button rohr-button--secondary" href={withBase()}>
                  Zur Landingpage
                </a>
              </div>
            </div>

            <article className="rohr-map-card">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                className="rohr-map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Sanitär Notdienst"
              />
              <div className="rohr-map-linkbar">
                <a
                  className="rohr-button rohr-button--secondary"
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

      <footer className="rohr-footer">
        <div className="site-shell business-footer__grid">
          <div className="business-footer__column">
            <strong>Sanitär Notdienst Wuppertal</strong>
            <p>Varresbecker Str. 193</p>
            <p>42115 Wuppertal</p>
            <a href="tel:+4920212345679">0202 123 45 679</a>
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
        <div className="site-shell rohr-footer__meta">
          <div>
            <strong>Sanitär Notdienst Wuppertal</strong>
            <p>Varresbecker Str. 193, 42115 Wuppertal</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Sanitär Notdienst, Abflussreinigung, WC-Verstopfung, Rückstau-Notdienst</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 0202 123 45 679 | Notdienst@example.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
