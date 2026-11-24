import { practical } from "@/content/profile";

export function Search() {
  return (
    <section className="search" id="recherche">
      <div className="wrap section">
        <div className="intro">
          <h2>
            Ce que <em className="line">je recherche</em>
          </h2>
          <p>Un premier poste maintenant, puis une formation en alternance.</p>
        </div>
        <div className="offers">
          <article className="offer">
            <p className="when">Dès maintenant</p>
            <h3>CDD, développeur junior</h3>
            <p>Développement web ou logiciel, côté serveur, côté interface, ou les deux.</p>
          </article>
          <article className="offer deep">
            <p className="when">Septembre 2027</p>
            <h3>Alternance en développement</h3>
            <p>Web ou logiciel. Une rentrée décalée en janvier ou février est aussi possible.</p>
          </article>
        </div>
        <dl className="practical">
          {practical.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="needs">
          <h3>Dans une équipe, j&apos;aimerais</h3>
          <ul>
            <li>
              Travailler sur une application <em>réellement utilisée</em>
            </li>
            <li>
              Faire relire mon code et <em>apprendre des autres</em>
            </li>
            <li>
              Comprendre <em>le métier</em> derrière la demande
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
