import { useEffect } from "react";
import { DotRasterBackground } from "@/components/DotRasterBackground";
import { serviceLinks } from "@/lib/site";
import { useTheme } from "@/lib/theme";

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  // Force dark theme on landing page initial load only
  useEffect(() => {
    const hasUserToggledTheme = sessionStorage.getItem("landing-user-toggled");

    if (!hasUserToggledTheme && theme === "light") {
      toggleTheme();
    }
  }, []); // Empty dependency array - only runs once on mount

  const handleThemeToggle = () => {
    sessionStorage.setItem("landing-user-toggled", "true");
    toggleTheme();
  };

  return (
    <div className="landing-page">
      <DotRasterBackground theme={theme} />
      {/* Hidden theme toggle in top-left corner */}
      <button
        type="button"
        className="landing-theme-hotspot"
        onClick={handleThemeToggle}
        aria-label={
          theme === "dark"
            ? "Zum hellen Modus wechseln"
            : "Zum dunklen Modus wechseln"
        }
      />

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__content site-shell">
            <h1 className="landing-title">Willkommen bei Spacefield Media</h1>

            <div
              className="landing-actions landing-actions--grid"
              aria-label="Services"
            >
              {serviceLinks.map((service) => (
                <a
                  key={service.key}
                  className={`landing-action landing-action--${service.key}`}
                  href={service.href}
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
