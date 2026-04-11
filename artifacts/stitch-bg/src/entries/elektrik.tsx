import { mountPage } from "@/mount";
import { ServicePlaceholderPage } from "@/pages/ServicePlaceholderPage";

mountPage(
  <ServicePlaceholderPage
    current="elektrik"
    eyebrow="Route vorbereitet"
    title="Notfall Elektriker"
    description="Die Elektriker-Seite ist als eigene Route verfuegbar und wird im naechsten Schritt mit der staerkeren Sicherheits- und Stoerungsdramaturgie aus DESIGNELEKTRIK.md umgesetzt."
    designReference="DESIGNELEKTRIK.md"
  />,
);
