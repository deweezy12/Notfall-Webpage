import { useEffect, useState } from "react";

const prices = [
  {
    time: "Mo-Fr | 08:00-18:00",
    simple: "ab 79 EUR",
    locked: "ab 109 EUR",
  },
  {
    time: "Mo-Fr | 18:00-22:00",
    simple: "ab 99 EUR",
    locked: "ab 139 EUR",
  },
  {
    time: "Mo-Fr | 22:00-08:00",
    simple: "ab 129 EUR",
    locked: "ab 169 EUR",
  },
  {
    time: "Sa, So und Feiertage",
    simple: "ab 119 EUR",
    locked: "ab 159 EUR",
  },
];

const galleryCards = [
  {
    image: "/images/1.jpg",
    title: "Wohnungstür schnell und sauber geöffnet",
    text: "Bei zugefallenen Türen steht die schonende Öffnung im Vordergrund. Ziel ist immer, schnell wieder Zugang zu schaffen, ohne unnötigen Materialtausch ausgelöst zu haben.",
  },
  {
    image: "/images/2.jpg",
    title: "Werkzeug statt Gewalt",
    text: "Für abgeschlossene Türen oder defekte Zylinder braucht es Erfahrung, das richtige Werkzeug und eine saubere Einschätzung vor Ort. Genau das schafft Vertrauen in stressigen Situationen.",
  },
];

const slides = [
  "/images/a.jpg",
  "/images/b.png",
  "/images/c.png",
  "/images/d.png",
  "/images/e.png",
  "/images/f.png",
];

