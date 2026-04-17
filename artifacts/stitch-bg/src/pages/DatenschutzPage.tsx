import { useTheme } from "@/lib/theme";
import { legalEntity } from "@/lib/mock-data";
import { withBase } from "@/lib/site";

export function DatenschutzPage() {
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

          <h1>Datenschutzerklärung</h1>

          <section className="legal-section">
            <h2>1. Datenschutz auf einen Blick</h2>

            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können. Ausführliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer unter
              diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3>Datenerfassung auf unserer Website</h3>
            <h4>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
              dieser Website entnehmen.
            </p>

            <h4>Wie erfassen wir Ihre Daten?</h4>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
              ein Kontaktformular eingeben.
            </p>
            <p>
              Andere Daten werden automatisch beim Besuch der Website durch
              unsere IT-Systeme erfasst. Das sind vor allem technische Daten
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
              sobald Sie unsere Website betreten.
            </p>

            <h4>Wofür nutzen wir Ihre Daten?</h4>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewährleisten. Andere Daten können
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p>
              Sie haben jederzeit das Recht unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
              die Berichtigung, Sperrung oder Löschung dieser Daten zu
              verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz
              können Sie sich jederzeit unter der im Impressum angegebenen
              Adresse an uns wenden.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Wenn Sie diese Website benutzen, werden verschiedene
              personenbezogene Daten erhoben. Die vorliegende
              Datenschutzerklärung erläutert, welche Daten wir erheben und wofür
              wir sie nutzen.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
              kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p>
              {legalEntity.companyName}
              <br />
              {legalEntity.street}
              <br />
              {legalEntity.city}
              <br />
              Tel.:{" "}
              <a href={`tel:${legalEntity.phone}`}>
                {legalEntity.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>

            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte
              Einwilligung jederzeit widerrufen. Dazu reicht eine formlose
              Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>

            <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein
              Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist
              der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser
              Unternehmen seinen Sitz hat.
            </p>

            <h3>Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
              Einwilligung oder in Erfüllung eines Vertrags automatisiert
              verarbeiten, an sich oder an einen Dritten in einem gängigen,
              maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
              direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL-bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von "http://" auf
              "https://" wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>

            <h3>Auskunft, Sperrung, Löschung</h3>
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
              auf Berichtigung, Sperrung oder Löschung dieser Daten.
            </p>

            <h3>Widerspruch gegen Werbe-Mails</h3>
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
              Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter
              Werbung und Informationsmaterialien wird hiermit widersprochen.
              Die Betreiber der Seiten behalten sich ausdrücklich rechtliche
              Schritte im Falle der unverlangten Zusendung von
              Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Datenerfassung auf unserer Website</h2>

            <h3>Cookies</h3>
            <p>
              Die Internetseiten verwenden teilweise so genannte Cookies.
              Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten
              keine Viren. Cookies dienen dazu, unser Angebot
              nutzerfreundlicher, effektiver und sicherer zu machen. Cookies
              sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und
              die Ihr Browser speichert.
            </p>
            <p>
              Die meisten der von uns verwendeten Cookies sind so genannte
              "Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch
              gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert
              bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren
              Browser beim nächsten Besuch wiederzuerkennen.
            </p>

            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <footer className="legal-footer">
            <nav className="legal-nav">
              <a href={withBase()}>Startseite</a>
              <a href={withBase("impressum/")}>Impressum</a>
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
