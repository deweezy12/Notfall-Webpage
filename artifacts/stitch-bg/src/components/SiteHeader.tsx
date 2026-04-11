import { serviceLinks, withBase } from "@/lib/site";
import { useTheme } from "@/lib/theme";

type SiteHeaderProps = {
  current?: string;
  tone?: "landing" | "service";
};

export function SiteHeader({
  current,
  tone = "service",
}: SiteHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`site-header site-header--${tone}`}>
      <div className="site-shell site-header__inner">
        <a className="site-brand" href={withBase()}>
          Notfall Webpage
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Seiten">
            {serviceLinks.map((service) => (
              <a
                key={service.key}
                className={`site-nav__link ${current === service.key ? "site-nav__link--current" : ""}`}
                href={service.href}
              >
                {service.label}
              </a>
            ))}
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
        </div>
      </div>
    </header>
  );
}