const contactCards = [
  {
    title: "Klare Abwicklung",
    text: "Vor Arbeitsbeginn steht ein nachvollziehbarer Preisrahmen. Geöffnet wird mit Blick auf eine möglichst saubere Lösung und ohne unnötige Zusatzarbeiten.",
  },
  {
    title: "Rechtlicher Hinweis",
    text: "Zur Vermeidung unberechtigter Öffnungen kann vor Ort ein Nachweis der Zugangsberechtigung verlangt werden, etwa per Ausweis mit Anschrift. Bei dringenden, ausdrücklich angeforderten Notöffnungen kann das Widerrufsrecht nach § 312g Abs. 2 Nr. 11 BGB ausgeschlossen sein; weitergehende Arbeiten erfolgen nur nach gesonderter Zustimmung.",
  },
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`top-bar ${isScrolled ? "top-bar--scrolled" : ""}`}>
        <div className="top-bar__inner">
          <a className="brand" href="#start">
            Schlüsseldienst Berlin
          </a>
          <div className="top-bar__actions">
            <nav className="top-nav" aria-label="Seitenbereiche">
              <a href="#leistungen">Leistungen</a>
              <a href="#referenzen">Referenzen</a>
              <a href="#preise">Preise</a>
              <a href="#kontakt">Kontakt</a>
            </nav>
            <a className="call-pill" href="tel:+493012345678">
              030 123 45 678
            </a>
          </div>
        </div>
      </header>

      <main id="start">
        <section className="hero">
          <div className="section-shell hero__layout">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--dark">
                24/7 Schlüsseldienst in Berlin
              </p>
              <h1>Schnelle Türöffnung, wenn Sie nicht mehr reinkommen.</h1>
              <p className="hero__lead">
                Hilfe bei zugefallenen oder abgeschlossenen Türen,
                nachvollziehbare Preise und eine klare Kommunikation vom ersten
                Anruf bis zur Öffnung. Kein Mischangebot, kein Umweg, sondern
                ein fokussierter Schlüsseldienst für akute Situationen.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="tel:+493012345678">
                  Jetzt anrufen
                </a>
                <a className="button button--secondary" href="#preise">
                  Preise ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="leistungen" className="about">
          <div className="section-shell about__layout">
            <div className="about__copy">
              <p className="eyebrow">Leistungen</p>
              <h2>Schlüsseldienst mit einem klaren Fokus: wieder sicher hinein.</h2>
              <p>
                Wer vor der eigenen Tür steht, braucht keine breite
                Notdienst-Plattform, sondern einen Dienst, der genau diesen
                Einsatzfall beherrscht. Deshalb ist die Seite konsequent auf
                Türöffnung, Schlossprobleme und Zylinderwechsel ausgerichtet.
              </p>
              <p>
                Die Struktur führt erst zur akuten Hilfe, dann zu Leistungen,
                Referenzen und Preisen. So bekommen Besucher schnell die
                Information, die in einer Stresssituation wirklich zählt.
              </p>
              <p>
                Im Mittelpunkt stehen <strong>zugefallene Türen</strong>,{" "}
                <strong>abgeschlossene Türen</strong> und{" "}
                <strong>Schloss- und Zylinderwechsel</strong>, wenn eine saubere
                Öffnung nicht mehr ausreicht oder zusätzliche Sicherheit
                gebraucht wird. Die Sprache bleibt bewusst ruhig und klar, weil
                Besucher in dieser Situation vor allem Orientierung,
                Verlässlichkeit und einen schnellen nächsten Schritt brauchen.
              </p>
            </div>
          </div>
        </section>

        <section id="referenzen" className="gallery">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">Referenzen</p>
              <h2>Typische Einsatzbilder für einen Schlüsseldienst.</h2>
              <p>
                Die Bildsprache bleibt dicht am Thema: Türöffnung, Werkzeug
                und saubere Arbeit vor Ort statt beliebiger Stock-Optik.
              </p>
            </div>

            <div className="gallery__stack">
              {galleryCards.map((card, index) => (
                <article
                  className={`gallery-card ${index % 2 === 1 ? "gallery-card--reverse" : ""}`}
                  key={card.title}
                >
                  <img src={card.image} alt={card.title} />
                  <div className="gallery-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="preise" className="pricing">
          <div className="section-shell pricing__layout">
            <div className="pricing__split">
              <div className="pricing__column pricing__column--table">
                <div className="section-heading pricing__intro">
                  <h2>Preise</h2>
                </div>

                <div className="price-table">
                  <div className="price-table__head">
                    <span>Zeitfenster</span>
                    <span>Zugefallene Tür</span>
                    <span>Abgeschlossene Tür</span>
                  </div>

                  {prices.map((row) => (
                    <div className="price-table__row" key={row.time}>
                      <span>{row.time}</span>
                      <strong>{row.simple}</strong>
                      <strong>{row.locked}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pricing__column pricing__column--insights" id="einblicke">
                <div className="pricing__aside-copy">
                  <h2>Einblicke</h2>
                </div>

                <div className="slider slider--dark">
                  <div className="slider__track">
                    {[...slides, ...slides].map((slide, index) => (
                      <div className="slide" key={`${slide}-${index}`}>
                        <img src={slide} alt={`Werkzeug und Einsatzbild ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="trust">
          <div className="section-shell trust__layout">
            <div className="trust__copy">
              <p className="eyebrow">Kontakt</p>
              <h2>Wenn es schnell gehen muss, sollte der nächste Schritt klar sein.</h2>
              <p>
                Kurz anrufen, Situation schildern, Preisrahmen einordnen und
                den Einsatz starten. Genau so sollte ein Schlüsseldienst im
                Ernstfall funktionieren.
              </p>

              <div className="hero__actions trust__actions">
                <a className="button button--primary" href="tel:+493012345678">
                  030 123 45 678
                </a>
                <a className="button button--secondary" href="#referenzen">
                  Referenzen ansehen
                </a>
              </div>
            </div>

            <div className="trust-list">
              {contactCards.map((point) => (
                <article className="trust-card" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer__meta">
          <div>
            <strong>Schlüsseldienst Berlin</strong>
            <p>Musterstraße 12, 10115 Berlin</p>
          </div>
          <div>
            <strong>Leistungen</strong>
            <p>Türöffnung, Schlosswechsel, Zylinderwechsel, 24/7 Notdienst</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>24/7 erreichbar | 030 123 45 678 | info@example.de</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
