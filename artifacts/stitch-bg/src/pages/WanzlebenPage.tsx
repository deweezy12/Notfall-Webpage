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

const company = mockCompanies.wanzleben;

const services = [
  {
    title: "Rohrbruch Notdienst",
    text: "Ein Rohrbruch kann innerhalb kurzer Zeit große Schäden verursachen. Wir sind schnell vor Ort und stoppen das Problem, bevor es sich ausweitet.",
    image: asset("images/rohr/notdienst2.png"),
    alt: "Rohrbruch Notdienst",
  },
  {
    title: "Hilfe bei Wasserschäden",
    text: "Ob austretendes Wasser, feuchte Wände oder akute Überschwemmung – wir finden die Ursache und beheben den Schaden fachgerecht.",
    image: asset("images/rohr/notdienst3.png"),
    alt: "Hilfe bei Wasserschäden",
  },
  {
    title: "Kein Warmwasser",
    text: "Wenn plötzlich kein warmes Wasser mehr verfügbar ist, prüfen wir die Anlage und sorgen für eine schnelle Wiederherstellung.",
    image: asset("images/rohr/notdienst4.png"),
    alt: "Warmwasser Reparatur",
  },
  {
    title: "Verstopfte Abflüsse und Toiletten",
    text: "Wir beseitigen Verstopfungen schnell und sauber – ohne unnötige Wartezeiten.",
    image: asset("images/rohr/notdienst1.png"),
    alt: "Abflussreinigung",
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

const reviews = [
  {
    id: "1",
    author: "Thomas Weber",
    rating: 5,
    text: "Sehr schneller und zuverlässiger Service! Herr Schulze war innerhalb einer Stunde da und hat das Problem professionell gelöst. Absolut empfehlenswert!",
    date: "vor 2 Wochen",
  },
  {
    id: "2",
    author: "Petra Schmidt",
    rating: 5,
    text: "Super freundlich und kompetent. Die Verstopfung wurde schnell behoben und der Preis war fair. Jederzeit wieder!",
    date: "vor 1 Monat",
  },
  {
    id: "3",
    author: "Michael Becker",
    rating: 5,
    text: "Notfall am Wochenende - trotzdem war jemand innerhalb von 2 Stunden da. Saubere Arbeit, transparente Kosten. Danke!",
    date: "vor 3 Wochen",
  },
  {
    id: "4",
    author: "Sabine Müller",
    rating: 5,
    text: "Sehr zuverlässig und pünktlich. Das Team hat unseren Rohrbruch schnell repariert und alles sauber hinterlassen.",
    date: "vor 2 Monaten",
  },
  {
    id: "5",
    author: "Andreas Klein",
    rating: 5,
    text: "Faire Preise, schnelle Reaktion und professionelle Ausführung. Man merkt die Erfahrung. Sehr zu empfehlen!",
    date: "vor 1 Monat",
  },
  {
    id: "6",
    author: "Julia Wagner",
    rating: 5,
    text: "Hatte einen Wasserschaden und war in Panik. Herr Schulze kam sofort und hat alles schnell und sauber repariert. Top Service!",
    date: "vor 3 Monaten",
  },
  {
    id: "7",
    author: "Markus Fischer",
    rating: 5,
    text: "Kompetente Beratung und schnelle Hilfe. Der Sanitär-Notdienst hat meine Erwartungen übertroffen. Klare Empfehlung!",
    date: "vor 2 Wochen",
  },
  {
    id: "8",
    author: "Claudia Hoffmann",
    rating: 5,
    text: "Sehr freundlicher Service und faire Preisgestaltung. Die Arbeit wurde schnell und professionell erledigt.",
    date: "vor 1 Monat",
  },
  {
    id: "9",
    author: "Stefan Richter",
    rating: 5,
    text: "Bester Sanitär-Notdienst in der Region! Schnell, zuverlässig und zu fairen Preisen. Kann ich nur weiterempfehlen.",
    date: "vor 4 Wochen",
  },
  {
    id: "10",
    author: "Anna Schneider",
    rating: 5,
    text: "Professionelle und schnelle Hilfe bei verstopftem Abfluss. Sehr nettes Team und transparente Abrechnung. Danke!",
    date: "vor 3 Wochen",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="rohr-review-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function WanzlebenPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [activeReviewSlide, setActiveReviewSlide] = useState(0);
  const [reviewDragOffset, setReviewDragOffset] = useState(0);
  const [isDraggingReviews, setIsDraggingReviews] = useState(false);
  const forcedLightRef = useRef(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const reviewDragStartXRef = useRef<number | null>(null);
  const reviewDragPointerIdRef = useRef<number | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!forcedLightRef.current && theme === "dark") {
      forcedLightRef.current = true;
      toggleTheme();
    }
  }, [theme, toggleTheme]);

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    const startAutoplay = () => {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveReviewSlide((current) =>
          current >= reviews.length - 1 ? 0 : current + 1,
        );
      }, 5000);
    };

    startAutoplay();

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, []);

  const pauseAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  const resumeAutoplay = () => {
    if (!autoplayIntervalRef.current) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveReviewSlide((current) =>
          current >= reviews.length - 1 ? 0 : current + 1,
        );
      }, 5000);
    }
  };

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

  // Review carousel handlers
  const handleReviewPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    pauseAutoplay();
    reviewDragStartXRef.current = event.clientX;
    reviewDragPointerIdRef.current = event.pointerId;
    setIsDraggingReviews(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleReviewPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      reviewDragStartXRef.current === null ||
      reviewDragPointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    setReviewDragOffset(event.clientX - reviewDragStartXRef.current);
  };

  const handleReviewPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      reviewDragStartXRef.current === null ||
      reviewDragPointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const threshold = 48;
    const nextOffset = event.clientX - reviewDragStartXRef.current;

    if (nextOffset <= -threshold && activeReviewSlide < reviews.length - 1) {
      setActiveReviewSlide((current) => current + 1);
    } else if (nextOffset >= threshold && activeReviewSlide > 0) {
      setActiveReviewSlide((current) => current - 1);
    }

    reviewDragStartXRef.current = null;
    reviewDragPointerIdRef.current = null;
    setReviewDragOffset(0);
    setIsDraggingReviews(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    resumeAutoplay();
  };

  // Keyboard navigation for carousel
  const handleCarouselKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveSlide((current) =>
        current > 0 ? current - 1 : carouselSlides.length - 1,
      );
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveSlide((current) =>
        current < carouselSlides.length - 1 ? current + 1 : 0,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveSlide(carouselSlides.length - 1);
    }
  };

  // Keyboard navigation for reviews
  const handleReviewsKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      pauseAutoplay();
      setActiveReviewSlide((current) =>
        current > 0 ? current - 1 : reviews.length - 1,
      );
      setTimeout(resumeAutoplay, 100);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      pauseAutoplay();
      setActiveReviewSlide((current) =>
        current < reviews.length - 1 ? current + 1 : 0,
      );
      setTimeout(resumeAutoplay, 100);
    } else if (event.key === "Home") {
      event.preventDefault();
      pauseAutoplay();
      setActiveReviewSlide(0);
      setTimeout(resumeAutoplay, 100);
    } else if (event.key === "End") {
      event.preventDefault();
      pauseAutoplay();
      setActiveReviewSlide(reviews.length - 1);
      setTimeout(resumeAutoplay, 100);
    }
  };

  return (
    <div className="rohr-page" id="start">
      <StructuredData service="wanzleben" />
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <header className="rohr-topbar">
        <div className="site-shell rohr-topbar__inner">
          <a className="rohr-brand" href="#start">
            {company.name}
          </a>

          <div className="rohr-topbar__actions">
            <nav className="rohr-nav" aria-label="Seitenbereiche">
              <a href="#ueber-uns">Über uns</a>
              <a href="#leistungen">Leistungen</a>
              <a href="#preise">Preise</a>
              <a href="#bewertungen">Bewertungen</a>
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

            <a className="rohr-call" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="rohr-hero">
          <div className="site-shell rohr-hero__layout">
            <div className="rohr-hero__copy">
              <p className="section-eyebrow">
                24h Sanitär Notdienst – schnell vor Ort und zuverlässig gelöst
              </p>
              <h1>Rohrbruch oder Wasserschaden in Wanzleben-Börde?</h1>
              <p className="rohr-hero__lead">
                Schnelle Hilfe bei Rohrbruch, verstopften Leitungen,
                Wasserschäden und Ausfällen der Warmwasserversorgung.
              </p>

              <div className="rohr-hero__actions">
                <a
                  className="rohr-button rohr-button--primary"
                  href={`tel:${company.phone}`}
                >
                  Jetzt anrufen
                </a>
                <a
                  className="rohr-button rohr-button--secondary"
                  href="#kontakt"
                >
                  Schnelle Hilfe anfordern
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="ueber-uns" className="rohr-section">
          <div className="site-shell rohr-story">
            <div className="rohr-story__intro">
              <p className="section-eyebrow">Über uns</p>
              <h2>Sanitär Notdienst in Wanzleben-Börde</h2>
            </div>

            <div className="rohr-editorial__copy">
              <p>
                Wir bieten schnelle und zuverlässige Hilfe bei allen akuten
                Sanitärproblemen – direkt bei Ihnen vor Ort. Sie schildern uns
                kurz das Problem telefonisch, wir kommen schnell zu Ihnen nach
                Wanzleben-Börde und führen Diagnose und direkte Lösung vor Ort
                durch.
              </p>
              <p>
                Unsere Stärken liegen in{" "}
                <span className="highlight">kurzen Reaktionszeiten</span> – wir
                sind schnell zur Stelle, wenn Sie uns brauchen. Unsere Techniker
                verfügen über langjährige Erfahrung mit typischen Notfällen und
                wissen genau, wie die häufigsten Probleme schnell und
                fachgerecht gelöst werden. Dabei legen wir großen Wert auf{" "}
                <span className="highlight">transparente Abläufe</span>, so dass
                Sie jederzeit wissen, was gemacht wird und warum. Zuverlässige
                und saubere Arbeit ist für uns selbstverständlich – wir arbeiten
                professionell und hinterlassen Ihren Arbeitsbereich ordentlich.
              </p>
              <p>
                Wir sind in Wanzleben-Börde sowie in den umliegenden Orten
                schnell für Sie im Einsatz und stehen Ihnen bei Rohrbruch,
                Wasserschäden, verstopften Leitungen und Ausfällen der
                Warmwasserversorgung zur Seite. Bei uns erhalten Sie vor Beginn
                der Arbeiten eine{" "}
                <span className="highlight">klare Kosteneinschätzung</span> –
                faire Preise und nachvollziehbare Leistungen stehen bei uns im
                Fokus.
              </p>
            </div>
          </div>
        </section>

        <section id="leistungen" className="rohr-section rohr-section--surface">
          <div className="site-shell rohr-story">
            <div className="rohr-story__intro">
              <p className="section-eyebrow">Leistungen</p>
              <h2>Schnelle Hilfe bei akuten Sanitärproblemen</h2>
            </div>

            <div className="rohr-service-grid rohr-service-grid--four">
              {services.map((item) => (
                <article className="rohr-service-photo-card" key={item.title}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
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
              <h2>Transparente Preise ohne Überraschungen</h2>
              <p className="rohr-pricing__intro">
                Sie erhalten vor Beginn der Arbeiten eine klare Einschätzung der
                Kosten. Faire Preise und nachvollziehbare Leistungen stehen bei
                uns im Fokus.
              </p>

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
                {/* ARIA Live Region for screen readers */}
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  Bild {activeSlide + 1} von {carouselSlides.length}
                </div>

                <div
                  className={`rohr-carousel__viewport ${isDraggingSlider ? "rohr-carousel__viewport--dragging" : ""}`}
                  onPointerDown={handleSliderPointerDown}
                  onPointerMove={handleSliderPointerMove}
                  onPointerUp={handleSliderPointerEnd}
                  onPointerCancel={handleSliderPointerEnd}
                  onKeyDown={handleCarouselKeyDown}
                  role="region"
                  aria-label="Bildergalerie Sanitär-Einsätze"
                  tabIndex={0}
                >
                  <div
                    className="rohr-carousel__track"
                    style={{
                      transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
                    }}
                  >
                    {carouselSlides.map((slide) => (
                      <div className="rohr-carousel__slide" key={slide.image}>
                        <img src={slide.image} alt={slide.alt} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rohr-carousel__dots"
                  aria-label="Einblicke auswählen"
                >
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
              <h2>Jetzt Sanitär Notdienst kontaktieren</h2>
              <p>
                Bei Rohrbruch, Wasserschaden oder akuten Problemen – rufen Sie
                uns direkt an. Wir sind schnell vor Ort und helfen zuverlässig
                weiter.
              </p>

              <div className="rohr-hero__actions">
                <a
                  className="rohr-button rohr-button--primary"
                  href={`tel:${company.phone}`}
                >
                  {company.phoneDisplay}
                </a>
                <a
                  className="rohr-button rohr-button--secondary"
                  href={withBase()}
                >
                  Zur Landingpage
                </a>
              </div>
            </div>

            <article className="rohr-map-card">
              <iframe
                src={company.mapsEmbedUrl}
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
                  href={company.mapsLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps öffnen
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="bewertungen" className="rohr-section">
          <div className="site-shell">
            <div className="rohr-story__intro">
              <p className="section-eyebrow">Bewertungen</p>
              <h2>Was unsere Kunden sagen</h2>
            </div>

            <div className="rohr-reviews-carousel">
              {/* ARIA Live Region for screen readers */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Bewertung {activeReviewSlide + 1} von {reviews.length}
              </div>

              <div
                className={`rohr-reviews-carousel__viewport ${isDraggingReviews ? "rohr-reviews-carousel__viewport--dragging" : ""}`}
                onPointerDown={handleReviewPointerDown}
                onPointerMove={handleReviewPointerMove}
                onPointerUp={handleReviewPointerEnd}
                onPointerCancel={handleReviewPointerEnd}
                onKeyDown={handleReviewsKeyDown}
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
                role="region"
                aria-label="Kundenbewertungen"
                tabIndex={0}
              >
                <div
                  className="rohr-reviews-carousel__track"
                  style={{
                    transform: `translateX(calc(-${activeReviewSlide * 33.333}% - ${activeReviewSlide * 16}px + ${reviewDragOffset}px))`,
                  }}
                >
                  {reviews.map((review) => (
                    <article className="rohr-review-card" key={review.id}>
                      <StarRating rating={review.rating} />
                      <p className="rohr-review-text">{review.text}</p>
                      <div className="rohr-review-meta">
                        <p className="rohr-review-author">— {review.author}</p>
                        <p className="rohr-review-date">{review.date}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div
                className="rohr-carousel__dots"
                aria-label="Bewertungen auswählen"
              >
                {reviews.map((review, index) => (
                  <button
                    key={`${review.id}-dot`}
                    type="button"
                    className={`rohr-carousel__dot ${activeReviewSlide === index ? "rohr-carousel__dot--active" : ""}`}
                    onClick={() => {
                      pauseAutoplay();
                      setActiveReviewSlide(index);
                      setTimeout(resumeAutoplay, 100);
                    }}
                    aria-label={`Bewertung ${index + 1} anzeigen`}
                    aria-pressed={activeReviewSlide === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="rohr-footer">
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
            <a href="#ueber-uns">Über uns</a>
            <a href="#leistungen">Leistungen</a>
            <a href="#kontakt">Kontakt</a>
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
        <div className="site-shell rohr-footer__meta">
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
