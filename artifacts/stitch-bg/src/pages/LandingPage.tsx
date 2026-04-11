import { useEffect, useRef } from "react";
import { DotRasterBackground } from "@/components/DotRasterBackground";
import { serviceLinks } from "@/lib/site";
import { useTheme } from "@/lib/theme";

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const forcedDarkRef = useRef(false);

  useEffect(() => {
    if (!forcedDarkRef.current && theme === "light") {
      forcedDarkRef.current = true;
      toggleTheme();
    }
  }, [theme, toggleTheme]);

  return (
    <div className="landing-page">
      <DotRasterBackground theme={theme} />
      <button
        type="button"
        className="landing-theme-hotspot"
        onClick={toggleTheme}
        aria-label={
          theme === "dark"
            ? "Zum hellen Modus wechseln"
            : "Zum dunklen Modus wechseln"
        }
      />

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__content site-shell">
            <h1 className="landing-title">
              Willkommen bei
              <br />
              Spacefield Media
            </h1>

            <div className="landing-actions" aria-label="Services">
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
