import { site } from "./site";
import { distanceToRoute, pointInPolygon } from "./planarMath";
import type { Point2 } from "../types/community";

export interface TreeInstance {
  position: Point2;
  scale: number;
  shade: number;
}

// Deterministic placement prevents the landscape changing on rerenders.
let seed = 71;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}

function makeTrees(): TreeInstance[] {
  const result: TreeInstance[] = [];
  const add = (x: number, z: number, scale = 1) =>
    result.push({
      position: [x, z],
      scale: scale * (0.83 + random() * 0.3),
      shade: Math.floor(random() * 4),
    });
  for (let z = -83; z <= 88; z += 13) {
    add(-67, z, 0.9);
    add(-22, z, 0.76);
  }
  for (let x = -53; x <= 11; x += 12) add(x, 100, 1);
  for (let x = -54; x <= 8; x += 13) add(x, -101, 0.9);
  for (let i = 0; i < 1800 && result.length < 125; i++) {
    const point: Point2 = [27 + random() * 104, -85 + random() * 194];
    if (!pointInPolygon(point, site.forest)) continue;
    if (
      pointInPolygon(point, site.water) ||
      distanceToRoute(point, [...site.water, site.water[0]]) < 2.8
    )
      continue;
    if (site.lawns.some((lawn) => pointInPolygon(point, lawn.points))) continue;
    if (site.paths.some((route) => distanceToRoute(point, route.points) < 2.8))
      continue;
    if (
      result.some(
        (tree) =>
          Math.hypot(tree.position[0] - point[0], tree.position[1] - point[1]) <
          4.6,
      )
    )
      continue;
    add(point[0], point[1], 0.85 + random() * 0.45);
  }
  return result;
}

export const trees = makeTrees();
