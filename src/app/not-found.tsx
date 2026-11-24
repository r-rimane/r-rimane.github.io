import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="wrap section flex min-h-svh flex-col items-start justify-center gap-8">
      <h1>
        Page <em>introuvable</em>
      </h1>
      <p>Cette adresse n&apos;existe pas, ou n&apos;existe plus.</p>
      <ButtonLink href="/">Revenir à l&apos;accueil</ButtonLink>
    </main>
  );
}
