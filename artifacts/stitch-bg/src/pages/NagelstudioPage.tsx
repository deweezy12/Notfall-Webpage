import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function NagelstudioPage() {
  return (
    <div className="service-page service-placeholder">
      <SiteHeader current="nagelstudio" />

      <main className="service-placeholder__main">
        <section className="site-shell service-placeholder__hero">
          <p className="service-placeholder__eyebrow">Neue Unterseite</p>
          <h1>Nagelstudio</h1>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
