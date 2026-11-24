/** Identité, liens et navigation. */
export const profile = {
  name: "Rayan Rimane",
  role: "développeur web et logiciel",
  email: "rayan.rimane71@gmail.com",
  linkedin: "https://linkedin.com/in/rayan-rimane",
  github: "https://github.com/r-rimane",
  city: "Mâcon",
  url: "https://r-rimane.github.io",
  description:
    "Rayan Rimane, développeur web et logiciel à Mâcon. Disponible en CDD, et en alternance à partir de septembre 2027.",
  /** Chemin du PDF dans public/. Tant qu'il est nul, le bouton CV n'est pas affiché. */
  cv: "/CV_Rayan_Rimane_Developpeur.pdf" as string | null,
};

export const navigation = [
  { href: "#a-propos", label: "À propos" },
  { href: "#recherche", label: "Ma recherche" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#parcours", label: "Parcours" },
];

/** Informations pratiques attendues par un recruteur. */
export const practical = [
  { label: "Mobilité", value: "Partout en France" },
  { label: "Transport", value: "Permis B et voiture" },
  { label: "Anglais", value: "Courant, niveau C1" },
];

/** Frise de l'ouverture, dans l'ordre chronologique. */
export const milestones: { date: string; title: string; state: "done" | "now" | "next" }[] = [
  { date: "2023", title: "Baccalauréat, mention Bien", state: "done" },
  { date: "2026", title: "BTS SIO obtenu", state: "done" },
  { date: "Aujourd'hui", title: "Disponible en CDD", state: "now" },
  { date: "Septembre 2027", title: "Alternance en développement", state: "next" },
];
