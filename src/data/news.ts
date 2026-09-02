export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tag: string;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "neues-angebot-fuer-senioren",
    title: "Neues Angebot für Senior:innen",
    date: "2026-05-15",
    excerpt:
      "Ab sofort bieten wir erweiterte Alltagshilfe-Pakete für Senior:innen und deren Angehörige in ganz Wien an.",
    content:
      "Wir freuen uns, Ihnen unser erweitertes Angebot vorstellen zu dürfen. Ab sofort stehen Senior:innen und deren Angehörige in ganz Wien flexible Betreuungspakete zur Verfügung – individuell abgestimmt auf Ihre Bedürfnisse. Ob regelmäßige Alltagshilfe oder punktuelle Unterstützung: Wir beraten Sie gerne kostenlos und unverbindlich.",
    tag: "Angebot",
  },
  {
    id: "2",
    slug: "informationsveranstaltung-wien",
    title: "Informationsveranstaltung Wien",
    date: "2026-04-28",
    excerpt:
      "Erfahren Sie mehr über unsere Leistungen und stellen Sie Ihre Fragen in persönlichem Gespräch.",
    content:
      "Wir laden Sie herzlich zu unserer Informationsveranstaltung in Wien ein. Lernen Sie unser Team kennen, erfahren Sie mehr über unsere Leistungen und stellen Sie alle Fragen, die Ihnen wichtig sind. Die Teilnahme ist kostenlos. Melden Sie sich gerne vorab an.",
    tag: "Event",
  },
  {
    id: "3",
    slug: "freiwillige-gesucht",
    title: "Freiwillige gesucht",
    date: "2026-04-10",
    excerpt:
      "Werden Sie Teil unseres Teams und schenken Sie Senior:innen Zeit, Aufmerksamkeit und Gesellschaft.",
    content:
      "Sie möchten Senior:innen im Alltag unterstützen und dabei etwas Sinnvolles tun? Wir suchen engagierte Freiwillige, die mit Herz und Zeit Menschen begleiten möchten. Ob regelmäßig oder gelegentlich – wir freuen uns auf Ihre Nachricht.",
    tag: "Mitmachen",
  },
];

export function formatNewsDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
