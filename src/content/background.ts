/** Parcours et compétences. */
export const skills = [
  { group: "Langages", items: "PHP, JavaScript, C#, Python, SQL, Bash, HTML/CSS" },
  { group: "Interface", items: "React, Next.js, Tailwind CSS, Figma" },
  { group: "Serveur", items: "Laravel, .NET, API REST, WordPress" },
  { group: "Données", items: "MySQL, SQL Server, SQLite, Eloquent" },
  {
    group: "Méthode",
    items: "Git, Postman, analyse des besoins, tests unitaires, Agile, RGPD, documentation",
  },
];

export type Step = {
  period: string;
  title: string;
  place: string;
  /** Mention mise en avant au surligneur. */
  highlight?: string;
  detail: string;
};

export const journey: Step[] = [
  {
    period: "2024 – 2026",
    title: "BTS SIO, option SLAM",
    place: "Lycée Mathias, Chalon-sur-Saône",
    highlight: "Diplôme obtenu.",
    detail: "Solutions logicielles et applications métiers.",
  },
  {
    period: "Mai – juin 2025",
    title: "Développeur web, stage",
    place: "IUT de Chalon-sur-Saône, 6 semaines",
    detail: "Refonte du système d'affichage dynamique : cinq écrans, un par département.",
  },
  {
    period: "2023 – 2024",
    title: "BUT Informatique, 1re année",
    place: "IUT de Dijon",
    detail: "Programmation, web, réseaux, cybersécurité.",
  },
  {
    period: "2023",
    title: "Baccalauréat général",
    place: "Lycée Lamartine, Mâcon",
    highlight: "Mention Bien.",
    detail: "Spécialités NSI, SES et LLCER anglais.",
  },
];
