function App() {
  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Notfall-Webpage</p>
          <h1>Schnelle Orientierung, wenn es darauf ankommt.</h1>
          <p className="lead">
            Diese neue Startseite ist als klarer, belastbarer Ausgangspunkt fuer
            eine moderne GitHub-Pages-Website aufgebaut: eine starke Hero-Flaeche,
            strukturierte Einsatzkarten und genug Platz fuer echte Inhalte.
          </p>
          <div className="hero-actions">
            <a href="#einsatzplan" className="primary-link">
              Einsatzplan ansehen
            </a>
            <a href="#kontakt" className="secondary-link">
              Kontaktblock ersetzen
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="signal-card">
            <span className="signal-label">Status</span>
            <strong>Bereit fuer GitHub Pages</strong>
            <p>
              Die Seite baut ohne zwingende Umgebungsvariablen und ist auf eine
              Projektseite unter `/Notfall-Webpage/` vorbereitet.
            </p>
          </div>
          <div className="signal-grid">
            <article>
              <span>01</span>
              <h2>Modular</h2>
              <p>Abschnitte lassen sich direkt gegen deine echten Inhalte tauschen.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Leichtgewichtig</h2>
              <p>Keine Router-Abhaengigkeit, kein UI-Ballast, nur eine saubere Landingpage.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Deploybar</h2>
              <p>Ein GitHub-Action-Workflow veroeffentlicht den Build nach jedem Push auf `main`.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="einsatzplan" className="content-grid">
        <article className="content-card tall">
          <p className="card-kicker">Inhalt</p>
          <h2>Was auf diese Website als Naechstes gehoert</h2>
          <ul>
            <li>Klare Einstiegsbotschaft fuer Besucher in den ersten 5 Sekunden</li>
            <li>Ein priorisierter Handlungsblock mit Telefonnummern, Adressen oder Formularen</li>
            <li>Ein kurzer Vertrauensbereich mit Träger, Zuständigkeit und Aktualisierungsdatum</li>
          </ul>
        </article>

        <article className="content-card">
          <p className="card-kicker">Design</p>
          <h2>Neue visuelle Richtung</h2>
          <p>
            Das Layout setzt auf warme Signalfarben, klare Typografie und eine
            ruhige Rasterstruktur statt auf generische Dashboard-Komponenten.
          </p>
        </article>

        <article className="content-card">
          <p className="card-kicker">Technik</p>
          <h2>Einfacher Build-Pfad</h2>
          <p>
            Vite nutzt lokal `/` und in GitHub Actions automatisch den Repo-Pfad.
            Damit stimmt die Asset-Auslieferung auf GitHub Pages ohne Extra-Schritte.
          </p>
        </article>
      </section>

      <section className="timeline">
        <div>
          <p className="eyebrow">Naechste Schritte</p>
          <h2>Von Starter zu echter Website in drei Schritten</h2>
        </div>
        <ol>
          <li>
            <strong>Texte ersetzen.</strong> Hero, Kontaktblock und Inhaltsslots mit
            deinen echten Informationen befuellen.
          </li>
          <li>
            <strong>Bilder und Branding setzen.</strong> Farben, Logo, Favicon und
            Social Preview auf deinen Auftritt anpassen.
          </li>
          <li>
            <strong>Nach `main` pushen.</strong> GitHub Actions baut und deployed die
            Seite automatisch auf GitHub Pages.
          </li>
        </ol>
      </section>

      <section id="kontakt" className="contact-strip">
        <p>Kontaktblock Platzhalter</p>
        <a href="mailto:hallo@example.com">hallo@example.com</a>
      </section>
    </main>
  );
}

export default App;
