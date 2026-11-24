import { BOARD } from "@/components/diagram/geometry";

/**
 * Scène de l'ouverture : trois plans reliés (interface, logique, données).
 * Ils réapparaissent sur le panneau des projets, où leurs points dessinent le premier schéma.
 */
const GRID = 13;
const LAYERS = ["Interface", "Logique", "Données"];
const PLANE = GRID * GRID;
const COUNT = PLANE * LAYERS.length;
const LINKS = [2, 6, 10].flatMap((row) => [2, 6, 10].map((column) => row * GRID + column));
const HOVER_RADIUS = 130;
/** Cadence réduite sur mobile, pour ménager le processeur et la batterie. */
const MOBILE_FRAME_MS = 50;
/** Décalage du panneau fixe sous l'en-tête, en pixels. */
const STICKY_TOP = 101;

type SceneOptions = {
  canvas: HTMLCanvasElement;
  hero: HTMLElement;
  stage: HTMLElement;
  /** Tracés SVG que les points doivent dessiner, dans le repère du schéma. */
  outlines: string[];
};

type Point = { layer: number; u: number; v: number; delay: number };

const points: Point[] = Array.from({ length: COUNT }, (_, index) => {
  const layer = Math.floor(index / PLANE);
  const row = Math.floor((index % PLANE) / GRID);
  const column = index % GRID;
  return {
    layer,
    u: (row / (GRID - 1)) * 2 - 1,
    v: (column / (GRID - 1)) * 2 - 1,
    delay: ((row * 7 + column * 13 + layer * 5) % 17) / 17,
  };
});

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function smooth(start: number, end: number, value: number) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

/** Répartit les points à distance régulière le long de tous les tracés. */
function sampleOutlines(outlines: string[]) {
  const paths = outlines.map((d) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    return path;
  });
  const lengths = paths.map((path) => path.getTotalLength());
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const samples = points.map((_, index) => {
    let distance = (index / COUNT) * total;
    let current = 0;
    while (distance > lengths[current] && current < paths.length - 1) {
      distance -= lengths[current];
      current += 1;
    }
    return paths[current].getPointAtLength(distance);
  });
  // Mélange déterministe : chaque plan se répartit dans tout le schéma.
  return samples.map((_, index) => samples[(index * 131) % COUNT]);
}

