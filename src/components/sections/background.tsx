import { journey, skills } from "@/content/background";

export function Skills() {
  return (
    <section className="wrap section" id="competences">
      <h2>
        Mes <em>compétences</em>
      </h2>
      <dl className="skills">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <dt>{group}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Journey() {
  return (
    <section className="pale" id="parcours">
      <div className="wrap section">
        <h2>
          Mon <em>parcours</em>
        </h2>
        <ol className="path">
          {journey.map(({ period, title, place, highlight, detail }) => (
            <li key={title}>
              <p className="period">{period}</p>
              <div>
                <h3>{title}</h3>
                <p>{place}</p>
              </div>
              <p>
                {highlight ? (
                  <>
                    <mark>{highlight}</mark>{" "}
                  </>
                ) : null}
                {detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechWatch() {
  return (
    <section className="wrap section duo" id="veille">
      <h2>
        Je reste <em className="line">à jour</em>
      </h2>
      <div>
        <p className="statement">
          Je suis plus de <mark>vingt sources techniques</mark> avec Feedly, dont Next, LeMagIT,
          ZATAZ et Developpez.com. Je trie et je classe ce qui compte dans Notion.
        </p>
        <p>
          Actualité informatique, sécurité web, code et frameworks&nbsp;: j&apos;applique cette
          veille dans mes projets.
        </p>
      </div>
    </section>
  );
}
