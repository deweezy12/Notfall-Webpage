import { DotRasterBackground } from "@/components/DotRasterBackground";
import { serviceLinks } from "@/lib/site";
import { useTheme } from "@/lib/theme";

export function LandingPage() {
  const { theme } = useTheme();

  return (
    <div className="landing-page">
      <DotRasterBackground theme={theme} />

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__content site-shell">
            <h1 className="landing-title">
              Willkommen bei
              <br />
              SchanzWebMedia
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
