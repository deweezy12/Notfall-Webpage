import { nagelstudioBooking } from "@/lib/mock-data";

export function NagelstudioPage() {
  const hasBookingLink = nagelstudioBooking.googleCalendarBookingUrl.length > 0;

  return (
    <div className="nagelstudio-page">
      <main className="nagelstudio-page__main">
        <section className="nagelstudio-page__panel" aria-labelledby="nagelstudio-title">
          <p className="nagelstudio-page__eyebrow">Nagelstudio</p>
          <h1 id="nagelstudio-title">Termin buchen</h1>
          <p className="nagelstudio-page__lead">
            Waehlen Sie direkt einen freien Termin aus. Die Buchung laeuft
            sicher ueber Google Calendar.
          </p>

          <div className="nagelstudio-page__actions">
            {hasBookingLink ? (
              <a
                className="nagelstudio-page__button"
                href={nagelstudioBooking.googleCalendarBookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Termin buchen
              </a>
            ) : (
              <a
                className="nagelstudio-page__button"
                href={`mailto:${nagelstudioBooking.email}`}
              >
                Termin anfragen
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
