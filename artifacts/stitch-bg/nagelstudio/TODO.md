# Nagelstudio TODO

## Done

- Created the `Nagelstudio` subpage and linked it from the main page.
- Added a minimal booking section on the `Nagelstudio` page.
- Implemented a single CTA for booking.
- Wired the page to use Google Calendar as the intended booking system.
- Added a fallback to email when no public Google booking link is configured yet.
- Added booking config fields in `src/lib/mock-data.ts`.
- Updated the Nagelstudio page metadata for booking-related SEO text.
- Verified the project still builds successfully.

## Next

- Create the Google Calendar appointment schedule in the chosen Google account.
- Copy the public Google booking URL.
- Paste that URL into `src/lib/mock-data.ts` as `googleCalendarBookingUrl`.
- Replace `termine@example.de` with the real Nagelstudio booking email.
- Test the live booking flow from the deployed GitHub Pages site.
- Confirm that bookings appear in the Google Calendar correctly.
- Decide later whether privacy/legal text should mention Google-based booking explicitly.
