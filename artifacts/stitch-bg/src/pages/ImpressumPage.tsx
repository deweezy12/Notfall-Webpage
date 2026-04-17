import { useTheme } from "@/lib/theme";
import { legalEntity } from "@/lib/mock-data";
import { withBase } from "@/lib/site";

export function ImpressumPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="legal-page" data-theme={theme}>
      <header className="legal-header">
        <div className="site-shell legal-header__inner">
          <a className="legal-brand" href={withBase()}>
            ← Zurück zur Startseite
          </a>
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
      </header>

      <main className="legal-main">
        <div className="site-shell legal-content">
          <div className="legal-disclaimer">
            <p>
              <strong>⚠️ Wichtiger Hinweis:</strong> {legalEntity.disclaimer}
            </p>
          </div>

          <h1>Impressum</h1>

          <section className="legal-section">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>{legalEntity.companyName}</strong>
              <br />
              {legalEntity.street}
              <br />
              {legalEntity.city}
              <br />
              {legalEntity.country}
            </p>
            <p>
              Tel.:{" "}
              <a href={`tel:${legalEntity.phone}`}>
                {legalEntity.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>Vertretungsberechtigter</h2>
            <p>Geschäftsführer: {legalEntity.managingDirector}</p>
          </section>

          <section className="legal-section">
            <h2>Registereintrag</h2>
            <p>
              Eintragung im Handelsregister
              <br />
              Registergericht: {legalEntity.registrationCourt}
              <br />
              Registernummer: {legalEntity.registrationNumber}
            </p>
          </section>

          <section className="legal-section">
            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
              <br />
              {legalEntity.vatId}
            </p>
          </section>

          <section className="legal-section">
            <h2>Für den Inhalt verantwortlich</h2>
            <p>{legalEntity.managingDirector}</p>
            <p>
              Das Impressum gilt für die Seite {legalEntity.website} sowie für
              alle zugehörigen Unterseiten.
            </p>
          </section>

          <section className="legal-section">
            <h2>Haftungsausschluss</h2>

            <h3>1. Inhalt des Onlineangebotes</h3>
            <p>
              Der Autor übernimmt keinerlei Gewähr für die Aktualität,
              Korrektheit, Vollständigkeit oder Qualität der bereitgestellten
              Informationen. Haftungsansprüche gegen den Autor, welche sich auf
              Schäden materieller oder ideeller Art beziehen, die durch die
              Nutzung oder Nichtnutzung der dargebotenen Informationen bzw.
              durch die Nutzung fehlerhafter und unvollständiger Informationen
              verursacht wurden, sind grundsätzlich ausgeschlossen, sofern
              seitens des Autors kein nachweislich vorsätzliches oder grob
              fahrlässiges Verschulden vorliegt.
            </p>
            <p>
              Alle Angebote sind freibleibend und unverbindlich. Der Autor
              behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte
              Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu
              löschen oder die Veröffentlichung zeitweise oder endgültig
              einzustellen.
            </p>

            <h3>2. Verweise und Links</h3>
            <p>
              Bei direkten oder indirekten Verweisen auf fremde Webseiten
              ("Hyperlinks"), die außerhalb des Verantwortungsbereiches des
              Autors liegen, würde eine Haftungsverpflichtung ausschließlich in
              dem Fall in Kraft treten, in dem der Autor von den Inhalten
              Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die
              Nutzung im Falle rechtswidriger Inhalte zu verhindern.
            </p>
            <p>
              Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der
              Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten
              erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die
              Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten
              hat der Autor keinerlei Einfluss. Deshalb distanziert er sich
              hiermit ausdrücklich von allen Inhalten aller verlinkten
              /verknüpften Seiten, die nach der Linksetzung verändert wurden.
            </p>
            <p>
              Diese Feststellung gilt für alle innerhalb des eigenen
              Internetangebotes gesetzten Links und Verweise. Für illegale,
              fehlerhafte oder unvollständige Inhalte und insbesondere für
              Schäden, die aus der Nutzung oder Nichtnutzung solcherart
              dargebotener Informationen entstehen, haftet allein der Anbieter
              der Seite, auf welche verwiesen wurde, nicht derjenige, der über
              Links auf die jeweilige Veröffentlichung lediglich verweist.
            </p>

            <h3>3. Urheber- und Kennzeichenrecht</h3>
            <p>
              Der Autor ist bestrebt, in allen Publikationen die Urheberrechte
              der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und
              Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken,
              Tondokumente, Videosequenzen und Texte zu nutzen oder auf
              lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte
              zurückzugreifen.
            </p>
            <p>
              Das Copyright für veröffentlichte, vom Autor selbst erstellte
              Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung
              oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und
              Texte in anderen elektronischen oder gedruckten Publikationen ist
              ohne ausdrückliche Zustimmung des Autors nicht gestattet.
            </p>

            <h3>4. Rechtswirksamkeit dieses Haftungsausschlusses</h3>
            <p>
              Dieser Haftungsausschluss ist als Teil des Internetangebotes zu
              betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern
              Teile oder einzelne Formulierungen dieses Textes der geltenden
              Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen
              sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt
              und ihrer Gültigkeit davon unberührt.
            </p>
          </section>

          <footer className="legal-footer">
            <nav className="legal-nav">
              <a href={withBase()}>Startseite</a>
              <a href={withBase("datenschutz/")}>Datenschutzerklärung</a>
            </nav>
            <p className="legal-meta">
              © 2026 {legalEntity.companyName} · Beispiel-Website für
              Demonstrationszwecke
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
