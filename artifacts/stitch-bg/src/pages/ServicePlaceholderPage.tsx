import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { withBase } from "@/lib/site";

type ServicePlaceholderPageProps = {
  current: "rohr" | "elektrik" | "heizung";
  title: string;
  eyebrow: string;
  description: string;
  designReference: string;
};

export function ServicePlaceholderPage({
  current,
  title,
  eyebrow,
  description,
  designReference,
}: ServicePlaceholderPageProps) {
  return (
    <div className={`service-placeholder service-placeholder--${current}`}>
      <SiteHeader current={current} />

      <main className="service-placeholder__main">
        <section className="service-placeholder__hero site-shell">
          <p className="service-placeholder__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="service-placeholder__lead">{description}</p>

          <div className="service-placeholder__actions">
            <a className="button-chip button-chip--solid" href={withBase()}>
              Zur Landingpage
            </a>
            <a
              className="button-chip button-chip--ghost"
              href={withBase("schluessel/")}
            >
              Schluessel ansehen
            </a>
          </div>
        </section>

        <section className="service-placeholder__grid site-shell">
          <article className="placeholder-card">
            <span>Naechster Ausbau</span>
            <strong>Diese Route steht bereits.</strong>
            <p>
              Struktur, Theme-Switcher und Navigation sind vorbereitet. Als
              naechster Schritt wird das finale Service-Layout ausgebaut.
            </p>
          </article>

          <article className="placeholder-card">
            <span>Design-Quelle</span>
            <strong>{designReference}</strong>
            <p>
              Die finale Seite wird eng an das jeweilige Design-Dokument
              angelehnt, aber in das gemeinsame Portfolio-System eingebettet.
            </p>
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
