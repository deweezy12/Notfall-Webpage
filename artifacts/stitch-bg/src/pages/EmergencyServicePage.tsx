import { useTheme } from "@/lib/theme";
import { withBase, type ServiceKey } from "@/lib/site";
import {
  servicePageContent,
  type ServiceCard,
} from "@/lib/servicePageContent";

type EmergencyServicePageProps = {
  service: Exclude<ServiceKey, "schluessel">;
};

function renderGalleryCard(card: ServiceCard, reverse: boolean) {
  return (
    <article
      className={`detail-gallery-card ${reverse ? "detail-gallery-card--reverse" : ""}`}
      key={card.title}
    >
      <div className="detail-gallery-card__media" aria-hidden="true">
        <span>{card.label}</span>
      </div>
      <div className="detail-gallery-card__body">
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </article>
  );
}

export function EmergencyServicePage({
  service,
}: EmergencyServicePageProps) {
  const { theme, toggleTheme } = useTheme();
  const content = servicePageContent[service];

  return (
    <div className={`service-page service-detail-page service-detail-page--${service}`}>
      <header className="detail-topbar">
        <div className="site-shell detail-topbar__inner">
          <a className="detail-brand" href="#start">
            {content.brand}
          </a>

          <div className="detail-topbar__actions">
            <nav className="detail-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#referenzen">Referenzen</a>
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

            <a className="detail-call" href={`tel:${content.phoneHref}`}>
              {content.phone}
            </a>
          </div>
        </div>
      </header>

      <main id="start">
        <section className="detail-hero">
          <div className="site-shell detail-hero__layout">
            <div className="detail-hero__surface">
              <p className="section-eyebrow section-eyebrow--light">
                {content.heroEyebrow}
              </p>
              <h1>{content.heroTitle}</h1>
              <p className="detail-hero__lead">{content.heroLead}</p>

              <div className="detail-hero__actions">
                <a className="detail-button detail-button--primary" href={`tel:${content.phoneHref}`}>
                  Jetzt anrufen
                </a>
                <a className="detail-button detail-button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>

              <div className="detail-stat-grid">
                {content.stats.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="detail-section detail-section--contrast">
          <div className="site-shell detail-section__copy">
            <p className="section-eyebrow">Leistungen</p>
            <h2>{content.aboutTitle}</h2>
            {content.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section id="referenzen" className="detail-section detail-section--surface">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-eyebrow">Referenzen</p>
              <h2>{content.galleryTitle}</h2>
              <p>{content.galleryLead}</p>
            </div>

            <div className="detail-gallery-stack">
              {content.galleryCards.map((card, index) =>
                renderGalleryCard(card, index % 2 === 1),
              )}
            </div>
          </div>
        </section>

        <section id="preise" className="detail-section detail-section--pricing">
          <div className="site-shell detail-pricing-layout">
            <div className="detail-pricing-split">
              <div className="detail-pricing-column">
                <div className="section-heading section-heading--compact">
                  <h2>{content.pricingTitle}</h2>
                </div>

                <div className="detail-price-table">
                  <div className="detail-price-table__head">
                    <span>Zeitfenster</span>
                    <span>{content.pricingColumns.primary}</span>
                    <span>{content.pricingColumns.secondary}</span>
                  </div>

                  {content.prices.map((row) => (
                    <div className="detail-price-table__row" key={row.time}>
                      <span>{row.time}</span>
                      <strong>{row.primary}</strong>
                      <strong>{row.secondary}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-pricing-column">
                <div className="section-heading section-heading--compact">
                  <h2>{content.insightTitle}</h2>
                </div>

                <div className="detail-slider" aria-label="Einblicke">
                  <div className="detail-slider__track">
                    {[...content.insightCards, ...content.insightCards].map(
                      (item, index) => (
                        <div className="detail-slide-card" key={`${item}-${index}`}>
                          <span>{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="detail-section detail-section--surface">
          <div className="site-shell detail-trust-layout">
            <div className="detail-trust-copy">
              <p className="section-eyebrow">Kontakt</p>
              <h2>{content.contactTitle}</h2>
              <p>{content.contactLead}</p>

              <div className="detail-hero__actions">
                <a className="detail-button detail-button--primary" href={`tel:${content.phoneHref}`}>
                  {content.phone}
                </a>
                <a className="detail-button detail-button--secondary" href={withBase()}>
                  Zur Landingpage
                </a>
              </div>
            </div>

            <div className="detail-trust-list">
              {content.contactCards.map((card) => (
                <article className="detail-trust-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="detail-footer">
        <div className="site-shell detail-footer__meta">
          <div>
            <strong>{content.brand}</strong>
            <p>{content.address}</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>{content.footerServices}</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>
              24/7 erreichbar | {content.phone} | {content.email}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
