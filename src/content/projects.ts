import type { IconName } from "@/components/diagram/icon";

/** Case d'un schéma, placée dans un repère de 640 × 500. */
export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  icon: IconName;
  /** Phrase affichée quand la case est survolée ou sélectionnée. */
  explanation: string;
  /** Cases éclairées en même temps. */
  related: string[];
  core?: boolean;
};

export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  stack: string[];
  codeUrl?: string;
  nodes: DiagramNode[];
  edges: [from: string, to: string][];
};

export const projects: Project[] = [
  {
    id: "jobpilot",
    title: "JobPilot",
    shortTitle: "JobPilot",
    summary:
      "Une plateforme de recrutement qui met en relation candidats et entreprises. Conçue et développée seul.",
    stack: ["Laravel 11", "PHP 8.2", "SQLite", "Blade", "Jetstream"],
    codeUrl: "https://github.com/r-rimane/JobPilot",
    edges: [
      ["candidates", "auth"],
      ["companies", "auth"],
      ["admin", "auth"],
      ["auth", "app"],
      ["app", "database"],
      ["app", "api"],
    ],
    nodes: [
      {
        id: "candidates",
        x: 0,
        y: 8,
        width: 196,
        height: 74,
        title: "Candidats",
        subtitle: "Recherche d'offres",
        icon: "user",
        explanation:
          "Une fois connectés, ils parcourent les offres avec une recherche multicritère.",
        related: ["auth", "app", "database"],
      },
      {
        id: "companies",
        x: 222,
        y: 8,
        width: 196,
        height: 74,
        title: "Entreprises",
        subtitle: "Accès dédié",
        icon: "building",
        explanation: "Elles disposent de leur propre rôle et des accès correspondants.",
        related: ["auth", "app", "database"],
      },
      {
        id: "admin",
        x: 444,
        y: 8,
        width: 196,
        height: 74,
        title: "Administrateur",
        subtitle: "Comptes et rôles",
        icon: "shield",
        explanation: "Il modère les utilisateurs et modifie leurs rôles.",
        related: ["auth", "app", "database"],
      },
      {
        id: "auth",
        x: 180,
        y: 152,
        width: 280,
        height: 76,
        title: "Authentification",
        subtitle: "Un accès par rôle",
        icon: "shield",
        explanation: "Connexion sécurisée avec Jetstream, avant tout accès à l'application.",
        related: ["candidates", "companies", "admin", "app"],
      },
      {
        id: "app",
        x: 110,
        y: 282,
        width: 420,
        height: 88,
        title: "Application Laravel",
        subtitle: "Offres, recherche, administration",
        icon: "code",
        explanation: "Le cœur du projet, développé en Laravel 11 et PHP 8.2.",
        related: ["candidates", "companies", "admin", "auth", "database", "api"],
        core: true,
      },
      {
        id: "database",
        x: 60,
        y: 424,
        width: 240,
        height: 74,
        title: "SQLite",
        subtitle: "via Eloquent",
        icon: "database",
        explanation: "Les données sont stockées dans SQLite, manipulées avec Eloquent.",
        related: ["app"],
      },
      {
        id: "api",
        x: 340,
        y: 424,
        width: 240,
        height: 74,
        title: "API REST",
        subtitle: "Données exposées",
        icon: "plug",
        explanation: "Les données de la plateforme sont aussi accessibles par une API.",
        related: ["app"],
      },
    ],
  },
  {
    id: "affichage-iut",
    title: "Affichage dynamique de l'IUT",
    shortTitle: "Affichage de l'IUT",
    summary:
      "La refonte du système qui alimente les écrans de l'IUT de Chalon-sur-Saône : cinq écrans, un par département. Réalisée seul, en six semaines de stage.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Bash"],
    edges: [
      ["interface", "server"],
      ["scripts", "server"],
      ["server", "database"],
      ["server", "screens"],
    ],
    nodes: [
      {
        id: "interface",
        x: 40,
        y: 24,
        width: 260,
        height: 84,
        title: "Interface",
        subtitle: "HTML, CSS, JavaScript",
        icon: "screen",
        explanation: "La partie visible du système, en HTML, CSS et JavaScript.",
        related: ["server", "database", "screens"],
      },
      {
        id: "scripts",
        x: 340,
        y: 24,
        width: 260,
        height: 84,
        title: "Automatisation",
        subtitle: "Scripts Bash",
        icon: "terminal",
        explanation: "Des scripts Bash automatisent une partie du fonctionnement.",
        related: ["server", "screens"],
      },
      {
        id: "server",
        x: 130,
        y: 206,
        width: 380,
        height: 92,
        title: "Serveur PHP",
        subtitle: "Contenus et diffusion",
        icon: "code",
        explanation: "La partie serveur, qui relie l'interface, les données et les écrans.",
        related: ["interface", "scripts", "database", "screens"],
        core: true,
      },
      {
        id: "database",
        x: 40,
        y: 396,
        width: 260,
        height: 84,
        title: "MySQL",
        subtitle: "Données d'affichage",
        icon: "database",
        explanation: "La base de données du système.",
        related: ["server", "interface"],
      },
      {
        id: "screens",
        x: 340,
        y: 396,
        width: 260,
        height: 84,
        title: "Écrans de l'IUT",
        subtitle: "Affichage dynamique",
        icon: "screen",
        explanation: "Le résultat : les contenus affichés sur les écrans de l'établissement.",
        related: ["server", "interface", "scripts"],
      },
    ],
  },
  {
    id: "digital-phishing",
    title: "Digital Phishing",
    shortTitle: "Digital Phishing",
    summary:
      "Une application métier pour administrer une maison d'édition. Conçue et développée seul.",
    stack: ["C#", ".NET", "MySQL"],
    codeUrl: "https://github.com/r-rimane/DigitalPhishing",
    edges: [
      ["freelancers", "app"],
      ["contracts", "app"],
      ["magazines", "app"],
      ["app", "database"],
    ],
    nodes: [
      {
        id: "freelancers",
        x: 0,
        y: 30,
        width: 196,
        height: 84,
        title: "Pigistes",
        subtitle: "Suivi",
        icon: "user",
        explanation: "Les auteurs de la maison d'édition : ajout, modification et suppression.",
        related: ["app", "database"],
      },
      {
        id: "contracts",
        x: 222,
        y: 30,
        width: 196,
        height: 84,
        title: "Contrats",
        subtitle: "Édition",
        icon: "document",
        explanation:
          "Chaque pigiste peut être lié à un ou plusieurs contrats, pour des magazines précis.",
        related: ["app", "database"],
      },
      {
        id: "magazines",
        x: 444,
        y: 30,
        width: 196,
        height: 84,
        title: "Magazines",
        subtitle: "Publication",
        icon: "book",
        explanation: "La publication des magazines.",
        related: ["app", "database"],
      },
      {
        id: "app",
        x: 110,
        y: 214,
        width: 420,
        height: 92,
        title: "Application C# / .NET",
        subtitle: "Création, lecture, modification, suppression",
        icon: "code",
        explanation: "Une application de bureau qui réunit toute la gestion.",
        related: ["freelancers", "contracts", "magazines", "database"],
        core: true,
      },
      {
        id: "database",
        x: 200,
        y: 396,
        width: 240,
        height: 80,
        title: "MySQL",
        subtitle: "Base locale",
        icon: "database",
        explanation: "Une base MySQL locale conserve l'ensemble des données.",
        related: ["app", "freelancers", "contracts", "magazines"],
      },
    ],
  },
];
