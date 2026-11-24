"use client";

import { useEffect, useRef } from "react";
import { getOutlines } from "@/components/diagram/geometry";
import { projects } from "@/content/projects";
import { startScene } from "./engine";

/** Calque décoratif plein écran ; l'ouverture et le panneau des projets lui servent de repères. */
export function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = document.querySelector<HTMLElement>("[data-scene='hero']");
    const stage = document.querySelector<HTMLElement>("[data-scene='stage']");
    if (!canvas || !hero || !stage) return;
    // La scène est décorative : elle attend que la page soit lisible et utilisable.
    let stop = () => {};
    const timer = setTimeout(() => {
      stop = startScene({ canvas, hero, stage, outlines: getOutlines(projects[0]) });
    }, 200);
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
