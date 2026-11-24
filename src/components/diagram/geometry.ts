import type { DiagramNode, Project } from "@/content/projects";

export const BOARD = { width: 640, height: 500 };

/** Courbe qui descend du bas de la première case au haut de la seconde. */
function curve(from: DiagramNode, to: DiagramNode) {
  const x1 = from.x + from.width / 2;
  const y1 = from.y + from.height;
  const x2 = to.x + to.width / 2;
  const middle = (y1 + to.y) / 2;
  return `M${x1} ${y1}C${x1} ${middle} ${x2} ${middle} ${x2} ${to.y}`;
}

export function getWires({ nodes, edges }: Project) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return edges.flatMap(([from, to]) => {
    const start = byId.get(from);
    const end = byId.get(to);
    return start && end ? [{ from, to, path: curve(start, end) }] : [];
  });
}

/** Contours des cases et tracés d'un schéma, pour y répartir des points. */
export function getOutlines(project: Project) {
  const boxes = project.nodes.map(
    ({ x, y, width, height }) => `M${x} ${y}h${width}v${height}h${-width}z`,
  );
  return [...boxes, ...getWires(project).map((wire) => wire.path)];
}
