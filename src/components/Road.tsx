import { useEffect, useMemo } from "react";
import { ribbonGeometry } from "../scene/geometry";
import type { RouteData } from "../types/community";

export function Route({
  points,
  width,
  closed,
  color,
  elevation = 0.12,
  smooth = true,
}: RouteData & {
  color: string;
  elevation?: number;
  smooth?: boolean;
}) {
  const geometry = useMemo(
    () => ribbonGeometry(points, width, closed, smooth),
    [points, width, closed, smooth],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} position={[0, elevation, 0]} receiveShadow>
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

export default function Road(props: RouteData) {
  return (
    <group>
      <Route
        {...props}
        width={props.width + 1.5}
        color="#e8e2d2"
        elevation={0.12}
      />
      <Route {...props} color="#9b9d94" elevation={0.14} />
    </group>
  );
}