export function startScene({ canvas, hero, stage, outlines }: SceneOptions) {
  const context = canvas.getContext("2d");
  const board = stage.querySelector<HTMLElement>(".board");
  if (!context || !board) return () => {};

  const isWide = matchMedia("(min-width: 901px)");
  const isCalm = matchMedia("(prefers-reduced-motion: reduce)");
  const positions = new Float32Array(COUNT * 2);
  const pointer = { x: -999, y: -999, target: 0, tilt: 0 };
  const family = getComputedStyle(document.body).fontFamily;
  let width = 0;
  let height = 0;
  /** Calculées à la première transformation seulement : inutiles sur mobile. */
  let targets: DOMPoint[] | null = null;
  let request = 0;
  let lastDraw = 0;
  let lastProgress = -1;
  let wasVisible = false;
  /** Sur mobile, l'animation ne démarre qu'à la première interaction. */
  let isAwake = isWide.matches;

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    lastDraw = 0;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.target = event.clientX / innerWidth - 0.5;
  };

  /** 0 avant la section projets, 1 quand le premier schéma est en place. */
  const getProgress = () => {
    if (!isWide.matches) return 0;
    const start = innerHeight * 0.85;
    const progress = clamp((start - stage.getBoundingClientRect().top) / (start - STICKY_TOP));
    return isCalm.matches && progress > 0 ? 1 : progress;
  };

  const place = (time: number, progress: number, frame: DOMRect) => {
    const angle = Math.PI / 4 + pointer.tilt * 0.35 + Math.sin(time * 0.22) * 0.07;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const scale = Math.min(frame.width * 0.335, frame.height * 0.42);
    const gap = Math.min(frame.height * 0.25, scale * 0.82);
    const centerX = frame.left + frame.width / 2;
    const centerY = frame.top + frame.height / 2;
    const isHoverable = isWide.matches && !isCalm.matches;

    const goals = progress > 0 ? (targets ??= sampleOutlines(outlines)) : null;

    points.forEach(({ layer, u, v, delay }, index) => {
      const wave = Math.sin(u * 2.3 + time * 0.9 + layer) + Math.cos(v * 2.1 - time * 0.7);
      let x = centerX + (u * cos - v * sin) * scale;
      let y =
        centerY + (u * sin + v * cos) * scale * 0.46 + (layer - 1) * gap + wave * scale * 0.034;
      if (isHoverable) {
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        if (distance < HOVER_RADIUS) y -= (1 - distance / HOVER_RADIUS) ** 2 * 30;
      }
      if (goals) {
        const ease = smooth(0.2 + delay * 0.2, 0.7 + delay * 0.2, progress);
        const target = goals[index];
        x += (frame.left + (target.x / BOARD.width) * frame.width - x) * ease;
        y += (frame.top + (target.y / BOARD.height) * frame.height - y) * ease;
      }
      positions[index * 2] = x;
      positions[index * 2 + 1] = y;
    });
  };

  const moveTo = (index: number) => context.moveTo(positions[index * 2], positions[index * 2 + 1]);
  const lineTo = (index: number) => context.lineTo(positions[index * 2], positions[index * 2 + 1]);
  /** Ajoute un point au tracé en cours : tous les points d'une couleur se remplissent d'un coup. */
  const addDot = (x: number, y: number, radius: number) => {
    context.moveTo(x + radius, y);
    context.arc(x, y, radius, 0, Math.PI * 2);
  };

  const drawPlane = (layer: number, isDark: boolean) => {
    const first = layer * PLANE;
    const isCore = layer === 1;
    context.beginPath();
    moveTo(first);
    lineTo(first + (GRID - 1) * GRID);
    lineTo(first + PLANE - 1);
    lineTo(first + GRID - 1);
    context.closePath();
    const plain = isDark ? "rgba(20,45,36,.75)" : "rgba(255,255,255,.72)";
    context.fillStyle = isCore ? `rgba(23,152,109,${isDark ? 0.3 : 0.14})` : plain;
    context.fill();

    context.beginPath();
    for (let offset = 0; offset < PLANE; offset += 1) {
      const index = first + offset;
      if (offset % GRID < GRID - 1) {
        moveTo(index);
        lineTo(index + 1);
      }
      if (offset < PLANE - GRID) {
        moveTo(index);
        lineTo(index + GRID);
      }
    }
    const light = isCore ? "rgba(11,122,85,.5)" : "rgba(34,84,66,.26)";
    context.strokeStyle = isDark ? "rgba(95,224,176,.32)" : light;
    context.lineWidth = 1;
    context.stroke();
  };

  /** Liaisons entre un plan et celui du dessus, avec un point qui circule. */
  const drawLinks = (layer: number, time: number, isDark: boolean) => {
    context.beginPath();
    LINKS.forEach((cell) => {
      moveTo((layer - 1) * PLANE + cell);
      lineTo(layer * PLANE + cell);
    });
    context.strokeStyle = "rgba(11,122,85,.3)";
    context.stroke();

    context.beginPath();
    LINKS.forEach((cell, order) => {
      const from = ((layer - 1) * PLANE + cell) * 2;
      const to = (layer * PLANE + cell) * 2;
      const t = (time * 0.32 + order * 0.23 + layer * 0.4) % 1;
      addDot(
        positions[from] + (positions[to] - positions[from]) * t,
        positions[from + 1] + (positions[to + 1] - positions[from + 1]) * t,
        3,
      );
    });
    context.fillStyle = isDark ? "#5fe0b0" : "#0b7a55";
    context.fill();
  };

  const drawPlanes = (time: number, opacity: number, isDark: boolean) => {
    context.globalAlpha = opacity;
    for (let layer = LAYERS.length - 1; layer >= 0; layer -= 1) {
      drawPlane(layer, isDark);
      if (layer > 0) drawLinks(layer, time, isDark);
    }
    context.font = `600 15px ${family}`;
    context.textAlign = "right";
    context.fillStyle = isDark ? "#fff" : "#0b1613";
    LAYERS.forEach((label, layer) => {
      const corner = (layer * PLANE + (GRID - 1) * GRID) * 2;
      context.fillText(label, positions[corner] + 8, positions[corner + 1] - 36);
    });
  };

  const drawPoints = (opacity: number, isDark: boolean) => {
    context.globalAlpha = opacity;
    LAYERS.forEach((_, layer) => {
      const isCore = layer === 1;
      context.beginPath();
      for (let index = layer * PLANE; index < (layer + 1) * PLANE; index += 1) {
        addDot(positions[index * 2], positions[index * 2 + 1], isCore ? 2.1 : 1.6);
      }
      context.fillStyle = isDark ? "#5fe0b0" : isCore ? "#0b7a55" : "#0b5c46";
      context.fill();
    });
    context.globalAlpha = 1;
  };

  /** Révèle les cases du schéma à la fin de la transformation ; n'écrit que si la valeur change. */
  const revealBoard = (progress: number) => {
    if (progress === lastProgress) return;
    lastProgress = progress;
    stage.classList.toggle("morph", progress < 1 && isWide.matches);
    stage.style.setProperty("--in", String(smooth(0.84, 1, progress)));
  };

  const draw = (now: number) => {
    // Toutes les lectures de mise en page d'abord, les écritures ensuite.
    const progress = getProgress();
    const isDark = progress > 0;
    const heroFrame = hero.getBoundingClientRect();
    const frame = isDark ? board.getBoundingClientRect() : heroFrame;
    const origin = canvas.getBoundingClientRect();
    revealBoard(progress);

    const isVisible = progress < 1 && (isDark || heroFrame.bottom > 0);
    if (isVisible || wasVisible) context.clearRect(0, 0, width, height);
    wasVisible = isVisible;
    if (!isVisible) return;

    const time = isCalm.matches ? 0 : now / 1000;
    const entrance = isDark ? smooth(0, 0.08, progress) : 1;
    const planes = isDark ? entrance * (1 - smooth(0.18, 0.42, progress)) : 1;
    pointer.tilt += (pointer.target - pointer.tilt) * 0.05;
    place(time, progress, frame);
    context.save();
    context.translate(-origin.left, -origin.top);
    if (planes > 0) drawPlanes(time, planes, isDark);
    drawPoints(isDark ? entrance * (1 - smooth(0.9, 1, progress)) : 1, isDark);
    context.restore();
  };

  const wake = () => {
    isAwake = true;
  };

  const loop = (now: number) => {
    request = requestAnimationFrame(loop);
    if (lastDraw > 0 && !isAwake) return;
    if (!isWide.matches && now - lastDraw < MOBILE_FRAME_MS) return;
    lastDraw = now;
    draw(now);
  };

  resize();
  request = requestAnimationFrame(loop);
  // Les étiquettes sont redessinées une fois la police chargée.
  document.fonts.ready.then(() => {
    lastDraw = 0;
  });
  addEventListener("resize", resize);
  addEventListener("pointermove", onPointerMove, { passive: true });
  addEventListener("scroll", wake, { passive: true, once: true });
  addEventListener("touchstart", wake, { passive: true, once: true });

  return () => {
    cancelAnimationFrame(request);
    removeEventListener("resize", resize);
    removeEventListener("pointermove", onPointerMove);
    removeEventListener("scroll", wake);
    removeEventListener("touchstart", wake);
  };
}
