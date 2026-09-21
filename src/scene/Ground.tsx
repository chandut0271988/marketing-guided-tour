import { useMemo } from "react";
import { site } from "../data/site";
import { planShape } from "./geometry";
import Road, { Route } from "../components/Road";
import { PlanSurface } from "../components/PlanSurface";

export default function Ground() {
  const boundaryShape = useMemo(() => planShape(site.boundary), []);
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.6, 0]}
        receiveShadow
      >
        <planeGeometry args={[2000, 2000]} />
        <shadowMaterial transparent opacity={0.13} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
        castShadow
      >
        <extrudeGeometry
          args={[boundaryShape, { depth: 2, bevelEnabled: false, steps: 1 }]}
        />
        <meshStandardMaterial color="#cdcbbb" roughness={1} />
      </mesh>
      <PlanSurface points={site.boundary} color="#b6bba0" />
      <Route
        id="boundary"
        points={site.boundary}
        width={0.55}
        color="#e9e4d6"
        closed
        smooth={false}
        elevation={0.1}
      />
      {site.contextRoads.map((road) => (
        <Route key={road.id} {...road} color="#b8b9b0" elevation={-2.4} />
      ))}
      {Array.from({ length: 26 }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-79, -2.35, -113 + i * 8.6]}
        >
          <planeGeometry args={[0.35, 3.5]} />
          <meshBasicMaterial color="#e4e3d9" />
        </mesh>
      ))}
      {site.roads.map((road) => (
        <Road key={road.id} {...road} />
      ))}
      {site.pavingPads.map((pad) => (
        <mesh
          key={pad.id}
          position={[pad.position[0], pad.position[1], pad.position[2]]}
          receiveShadow
        >
          <boxGeometry args={[pad.size[0], pad.size[1], pad.size[2]]} />
          <meshStandardMaterial color="#d8d4c6" />
        </mesh>
      ))}
    </group>
  );
}
