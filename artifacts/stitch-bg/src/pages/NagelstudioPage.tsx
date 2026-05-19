import { useTheme } from "@/lib/theme";
import { mockCompanies, nagelstudioBooking } from "@/lib/mock-data";
import { StructuredData } from "@/components/StructuredData";

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

// Placeholder gallery items
const galleryItems = [
  { id: 1, label: "French Nails" },
  { id: 2, label: "Ombre Design" },
  { id: 3, label: "Nail Art" },
  { id: 4, label: "Glitzer Design" },
  { id: 5, label: "3D Design" },
  { id: 6, label: "Klassisch" },
];

export function NagelstudioPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="nagelstudio-page" id="start">
      <StructuredData service="nagelstudio" />

      {/* Skip link for accessibility */}
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Header / Navigation */}
      <header className="nagelstudio-header">
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
        <section className="nagelstudio-hero" aria-labelledby="hero-title">
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
            <div className="nagelstudio-gallery__grid">
              {galleryItems.map((item) => (
                <div key={item.id} className="nagelstudio-gallery__item">
                  <div className="nagelstudio-gallery__placeholder">
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
    </div>
  );
}
