import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "small";
  symbol?: string;
  download?: boolean;
};

/** Lien d'action : un libellé et un bloc symbole qui envahit le bouton au survol. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  symbol = "→",
  download,
}: ButtonLinkProps) {
  return (
    <a href={href} download={download} className={`btn ${variant}`}>
      <span>{children}</span>
      <i aria-hidden="true">{symbol}</i>
    </a>
  );
}
