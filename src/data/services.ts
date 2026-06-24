export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  color: "teal" | "orange";
};

export const services: Service[] = [
  {
    id: "einkaufen",
    title: "Einkaufen und Besorgungen",
    shortDescription: "Wir erledigen Ihre Einkäufe und Besorgungen – zuverlässig und nach Ihren Wünschen.",
    description:
      "Ob Lebensmittel, Apotheke oder Drogerie – wir übernehmen gerne Ihre Einkäufe und Besorgungen. Sie geben uns Ihre Liste, wir kümmern uns um den Rest. So bleibt Ihr Kühlschrank gefüllt und Sie müssen sich keine Sorgen machen.",
    icon: "shopping",
    image: "/einkaufen-und-besorgungen.jpeg",
    color: "teal",
  },
  {
    id: "haushalt",
    title: "Unterstützung im Haushalt",
    shortDescription: "Hilfe bei leichten Hausarbeiten – damit Ihr Zuhause gemütlich bleibt.",
    description:
      "Aufräumen, Staubwischen, Betten beziehen oder die Küche in Ordnung halten – wir unterstützen Sie bei alltäglichen Aufgaben im Haushalt. Behutsam, respektvoll und so, wie es für Sie passt.",
    icon: "home",
    image: "/unterstuetzung-im-haushalt.jpeg",
    color: "orange",
  },
  {
    id: "waesche",
    title: "Wäsche-Service",
    shortDescription: "Wäsche waschen, falten und ordentlich verstauen – wir helfen gerne.",
    description:
      "Wäsche waschen, trocknen, bügeln oder falten kann anstrengend sein. Wir übernehmen diese Aufgaben für Sie, damit Sie sich um Wichtigeres kümmern können – oder einfach entspannen.",
    icon: "laundry",
    image: "/waesche-service.jpeg",
    color: "teal",
  },
  {
    id: "arzt",
    title: "Begleitung zu Arztterminen",
    shortDescription: "Sichere Begleitung zu Arzt- und Therapieterminen in Wien.",
    description:
      "Wir begleiten Sie zu Arztterminen, Untersuchungen oder Therapien. Wir warten mit Ihnen, helfen bei der Orientierung und sorgen dafür, dass Sie sich sicher und gut betreut fühlen.",
    icon: "medical",
    image: "/begleitung-zu-arztterminen.jpeg",
    color: "orange",
  },
  {
    id: "spaziergaenge",
    title: "Spaziergänge und Freizeitbegleitung",
    shortDescription: "Gemeinsame Spaziergänge und Ausflüge – frische Luft und Bewegung.",
    description:
      "Ein Spaziergang im Park, ein Besuch im Café oder ein kurzer Ausflug – wir begleiten Sie bei Freizeitaktivitäten, die Ihnen Freude bereiten und Ihre Lebensqualität stärken.",
    icon: "walk",
    image: "/spaziergaenge-und-freizeitbegleitung.jpeg",
    color: "teal",
  },
  {
    id: "gesellschaft",
    title: "Gesellschaft und Aktivierung",
    shortDescription: "Gespräche, Vorlesen, Spiele – damit der Alltag lebendig bleibt.",
    description:
      "Manchmal ist ein gutes Gespräch das Wichtigste. Wir schenken Ihnen Zeit, Gesellschaft und Aufmerksamkeit – beim Plaudern, Vorlesen, Spielen oder einfach beim Zuhören.",
    icon: "chat",
    image: "/gesellschaft-und-aktivierung.jpeg",
    color: "orange",
  },
  {
    id: "kleine-hilfen",
    title: "Kleine Hilfen im Alltag",
    shortDescription: "Alltägliche Dinge, die leichter werden – mit freundlicher Unterstützung.",
    description:
      "Briefe sortieren, Medikamente bereitlegen, Blumen gießen oder das Telefonat mit Behörden – kleine Dinge, die im Alltag viel bedeuten. Wir helfen Ihnen gerne dabei.",
    icon: "help",
    image: "/kleine-hilfen-im-alltag.jpeg",
    color: "teal",
  },
  {
    id: "individuell",
    title: "Individuelle Unterstützung",
    shortDescription: "Maßgeschneiderte Betreuung – genau so, wie Sie es brauchen.",
    description:
      "Jeder Mensch ist anders. Deshalb bieten wir individuelle Betreuungspakete, die genau auf Ihre Situation abgestimmt sind. Sprechen Sie uns an – gemeinsam finden wir die passende Lösung.",
    icon: "star",
    image: "/individuelle-unterstuetzung.jpeg",
    color: "orange",
  },
];
