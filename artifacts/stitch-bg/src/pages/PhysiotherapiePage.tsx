import { useTheme } from "@/lib/theme";
import { mockCompanies } from "@/lib/mock-data";
import { StructuredData } from "@/components/StructuredData";
import { asset } from "@/lib/site";
import { useState, useEffect, useRef, type PointerEvent } from "react";

const company = mockCompanies.physiotherapie;

// Therapy services and pricing
const services = [
  {
    category: "Krankengymnastik",
    items: [
      {
        name: "Klassische Krankengymnastik",
        duration: "20 min",
        price: "Rezept",
      },
      {
        name: "Krankengymnastik am Gerät (KGG)",
        duration: "30 min",
        price: "Rezept",
      },
      {
        name: "Atemtherapie",
        duration: "20 min",
        price: "Rezept",
      },
    ],
  },
  {
    category: "Manuelle Therapie",
    items: [
      {
        name: "Manuelle Therapie",
        duration: "20-30 min",
        price: "Rezept",
      },
      {
        name: "Manuelle Lymphdrainage 30 min",
        duration: "30 min",
        price: "Rezept",
      },
      {
        name: "Manuelle Lymphdrainage 45 min",
        duration: "45 min",
        price: "Rezept",
      },
      {
        name: "Manuelle Lymphdrainage 60 min",
        duration: "60 min",
        price: "Rezept",
      },
    ],
  },
  {
    category: "Sportphysiotherapie",
    items: [
      {
        name: "Sportphysiotherapie",
        duration: "30 min",
        price: "ab 45 EUR",
      },
      {
        name: "Kinesio-Taping",
        duration: "15 min",
        price: "ab 15 EUR",
      },
      {
        name: "Trainingsberatung",
        duration: "45 min",
        price: "ab 60 EUR",
      },
    ],
  },
  {
    category: "Massage & Wellness",
    items: [
      {
        name: "Klassische Massage (Teilkörper)",
        duration: "20 min",
        price: "Rezept / ab 30 EUR",
      },
      {
        name: "Klassische Massage (Ganzkörper)",
        duration: "45 min",
        price: "ab 55 EUR",
      },
      {
        name: "Hot Stone Massage",
        duration: "60 min",
        price: "ab 75 EUR",
      },
      {
        name: "Fußreflexzonenmassage",
        duration: "30 min",
        price: "ab 35 EUR",
      },
    ],
  },
  {
    category: "Weitere Therapien",
    items: [
      {
        name: "Elektrotherapie",
        duration: "15 min",
        price: "Rezept",
      },
      {
        name: "Wärme-/Kältetherapie",
        duration: "15 min",
        price: "Rezept / ab 10 EUR",
      },
      {
        name: "Ultraschalltherapie",
        duration: "10 min",
        price: "Rezept",
      },
    ],
  },
];

// Opening hours
const openingHours = [
  { day: "Montag - Donnerstag", hours: "08:00 - 19:00 Uhr" },
  { day: "Freitag", hours: "08:00 - 17:00 Uhr" },
  { day: "Samstag", hours: "Nach Vereinbarung" },
  { day: "Sonntag", hours: "Geschlossen" },
];

// Gallery items - therapy and practice images
const galleryItems = [
  {
    id: 1,
    label: "Behandlungsraum",
    image: asset("images/physiotherapie/treatment-room.jpg"),
  },
  {
    id: 2,
    label: "Manuelle Therapie",
    image: asset("images/physiotherapie/manual-therapy.jpg"),
  },
  {
    id: 3,
    label: "Trainingsbereich",
    image: asset("images/physiotherapie/gym-area.jpg"),
  },
  {
    id: 4,
    label: "Massage",
    image: asset("images/physiotherapie/massage.jpg"),
  },
  {
    id: 5,
    label: "Gerätetraining",
    image: asset("images/physiotherapie/equipment.jpg"),
  },
  {
    id: 6,
    label: "Empfang",
    image: asset("images/physiotherapie/reception.jpg"),
  },
];

