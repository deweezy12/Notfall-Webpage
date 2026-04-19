import { useTheme } from "@/lib/theme";
import { asset, withBase } from "@/lib/site";
import { DotRasterBackground } from "@/components/DotRasterBackground";
import { MusicPlayer, type SoundfieldSource } from "@/components/MusicPlayer";

const soundfieldSources: SoundfieldSource[] = [
  {
    id: "brown-noise",
    label: "Brown Noise",
    kind: "noise",
    color: "brown",
  },
  {
    id: "pink-noise",
    label: "Pink Noise",
    kind: "noise",
    color: "pink",
  },
  {
    id: "the-mountain-lofi",
    label: "The Mountain LoFi",
    kind: "file",
    src: asset("audio/the-mountain-lofi.mp3"),
  },
];

export function SoundfieldPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="soundfield-page" id="start">
      <a href="#start" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      <header className="soundfield-header">
        <div className="site-shell soundfield-header__inner">
          <a className="soundfield-brand" href="#start">
            Soundfield
          </a>

          <div className="soundfield-header__actions">
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
        </div>
      </header>

      <main>
        <section className="soundfield-hero">
          <DotRasterBackground
            theme={theme}
            contained={true}
            backgroundColor="#000000"
            rainbow={true}
          />
          <div className="site-shell soundfield-hero__content">
            <h1 className="soundfield-title">Soundfield</h1>
            <p className="soundfield-lead">
              Welcome to Soundfield by Spacefield Media.
            </p>
            <MusicPlayer
              sources={soundfieldSources}
              initialSourceId="brown-noise"
            />
            <div className="soundfield-actions">
              <a
                className="soundfield-button soundfield-button--primary"
                href={withBase()}
              >
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="soundfield-footer">
        <div className="site-shell">
          <p>© 2026 Spacefield Media</p>
          <div>
            <a href={withBase("impressum/")}>Impressum</a>
            <a href={withBase("datenschutz/")}>Datenschutzerklärung</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
