import { useTheme } from "@/lib/theme";
import { mockCompanies } from "@/lib/mock-data";

const company = mockCompanies.physiotherapie;

export function PhysiotherapiePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="physiotherapie-page" id="start">
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <header className="physiotherapie-topbar">
        <div className="site-shell physiotherapie-topbar__inner">
          <a className="physiotherapie-brand" href="#start">
            {company.name}
          </a>

          <div className="physiotherapie-topbar__actions">
            <button
              type="button"
              className={`theme-toggle theme-toggle--${theme}`}
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Zu hellem Design wechseln"
                  : "Zu dunklem Design wechseln"
              }
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="physiotherapie-main">
        <section className="physiotherapie-hero">
          <div className="site-shell">
            <h1>Professionelle Physiotherapie in Berlin</h1>
            <p>Ihre Gesundheit in besten Händen</p>
          </div>
        </section>

        <section className="physiotherapie-contact">
          <div className="site-shell">
            <h2>Kontakt</h2>
            <div className="contact-info">
              <p>
                <strong>{company.name}</strong>
              </p>
              <p>{company.street}</p>
              <p>{company.city}</p>
              <p>
                <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="physiotherapie-footer">
        <div className="site-shell">
          <p>&copy; 2026 {company.name}. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
