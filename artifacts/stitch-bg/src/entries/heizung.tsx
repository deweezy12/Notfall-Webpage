import { mountPage } from "@/mount";
import { ServicePlaceholderPage } from "@/pages/ServicePlaceholderPage";

mountPage(
  <ServicePlaceholderPage
    current="heizung"
    eyebrow="Route vorbereitet"
    title="Notfall Heizungsdienst"
    description="Die Heizungs-Route ist angelegt und kann jetzt Schritt fuer Schritt zur finalen Portfolio-Seite entlang von DESIGNHEIZUNG.md ausgebaut werden."
    designReference="DESIGNHEIZUNG.md"
  />,
);
