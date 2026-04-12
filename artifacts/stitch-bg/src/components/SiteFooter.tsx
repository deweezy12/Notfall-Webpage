import { serviceLinks, withBase } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__inner">
        <div className="site-footer__intro">
          <p className="site-footer__eyebrow">Portfolio</p>
          <strong>Notfall Webpage</strong>
          <p>
            Ein Showoff-Setup für mehrere Notfall-Landingpages mit
            gemeinsamem Theme-System und separaten Routen.
          </p>
        </div>

        <div className="site-footer__links">
          <a href={withBase()}>Landing</a>
          {serviceLinks.map((service) => (
            <a key={service.key} href={service.href}>
              {service.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
