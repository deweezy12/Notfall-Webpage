import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { asset, withBase } from "@/lib/site";
import { useTheme } from "@/lib/theme";
import { mockCompanies } from "@/lib/mock-data";
import { StructuredData } from "@/components/StructuredData";

const company = mockCompanies.schluessel;

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
    image: asset("images/1.jpg"),
    title: "Zugefallene Tür schnell geöffnet",
    text: "Wenn deine Tür nur zugefallen ist, öffnen wir sie in der Regel schnell und möglichst ohne Schäden. So kommst du zügig wieder in deine Wohnung oder dein Haus.",
  },
  {
    image: asset("images/2.jpg"),
    title: "Auch bei abgeschlossener Tür vor Ort",
    text: "Ist die Tür abgeschlossen oder der Zylinder defekt, arbeiten wir mit Erfahrung und dem passenden Werkzeug. Wir prüfen die Situation vor Ort und sagen dir klar, was möglich ist.",
  },
];

const slides = [
  asset("images/a.jpg"),
  asset("images/b.png"),
  asset("images/c.png"),
  asset("images/d.png"),
  asset("images/e.png"),
  asset("images/f.png"),
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

export function SchluesselPage() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  const handleSliderPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    dragStartXRef.current = event.clientX;
    dragPointerIdRef.current = event.pointerId;
    setIsDraggingSlider(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSliderPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
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

    if (nextOffset <= -threshold && activeSlide < slides.length - 1) {
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

  // Keyboard navigation for carousel
  const handleCarouselKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveSlide((current) =>
        current > 0 ? current - 1 : slides.length - 1,
      );
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveSlide((current) =>
        current < slides.length - 1 ? current + 1 : 0,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveSlide(slides.length - 1);
    }
  };

  return (
    <>
      <StructuredData service="schluessel" />
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <header className={`top-bar ${isScrolled ? "top-bar--scrolled" : ""}`}>
        <div className="top-bar__inner">
          <a className="brand" href="#start">
            {company.name}
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
              className={`theme-toggle theme-toggle--${theme}`}
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={
                isDark
                  ? "Zum hellen Modus wechseln"
                  : "Zum dunklen Modus wechseln"
              }
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              <span className="theme-toggle__label">D</span>
              <span className="theme-toggle__label">L</span>
              <span className="theme-toggle__thumb" />
            </button>
            <a className="call-pill" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <main id="start">
        <section className="hero">
          <div className="section-shell hero__layout">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--dark">
                24/7 Schlüsseldienst in Wuppertal
              </p>
              <h1>Schnelle Türöffnung. Wir helfen sofort.</h1>
              <p className="hero__lead">
                Ob zugefallene Tür, abgeschlossene Tür oder defektes Schloss:
                Wir sind schnell vor Ort, nennen dir den Preisrahmen vorab und
                sorgen dafür, dass du wieder reinkommst.
              </p>

              <div className="hero__actions">
                <a
                  className="button button--primary"
                  href={`tel:${company.phone}`}
                >
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
                <strong>Schloss- und Zylinderwechsel</strong>, wenn ein
                Austausch nötig ist oder du dir wieder ein sicheres Gefühl
                verschaffen willst.
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
                  {/* ARIA Live Region for screen readers */}
                  <div
                    className="sr-only"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    Bild {activeSlide + 1} von {slides.length}
                  </div>

                  <div
                    className={`slider__viewport ${isDraggingSlider ? "slider__viewport--dragging" : ""}`}
                    onPointerDown={handleSliderPointerDown}
                    onPointerMove={handleSliderPointerMove}
                    onPointerUp={handleSliderPointerEnd}
                    onPointerCancel={handleSliderPointerEnd}
                    onKeyDown={handleCarouselKeyDown}
                    role="region"
                    aria-label="Bildergalerie Schlüsseldienst-Einsätze"
                    tabIndex={0}
                  >
                    <div
                      className="slider__track"
                      style={{
                        transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
                      }}
                    >
                      {slides.map((slide, index) => (
                        <div className="slide" key={slide}>
                          <img
                            src={slide}
                            alt={`Werkzeug und Einsatzbild ${index + 1}`}
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="slider__dots"
                    aria-label="Einblicke auswählen"
                  >
                    {slides.map((slide, index) => (
                      <button
                        key={`${slide}-dot`}
                        type="button"
                        className={`slider__dot ${activeSlide === index ? "slider__dot--active" : ""}`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Bild ${index + 1} anzeigen`}
                        aria-pressed={activeSlide === index}
                      />
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
                <a
                  className="button button--primary"
                  href={`tel:${company.phone}`}
                >
                  {company.phoneDisplay}
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
        <div className="section-shell business-footer__grid">
          <div className="business-footer__column">
            <strong>{company.name}</strong>
            <p>{company.street}</p>
            <p>{company.city}</p>
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="business-footer__column">
            <strong>Links</strong>
            <a href="#leistungen">Leistung</a>
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
        <div className="section-shell footer__meta">
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
    </>
  );
}
