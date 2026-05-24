import { useTheme } from "@/lib/theme";
import { mockCompanies, nagelstudioBooking } from "@/lib/mock-data";
import { StructuredData } from "@/components/StructuredData";
import { asset } from "@/lib/site";
import { useState, useEffect, useRef, type PointerEvent } from "react";

const company = mockCompanies.nagelstudio;

// Pricing data for nail salon services
const services = [
  {
    category: "Maniküre",
    items: [
      { name: "Klassische Maniküre", duration: "30 min", price: "ab 25 EUR" },
      { name: "Maniküre mit Gel-Lack", duration: "45 min", price: "ab 45 EUR" },
      { name: "French Maniküre", duration: "45 min", price: "ab 48 EUR" },
    ],
  },
  {
    category: "Pediküre",
    items: [
      { name: "Klassische Pediküre", duration: "45 min", price: "ab 35 EUR" },
      { name: "Spa Pediküre", duration: "60 min", price: "ab 55 EUR" },
      { name: "Pediküre mit Gel-Lack", duration: "60 min", price: "ab 58 EUR" },
    ],
  },
  {
    category: "Nageldesign",
    items: [
      { name: "Einfaches Design", duration: "60 min", price: "ab 50 EUR" },
      { name: "French / Ombre", duration: "60 min", price: "ab 52 EUR" },
      { name: "Aufwendiges Design", duration: "90 min", price: "ab 75 EUR" },
      { name: "Nail Art / 3D", duration: "90-120 min", price: "ab 85 EUR" },
    ],
  },
  {
    category: "Extras",
    items: [
      { name: "Gel-Entfernung", duration: "20 min", price: "15 EUR" },
      { name: "Nagelverlängerung", duration: "90 min", price: "ab 65 EUR" },
      { name: "Nagelreparatur", duration: "15 min", price: "ab 10 EUR" },
    ],
  },
];

// Opening hours
const openingHours = [
  { day: "Montag - Freitag", hours: "09:00 - 19:00 Uhr" },
  { day: "Samstag", hours: "10:00 - 16:00 Uhr" },
  { day: "Sonntag", hours: "Geschlossen" },
];

// Gallery items with real images
const galleryItems = [
  {
    id: 1,
    label: "French Nails",
    image: asset("images/nagelstudio/french_nails.png"),
  },
  {
    id: 2,
    label: "Ombre Design",
    image: asset("images/nagelstudio/ombre.png"),
  },
  { id: 3, label: "Nail Art", image: asset("images/nagelstudio/artistic.png") },
  {
    id: 4,
    label: "Glitzer Design",
    image: asset("images/nagelstudio/glitzer.png"),
  },
  { id: 5, label: "3D Design", image: asset("images/nagelstudio/3d.png") },
  { id: 6, label: "Klassisch", image: asset("images/nagelstudio/normal.png") },
];

// Customer reviews
const reviews = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    text: "Absolut begeistert! Die Nägel sehen fantastisch aus und halten super lange. Sehr professionell und mit viel Liebe zum Detail gearbeitet.",
    date: "vor 1 Woche",
  },
  {
    id: "2",
    author: "Julia K.",
    rating: 5,
    text: "Endlich ein Nagelstudio, das meine Wünsche perfekt umsetzt! Die Atmosphäre ist entspannt und das Ergebnis immer top. Komme immer wieder gerne!",
    date: "vor 2 Wochen",
  },
  {
    id: "3",
    author: "Lisa W.",
    rating: 5,
    text: "Sehr freundliche Beratung und wunderschöne Nägel! Die Preise sind fair und das Design ist genau nach meinen Vorstellungen. Absolute Empfehlung!",
    date: "vor 3 Wochen",
  },
];

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="nagelstudio-review-stars">
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

// Social Media Links Component
interface SocialMediaLinksProps {
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  variant?: "default" | "small";
}

