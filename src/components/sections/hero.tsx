import { ButtonLink } from "@/components/ui/button";
import { milestones, profile } from "@/content/profile";

export function Hero() {
  return (
    <div className="top">
      <section className="wrap hero">
        <div>
          <p className="role">
            {profile.name}, {profile.role} à {profile.city}
          </p>
          <h1>
            Du besoin concret <em className="line">à l&apos;application.</em>
          </h1>
          <p className="lead">
            Je conçois et développe des applications web et logicielles, côté serveur comme côté
            interface. Je cherche <mark>une équipe</mark> où progresser.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <ButtonLink href="#projets">Voir mes projets</ButtonLink>
            {profile.cv ? (
              <ButtonLink href={profile.cv} variant="dark" symbol="↓" download>
                Télécharger mon CV
              </ButtonLink>
            ) : (
              <ButtonLink href="#recherche" variant="dark">
                Ce que je recherche
              </ButtonLink>
            )}
          </div>
        </div>
        <div className="scene" data-scene="hero" aria-hidden="true" />
        <ol className="timeline">
          {milestones.map(({ date, title, state }) => (
            <li key={date} className={state} aria-current={state === "now" ? "step" : undefined}>
              <span>{date}</span>
              <b>{title}</b>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