// Patient reviews
const reviews = [
  {
    id: "1",
    author: "Michael K.",
    rating: 5,
    text: "Hervorragende Behandlung! Nach nur wenigen Sitzungen waren meine Rückenschmerzen deutlich besser. Das Team ist sehr kompetent und einfühlsam.",
    date: "vor 1 Woche",
  },
  {
    id: "2",
    author: "Anna S.",
    rating: 5,
    text: "Sehr professionelle Praxis mit modernen Geräten. Die Therapeuten nehmen sich Zeit und gehen individuell auf die Beschwerden ein. Absolute Empfehlung!",
    date: "vor 2 Wochen",
  },
  {
    id: "3",
    author: "Thomas B.",
    rating: 5,
    text: "Nach meiner Sportverletzung wurde ich hier perfekt behandelt. Die Kombination aus manueller Therapie und Trainingstherapie hat mir sehr geholfen.",
    date: "vor 3 Wochen",
  },
  {
    id: "4",
    author: "Sabine M.",
    rating: 5,
    text: "Freundliches Team, angenehme Atmosphäre und kurze Wartezeiten. Die Massagen sind erstklassig und haben meine Verspannungen gelöst.",
    date: "vor 1 Monat",
  },
];

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="physiotherapie-review-stars"
      role="img"
      aria-label={`${rating} von 5 Sternen`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
          style={{
            transition: "color 0.2s ease, transform 0.2s ease",
            display: "inline-block",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Social Media Links Component
interface SocialMediaLinksProps {
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  variant?: "default" | "small";
}

function SocialMediaLinks({
  socialMedia,
  variant = "default",
}: SocialMediaLinksProps) {
  if (!socialMedia) return null;

  const { instagram, facebook, whatsapp } = socialMedia;

  return (
    <div
      className={`physiotherapie-social ${variant === "small" ? "physiotherapie-social--small" : ""}`}
    >
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="physiotherapie-social__link"
          aria-label="Instagram"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="physiotherapie-social__link"
          aria-label="Facebook"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      )}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="physiotherapie-social__link"
          aria-label="WhatsApp"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>
      )}
    </div>
  );
}

