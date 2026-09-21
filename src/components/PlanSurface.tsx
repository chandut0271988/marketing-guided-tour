import { useMemo } from "react";
import { planShape } from "../scene/geometry";
import type { Point2 } from "../types/community";

export function PlanSurface({
  points,
  color,
  elevation = 0.05,
  roughness = 1,
}: {
  points: readonly Point2[];
  color: string;
  elevation?: number;
  roughness?: number;
}) {
  const shape = useMemo(() => planShape(points), [points]);
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, elevation, 0]}
      receiveShadow
    >
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}
