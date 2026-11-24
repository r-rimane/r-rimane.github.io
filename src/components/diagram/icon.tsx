const paths = {
  user: "M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c1-5 4-7 8-7s7 2 8 7",
  building: "M4 21V5l9-2v18M13 9l7 2v10M2 21h20M8 8v1M8 12v1M8 16v1",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  database: "M4 5c0-4 16-4 16 0s-16 4-16 0v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4",
  screen: "M3 4h18v12H3zM8 21h8M12 16v5",
  terminal: "M3 4h18v16H3zM7 9l3 3-3 3M13 15h4",
  document: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  book: "M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
