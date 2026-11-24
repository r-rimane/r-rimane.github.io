"use client";

import { useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { BOARD, getWires } from "./geometry";
import { Icon } from "./icon";

type DiagramProps = { project: Project; className?: string };

/** Schéma explorable : survoler, toucher ou sélectionner une case éclaire son parcours. */
export function Diagram({ project, className = "" }: DiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = project.nodes.find((node) => node.id === activeId);
  const lit = new Set(active ? [active.id, ...active.related] : []);

  return (
    <figure className={`flow ${className}`}>
      <div className="fit">
        <div
          className={`board ${active ? "live" : ""}`}
          role="group"
          aria-label={`Schéma de ${project.title}`}
          onMouseLeave={() => setActiveId(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setActiveId(null);
          }}
        >
          <svg className="wires" viewBox={`0 0 ${BOARD.width} ${BOARD.height}`} aria-hidden="true">
            {getWires(project).map(({ from, to, path }, index) => (
              <g key={`${from}-${to}`}>
                <path d={path} className={lit.has(from) && lit.has(to) ? "lit" : undefined} />
                <path
                  d={path}
                  className="pulse"
                  pathLength={1}
                  style={{ animationDelay: `${-index * 0.55}s` }}
                />
              </g>
            ))}
          </svg>
          {project.nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`node ${node.core ? "core" : ""} ${lit.has(node.id) ? "lit" : ""}`}
              style={
                {
                  "--x": node.x,
                  "--y": node.y,
                  "--w": node.width,
                  "--h": node.height,
                } as CSSProperties
              }
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
            >
              <Icon name={node.icon} />
              <span>
                <b>{node.title}</b>
                <small>{node.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <figcaption aria-live="polite">
        {active ? (
          <>
            <b>{active.title}.</b> {active.explanation}
          </>
        ) : (
          "Choisissez un élément pour suivre son parcours."
        )}
      </figcaption>
    </figure>
  );
}