function SocialMediaLinks({
  socialMedia,
  variant = "default",
}: SocialMediaLinksProps) {
  if (!socialMedia) return null;

  const { instagram, facebook, tiktok, whatsapp } = socialMedia;

  return (
    <div
      className={`nagelstudio-social ${variant === "small" ? "nagelstudio-social--small" : ""}`}
    >
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="nagelstudio-social__link"
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
          className="nagelstudio-social__link"
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
      {tiktok && (
        <a
          href={tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="nagelstudio-social__link"
          aria-label="TikTok"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </a>
      )}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nagelstudio-social__link"
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

export function NagelstudioPage() {
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
        // Scrolling up or near top - show header
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide header
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
    track.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
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
    <div className="nagelstudio-page" id="start">
      <StructuredData service="nagelstudio" />

      {/* Skip link for accessibility */}
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Header / Navigation */}
      <header
        className={`nagelstudio-header ${isHeaderVisible ? "nagelstudio-header--visible" : "nagelstudio-header--hidden"}`}
      >
        <div className="nagelstudio-header__inner">
          <a className="nagelstudio-brand" href="#start">
            {company.name}
          </a>

          <div className="nagelstudio-header__actions">
            <nav className="nagelstudio-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#preise">Preise</a>
              <a href="#buchung">Buchung</a>
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

      <main className="nagelstudio-main">
        {/* Hero Section */}
        <section
          className="nagelstudio-hero"
          aria-labelledby="hero-title"
          style={{
            backgroundImage: `url(${asset("images/nagelstudio/header.png")})`,
          }}
        >
          <div className="nagelstudio-hero__content">
            <p className="nagelstudio-hero__eyebrow">
              Professionelle Nagelkunst
            </p>
            <h1 id="hero-title" className="nagelstudio-hero__title">
              Nagelstudio
            </h1>
            <p className="nagelstudio-hero__lead">
              Mit Herz und Leidenschaft für perfekte Nägel
            </p>
            <div className="nagelstudio-hero__actions">
              <a
                href="#buchung"
                className="nagelstudio-button nagelstudio-button--primary"
              >
                Jetzt Termin buchen
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className="nagelstudio-about"
          id="leistungen"
          aria-labelledby="about-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="about-title" className="nagelstudio-section-title">
              Was uns besonders macht
            </h2>
            <div className="nagelstudio-about__content">
              <p>
                Bei uns steht Ihre Zufriedenheit an erster Stelle. Wir verbinden
                professionelle Nagelkunst mit einem persönlichen Service und
                fairer Preisgestaltung.
              </p>
              <p>
                Unsere Leidenschaft ist es, Ihre Nägel perfekt zu pflegen und zu
                verschönern – in entspannter Atmosphäre und mit viel Liebe zum
                Detail.
              </p>
              <p>
                Jede Behandlung wird individuell auf Ihre Wünsche abgestimmt,
                damit Sie sich rundum wohlfühlen.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          className="nagelstudio-pricing"
          id="preise"
          aria-labelledby="pricing-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="pricing-title" className="nagelstudio-section-title">
              Leistungen & Preise
            </h2>

            <div className="nagelstudio-pricing__grid">
              {services.map((serviceCategory, idx) => (
                <div key={idx} className="nagelstudio-pricing__category">
                  <h3 className="nagelstudio-pricing__category-title">
                    {serviceCategory.category}
                  </h3>
                  <div className="nagelstudio-pricing__items">
                    {serviceCategory.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="nagelstudio-pricing__item">
                        <div className="nagelstudio-pricing__item-info">
                          <span className="nagelstudio-pricing__item-name">
                            {item.name}
                          </span>
                          <span className="nagelstudio-pricing__item-duration">
                            {item.duration}
                          </span>
                        </div>
                        <span className="nagelstudio-pricing__item-price">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="nagelstudio-pricing__note">
              <strong>Hinweis:</strong> Preise können je nach Aufwand variieren.
              Ein Beratungsgespräch ist kostenlos.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section
          className="nagelstudio-booking"
          id="buchung"
          aria-labelledby="booking-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="booking-title" className="nagelstudio-section-title">
              Termin buchen
            </h2>
            <p className="nagelstudio-booking__lead">
              Wählen Sie direkt einen freien Termin aus. Die Buchung läuft
              sicher über Google Calendar.
            </p>

            {nagelstudioBooking.googleCalendarBookingUrl ? (
              <div className="nagelstudio-booking__card">
                <div className="nagelstudio-booking__info">
                  <svg
                    className="nagelstudio-booking__icon"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <p>
                    Buchen Sie Ihren Wunschtermin direkt über unseren Google
                    Calendar. Sie werden zu einer sicheren Buchungsseite
                    weitergeleitet.
                  </p>
                </div>
                <a
                  href={nagelstudioBooking.googleCalendarBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nagelstudio-button nagelstudio-button--primary nagelstudio-button--large"
                >
                  Jetzt Termin buchen →
                </a>
              </div>
            ) : (
              <div className="nagelstudio-booking__fallback">
                <p>Termin per E-Mail anfragen:</p>
                <a
                  href={`mailto:${nagelstudioBooking.email}?subject=Terminanfrage`}
                  className="nagelstudio-button nagelstudio-button--primary"
                >
                  E-Mail senden
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section
          className="nagelstudio-gallery"
          id="galerie"
          aria-labelledby="gallery-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="gallery-title" className="nagelstudio-section-title">
              Unsere Arbeiten
            </h2>
            <div
              ref={galleryTrackRef}
              className={`nagelstudio-gallery__grid${
                isGalleryDragging ? " nagelstudio-gallery__grid--dragging" : ""
              }`}
              onPointerDown={handleGalleryPointerDown}
              onPointerMove={handleGalleryPointerMove}
              onPointerUp={stopGalleryDrag}
              onPointerCancel={stopGalleryDrag}
              onLostPointerCapture={() => stopGalleryDrag()}
              aria-label="Galerie Karussell"
            >
              {galleryItems.map((item) => (
                <div key={item.id} className="nagelstudio-gallery__item">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="nagelstudio-gallery__image"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="nagelstudio-gallery__overlay">
                    <span className="nagelstudio-gallery__label">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="nagelstudio-gallery__note">
              Weitere Beispiele unserer Arbeiten finden Sie auf Instagram.
            </p>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="nagelstudio-reviews"
          id="bewertungen"
          aria-labelledby="reviews-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="reviews-title" className="nagelstudio-section-title">
              Was unsere Kunden sagen
            </h2>

            <div className="nagelstudio-reviews__grid">
              {reviews.map((review) => (
                <article className="nagelstudio-review-card" key={review.id}>
                  <StarRating rating={review.rating} />
                  <p className="nagelstudio-review-text">{review.text}</p>
                  <div className="nagelstudio-review-meta">
                    <p className="nagelstudio-review-author">
                      — {review.author}
                    </p>
                    <p className="nagelstudio-review-date">{review.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          className="nagelstudio-contact"
          id="kontakt"
          aria-labelledby="contact-title"
        >
          <div className="nagelstudio-shell">
            <h2 id="contact-title" className="nagelstudio-section-title">
              Kontakt
            </h2>

            <div className="nagelstudio-contact__grid">
              {/* Contact Info */}
              <div className="nagelstudio-contact__info">
                <div className="nagelstudio-contact__block">
                  <h3 className="nagelstudio-contact__block-title">Adresse</h3>
                  <p>
                    {company.name}
                    <br />
                    {company.street}
                    <br />
                    {company.city}
                  </p>
                </div>

                <div className="nagelstudio-contact__block">
                  <h3 className="nagelstudio-contact__block-title">Kontakt</h3>
                  <p>
                    <a
                      href={`tel:${company.phone}`}
                      className="nagelstudio-contact__link"
                    >
                      Tel: {company.phoneDisplay}
                    </a>
                    <br />
                    <a
                      href={`mailto:${company.email}`}
                      className="nagelstudio-contact__link"
                    >
                      {company.email}
                    </a>
                  </p>
                </div>

                <div className="nagelstudio-contact__block">
                  <h3 className="nagelstudio-contact__block-title">
                    Öffnungszeiten
                  </h3>
                  {openingHours.map((schedule, idx) => (
                    <p key={idx} className="nagelstudio-contact__hours">
                      <strong>{schedule.day}:</strong> {schedule.hours}
                    </p>
                  ))}
                </div>

                {company.socialMedia && (
                  <div className="nagelstudio-contact__block">
                    <h3 className="nagelstudio-contact__block-title">
                      Folge uns
                    </h3>
                    <SocialMediaLinks socialMedia={company.socialMedia} />
                  </div>
                )}
              </div>

              {/* Google Maps */}
              <div className="nagelstudio-contact__map">
                <iframe
                  src={company.mapsEmbedUrl}
                  className="nagelstudio-contact__map-iframe"
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
      <footer className="nagelstudio-footer">
        <div className="nagelstudio-shell">
          {company.socialMedia && (
            <div className="nagelstudio-footer__social">
              <SocialMediaLinks
                socialMedia={company.socialMedia}
                variant="small"
              />
            </div>
          )}
          <p className="nagelstudio-footer__text">
            © 2026 {company.name} |
            <a href="/impressum/" className="nagelstudio-footer__link">
              {" "}
              Impressum
            </a>{" "}
            |
            <a href="/datenschutz/" className="nagelstudio-footer__link">
              {" "}
              Datenschutz
            </a>
          </p>
        </div>
      </footer>

      <nav className="nagelstudio-mobile-cta" aria-label="Schnellzugriff">
        <a className="nagelstudio-mobile-cta__link" href="#preise">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
          <span>Preise</span>
        </a>
        <a
          className="nagelstudio-mobile-cta__link nagelstudio-mobile-cta__link--primary"
          href="#buchung"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
          </svg>
          <span>Buchen</span>
        </a>
        <a className="nagelstudio-mobile-cta__link" href="#kontakt">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L8.04 9.91a16 16 0 0 0 6.05 6.05l1.27-1.27a2 2 0 0 1 2.11-.45c.91.3 1.85.52 2.81.65A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Kontakt</span>
        </a>
      </nav>
    </div>
  );
}