export function PhysiotherapiePage() {
  const { theme, toggleTheme } = useTheme();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const galleryDragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleGalleryPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = galleryTrackRef.current;

    if (!track || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    galleryDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    setIsGalleryDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handleGalleryPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = galleryTrackRef.current;
    const dragState = galleryDragRef.current;

    if (!track || !dragState.isDragging) {
      return;
    }

    event.preventDefault();
    track.scrollLeft =
      dragState.scrollLeft - (event.clientX - dragState.startX);
  };

  const stopGalleryDrag = (event?: PointerEvent<HTMLDivElement>) => {
    const track = galleryTrackRef.current;

    if (event && track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    galleryDragRef.current.isDragging = false;
    setIsGalleryDragging(false);
  };

  return (
    <div className="physiotherapie-page" id="start">
      <StructuredData service="physiotherapie" />

      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Header / Navigation */}
      <header
        className={`physiotherapie-header ${isHeaderVisible ? "physiotherapie-header--visible" : "physiotherapie-header--hidden"}`}
        style={{
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
        }}
      >
        <div className="physiotherapie-header__inner">
          <a className="physiotherapie-brand" href="#start">
            {company.name}
          </a>

          <div className="physiotherapie-header__actions">
            <nav className="physiotherapie-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#preise">Preise</a>
              <a href="#team">Team</a>
              <a href="#galerie">Galerie</a>
              <a href="#bewertungen">Bewertungen</a>
              <a href="#kontakt">Kontakt</a>
            </nav>

            <button
              type="button"
              className={`theme-toggle theme-toggle--${theme}`}
              onClick={toggleTheme}
              aria-label="Theme wechseln"
            >
              <span className="theme-toggle__icon">
                {theme === "dark" ? "☀" : "🌙"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="physiotherapie-main">
        {/* Hero Section */}
        <section
          className="physiotherapie-hero"
          aria-labelledby="hero-title"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
          }}
        >
          <div className="physiotherapie-hero__content">
            <p className="physiotherapie-hero__eyebrow">
              Professionelle Physiotherapie in Berlin
            </p>
            <h1 id="hero-title" className="physiotherapie-hero__title">
              Ihre Gesundheit in besten Händen
            </h1>
            <p className="physiotherapie-hero__lead">
              Moderne Therapie mit Herz — für Ihre Mobilität und Lebensqualität
            </p>
            <div className="physiotherapie-hero__actions">
              <a
                href="#kontakt"
                className="physiotherapie-button physiotherapie-button--primary physiotherapie-button--shadow"
              >
                Jetzt Termin vereinbaren
              </a>
              <a
                href="#preise"
                className="physiotherapie-button physiotherapie-button--secondary"
              >
                Leistungen ansehen
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className="physiotherapie-about"
          id="leistungen"
          aria-labelledby="about-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="about-title" className="physiotherapie-section-title">
              Unsere Philosophie
            </h2>
            <div className="physiotherapie-about__content">
              <p>
                In unserer Praxis steht der Mensch im Mittelpunkt. Wir
                kombinieren evidenzbasierte Therapiemethoden mit individueller
                Betreuung, um Ihre Gesundheitsziele zu erreichen.
              </p>
              <p>
                Ob nach Verletzungen, bei chronischen Beschwerden oder zur
                Prävention – unser erfahrenes Team begleitet Sie auf Ihrem Weg
                zu mehr Beweglichkeit und Lebensqualität.
              </p>
              <p>
                Mit modernster Ausstattung und kontinuierlicher Fortbildung
                bieten wir Ihnen Behandlungen auf höchstem Niveau.
              </p>
            </div>

            <div className="physiotherapie-features">
              <div className="physiotherapie-feature physiotherapie-feature--highlight">
                <div className="physiotherapie-feature__icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="physiotherapie-feature__title">
                  Moderne Ausstattung
                </h3>
                <p className="physiotherapie-feature__text">
                  Neueste Geräte und Therapiemethoden für optimale Ergebnisse
                </p>
              </div>

              <div className="physiotherapie-feature physiotherapie-feature--highlight">
                <div className="physiotherapie-feature__icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="physiotherapie-feature__title">
                  Erfahrenes Team
                </h3>
                <p className="physiotherapie-feature__text">
                  Qualifizierte Therapeuten mit langjähriger Berufserfahrung
                </p>
              </div>

              <div className="physiotherapie-feature physiotherapie-feature--highlight">
                <div className="physiotherapie-feature__icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="physiotherapie-feature__title">
                  Flexible Termine
                </h3>
                <p className="physiotherapie-feature__text">
                  Termine auch früh morgens, abends und samstags möglich
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          className="physiotherapie-pricing"
          id="preise"
          aria-labelledby="pricing-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="pricing-title" className="physiotherapie-section-title">
              Leistungen & Preise
            </h2>

            <div className="physiotherapie-pricing__grid">
              {services.map((serviceCategory, idx) => (
                <div key={idx} className="physiotherapie-pricing__category">
                  <h3 className="physiotherapie-pricing__category-title">
                    {serviceCategory.category}
                  </h3>
                  <div className="physiotherapie-pricing__items">
                    {serviceCategory.items.map((item, itemIdx) => (
                      <div
                        ref={galleryTrackRef}
                        className={`physiotherapie-gallery__grid${
                          isGalleryDragging
                            ? " physiotherapie-gallery__grid--dragging"
                            : ""
                        }`}
                        onPointerDown={handleGalleryPointerDown}
                        onPointerMove={handleGalleryPointerMove}
                        onPointerUp={stopGalleryDrag}
                        onPointerCancel={stopGalleryDrag}
                        onLostPointerCapture={() => stopGalleryDrag()}
                        aria-label="Galerie Karussell"
                        style={{
                          scrollBehavior: isGalleryDragging ? "auto" : "smooth",
                        }}
                      >
                        <div className="physiotherapie-pricing__item-info">
                          <span className="physiotherapie-pricing__item-name">
                            {item.name}
                          </span>
                          <span className="physiotherapie-pricing__item-duration">
                            {item.duration}
                          </span>
                        </div>
                        <span className="physiotherapie-pricing__item-price">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="physiotherapie-pricing__notes">
              <div className="physiotherapie-info-box">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="physiotherapie-info-box__icon"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <p>
                    <strong>Kassenleistungen:</strong> Viele Behandlungen werden
                    auf Rezept von Ihrer Krankenkasse übernommen. Wir sind
                    Vertragspartner aller gesetzlichen und privaten
                    Krankenkassen.
                  </p>
                  <p style={{ marginTop: "0.5rem" }}>
                    <strong>Privatleistungen:</strong> Selbstzahlerleistungen
                    und Wellnessangebote können ohne Rezept in Anspruch genommen
                    werden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          className="physiotherapie-team"
          id="team"
          aria-labelledby="team-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="team-title" className="physiotherapie-section-title">
              Unser Team
            </h2>
            <div className="physiotherapie-team__content">
              <p>
                Unser Team besteht aus staatlich anerkannten Physiotherapeuten
                mit verschiedenen Spezialisierungen. Durch regelmäßige
                Fortbildungen bleiben wir immer auf dem neuesten Stand der
                Therapiemethoden.
              </p>
              <div className="physiotherapie-team__specializations">
                <div className="physiotherapie-specialization physiotherapie-specialization--accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>Manuelle Therapie</span>
                </div>
                <div className="physiotherapie-specialization physiotherapie-specialization--accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  <span>Sportphysiotherapie</span>
                </div>
                <div className="physiotherapie-specialization physiotherapie-specialization--accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Lymphdrainage</span>
                </div>
                <div className="physiotherapie-specialization physiotherapie-specialization--accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span>Osteopathie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          className="physiotherapie-gallery"
          id="galerie"
          aria-labelledby="gallery-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="gallery-title" className="physiotherapie-section-title">
              Unsere Praxis
            </h2>
            <div
              ref={galleryTrackRef}
              className={`physiotherapie-gallery__grid${
                isGalleryDragging
                  ? " physiotherapie-gallery__grid--dragging"
                  : ""
              }`}
              onPointerDown={handleGalleryPointerDown}
              onPointerMove={handleGalleryPointerMove}
              onPointerUp={stopGalleryDrag}
              onPointerCancel={stopGalleryDrag}
              onLostPointerCapture={() => stopGalleryDrag()}
              aria-label="Galerie Karussell"
            >
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="physiotherapie-gallery__item"
                  style={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="physiotherapie-gallery__image"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="physiotherapie-gallery__overlay">
                    <span className="physiotherapie-gallery__label">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="physiotherapie-gallery__note">
              Besuchen Sie uns und überzeugen Sie sich selbst von unserer
              modernen Praxis.
            </p>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="physiotherapie-reviews"
          id="bewertungen"
          aria-labelledby="reviews-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="reviews-title" className="physiotherapie-section-title">
              Was unsere Patienten sagen
            </h2>

            <div className="physiotherapie-reviews__grid">
              {reviews.map((review) => (
                <article
                  className="physiotherapie-review-card physiotherapie-review-card--elevated"
                  key={review.id}
                >
                  <StarRating rating={review.rating} />
                  <p className="physiotherapie-review-text">{review.text}</p>
                  <div className="physiotherapie-review-meta">
                    <p className="physiotherapie-review-author">
                      — {review.author}
                    </p>
                    <p className="physiotherapie-review-date">{review.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          className="physiotherapie-contact"
          id="kontakt"
          aria-labelledby="contact-title"
        >
          <div className="physiotherapie-shell">
            <h2 id="contact-title" className="physiotherapie-section-title">
              Kontakt & Anfahrt
            </h2>

            <div className="physiotherapie-contact__grid">
              {/* Contact Info */}
              <div className="physiotherapie-contact__info">
                <div className="physiotherapie-contact__block">
                  <h3 className="physiotherapie-contact__block-title">
                    Adresse
                  </h3>
                  <p>
                    {company.name}
                    <br />
                    {company.street}
                    <br />
                    {company.city}
                  </p>
                </div>

                <div className="physiotherapie-contact__block">
                  <h3 className="physiotherapie-contact__block-title">
                    Kontakt
                  </h3>
                  <p>
                    <a
                      href={`tel:${company.phone}`}
                      className="physiotherapie-contact__link"
                    >
                      Tel: {company.phoneDisplay}
                    </a>
                    <br />
                    <a
                      href={`mailto:${company.email}`}
                      className="physiotherapie-contact__link"
                    >
                      {company.email}
                    </a>
                  </p>
                </div>

                <div className="physiotherapie-contact__block">
                  <h3 className="physiotherapie-contact__block-title">
                    Öffnungszeiten
                  </h3>
                  {openingHours.map((schedule, idx) => (
                    <p key={idx} className="physiotherapie-contact__hours">
                      <strong>{schedule.day}:</strong> {schedule.hours}
                    </p>
                  ))}
                </div>

                {company.socialMedia && (
                  <div className="physiotherapie-contact__block">
                    <h3 className="physiotherapie-contact__block-title">
                      Folge uns
                    </h3>
                    <SocialMediaLinks socialMedia={company.socialMedia} />
                  </div>
                )}

                <div className="physiotherapie-contact__cta">
                  <a
                    href={`tel:${company.phone}`}
                    className="physiotherapie-button physiotherapie-button--primary physiotherapie-button--large physiotherapie-button--shadow"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L8.04 9.91a16 16 0 0 0 6.05 6.05l1.27-1.27a2 2 0 0 1 2.11-.45c.91.3 1.85.52 2.81.65A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="physiotherapie-contact__map">
                <iframe
                  src={company.mapsEmbedUrl}
                  className="physiotherapie-contact__map-iframe"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Standort"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="physiotherapie-footer">
        <div className="physiotherapie-shell">
          {company.socialMedia && (
            <div className="physiotherapie-footer__social">
              <SocialMediaLinks
                socialMedia={company.socialMedia}
                variant="small"
              />
            </div>
          )}
          <p className="physiotherapie-footer__text">
            © 2026 {company.name} |
            <a href="/impressum/" className="physiotherapie-footer__link">
              {" "}
              Impressum
            </a>{" "}
            |
            <a href="/datenschutz/" className="physiotherapie-footer__link">
              {" "}
              Datenschutz
            </a>
          </p>
        </div>
      </footer>

      {/* Mobile CTA Bar */}
      <nav className="physiotherapie-mobile-cta" aria-label="Schnellzugriff">
        <a className="physiotherapie-mobile-cta__link" href="#preise">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
          <span>Preise</span>
        </a>
        <a
          className="physiotherapie-mobile-cta__link physiotherapie-mobile-cta__link--primary"
          href={`tel:${company.phone}`}
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L8.04 9.91a16 16 0 0 0 6.05 6.05l1.27-1.27a2 2 0 0 1 2.11-.45c.91.3 1.85.52 2.81.65A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Anrufen</span>
        </a>
        <a className="physiotherapie-mobile-cta__link" href="#kontakt">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Anfahrt</span>
        </a>
      </nav>
    </div>
  );
}
