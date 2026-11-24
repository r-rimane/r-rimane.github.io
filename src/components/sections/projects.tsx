"use client";

import { useEffect, useRef, useState } from "react";
import { Diagram } from "@/components/diagram/diagram";
import { projects, type Project } from "@/content/projects";

/**
 * Sur grand écran, un panneau fixe montre le schéma du projet en cours de lecture.
 * Sur mobile, chaque schéma est placé dans son projet.
 */
export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Les impulsions des schémas ne tournent que lorsque la section est à l'écran.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("in-view", entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const middle = innerHeight / 2;
      const articles = Array.from(listRef.current?.children ?? []);
      let current = 0;
      articles.forEach((article, index) => {
        const { top, height } = article.getBoundingClientRect();
        if (top < middle) current = index;
        const progress = Math.min(1, Math.max(0, (middle - top) / height));
        const tab = tabsRef.current?.children[index] as HTMLElement | undefined;
        tab?.style.setProperty("--progress", String(progress));
      });
      setActiveIndex(current);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="night" id="projets" data-theme="dark" ref={sectionRef}>
      <div className="wrap section">
        <div className="intro">
          <h2>
            Des projets <em>vus de l&apos;intérieur</em>
          </h2>
          <p>Chaque schéma montre comment l&apos;application fonctionne.</p>
        </div>
        <div className="work">
          <div className="stage" data-scene="stage">
            <nav className="tabs" aria-label="Projets" ref={tabsRef}>
              {projects.map((project, index) => (
                <a
                  key={project.id}
                  href={`#${project.id}`}
                  className={index === activeIndex ? "on" : undefined}
                  aria-current={index === activeIndex || undefined}
                >
                  {project.shortTitle}
                </a>
              ))}
            </nav>
            <div className="boards">
              {projects.map((project, index) => (
                <Diagram
                  key={project.id}
                  project={project}
                  className={index === activeIndex ? "on" : ""}
                />
              ))}
            </div>
          </div>
          <div ref={listRef}>
            {projects.map((project) => (
              <ProjectArticle key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectArticle({ project }: { project: Project }) {
  return (
    <article className="project" id={project.id}>
      <Diagram project={project} className="on inline" />
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <ul className="chips" aria-label="Technologies">
        {project.stack.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      {project.codeUrl ? (
        <a className="code-link" href={project.codeUrl}>
          Voir le code<span className="sr-only"> de {project.title}</span>{" "}
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </article>
  );
}
