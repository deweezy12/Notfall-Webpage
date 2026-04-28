import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { nagelstudioBooking } from "@/lib/mock-data";

export function NagelstudioPage() {
  const hasBookingLink = nagelstudioBooking.googleCalendarBookingUrl.length > 0;

  return (
    <div className="service-page service-placeholder">
      <SiteHeader current="nagelstudio" />

      <main className="service-placeholder__main">
        <section className="site-shell service-placeholder__hero">
          <p className="service-placeholder__eyebrow">Online buchen</p>
          <h1>Nagelstudio Termine</h1>
          <p className="service-placeholder__lead">
            Termine werden direkt ueber Google Calendar vergeben. Die Website
            selbst verwaltet keine Slots oder Buchungen. Bitte planen Sie fuer
            die Anfrage einen kurzen Moment ein.
          </p>

          <div className="service-placeholder__actions">
            {hasBookingLink ? (
              <a
                className="button-chip button-chip--solid"
                href={nagelstudioBooking.googleCalendarBookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Termin buchen
              </a>
            ) : (
              <a
                className="button-chip button-chip--solid"
                href={`mailto:${nagelstudioBooking.email}`}
              >
                Termin anfragen
              </a>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
