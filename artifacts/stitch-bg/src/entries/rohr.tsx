import { mountPage } from "@/mount";
import { ServicePlaceholderPage } from "@/pages/ServicePlaceholderPage";

mountPage(
  <ServicePlaceholderPage
    current="rohr"
    eyebrow="Route vorbereitet"
    title="Notfall Rohrreinigung"
    description="Die Unterseite steht bereits als eigener Endpunkt bereit. Als naechstes wird sie entlang von DESIGNROHR.md zu einer eigenstaendigen Portfolio-Demo ausgebaut."
    designReference="DESIGNROHR.md"
  />,
);
