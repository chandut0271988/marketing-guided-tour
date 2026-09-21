import {
  BufferGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  Shape,
  Vector3,
} from "three";
import type { Point2 } from "../types/community";

export function planShape(points: readonly Point2[]) {
  const shape = new Shape();
  points.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  shape.closePath();
  return shape;
}

// A flat ribbon keeps paths inexpensive and avoids overlapping segment seams.
export function ribbonGeometry(
  points: readonly Point2[],
  width: number,
  closed = false,
  smooth = true,
) {
  const controls = points.map(([x, z]) => new Vector3(x, 0, z));
  const curve = new CatmullRomCurve3(controls, closed, "centripetal");
  const samples = smooth
    ? curve.getPoints(Math.max(16, points.length * 10))
    : [...controls, ...(closed ? [controls[0]] : [])];
  const positions: number[] = [];
  const indices: number[] = [];
  samples.forEach((point, index) => {
    const previous =
      samples[index - 1] ?? (closed ? samples[samples.length - 2] : point);
    const next = samples[index + 1] ?? (closed ? samples[1] : point);
    const tangent = next.clone().sub(previous).normalize();
    const normal = new Vector3(-tangent.z, 0, tangent.x).multiplyScalar(
      width / 2,
    );
    positions.push(
      point.x + normal.x,
      0,
      point.z + normal.z,
      point.x - normal.x,
      0,
      point.z - normal.z,
    );
    if (index < samples.length - 1) {
      const i = index * 2;
      indices.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
    }
  });
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
