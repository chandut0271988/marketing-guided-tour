import { Html } from "@react-three/drei";
import { landscapeLabels, site } from "../data/site";
import { PlanSurface } from "../components/PlanSurface";
import { Route } from "../components/Road";
import Trees from "../components/Trees";
import Water from "../components/Water";

export default function Landscape({ showLabels }: { showLabels: boolean }) {
  return (
    <group>
      <PlanSurface points={site.forest} color="#9da98c" elevation={0.08} />
      {site.lawns.map((lawn) => (
        <PlanSurface
          key={lawn.id}
          points={lawn.points}
          color="#b3bd93"
          elevation={0.1}
        />
      ))}
      {site.gardenBeds.map((z, index) => (
        <group key={z}>
          <mesh position={[-22, 0.15, z]} receiveShadow>
            <boxGeometry args={[9, 0.18, 29]} />
            <meshStandardMaterial
              color={index === 1 ? "#d0b99e" : "#95a582"}
              roughness={1}
            />
          </mesh>
          <mesh position={[-26.8, 0.4, z]} receiveShadow>
            <boxGeometry args={[0.6, 0.55, 29]} />
            <meshStandardMaterial color="#7d916e" roughness={1} />
          </mesh>
        </group>
      ))}
      {site.paths.map((path) => (
        <Route key={path.id} {...path} color="#dfd3bc" elevation={0.19} />
      ))}
      <Water />
      <Trees />
      {showLabels &&
        landscapeLabels.map((label) => (
          <Html
            key={label.name}
            position={label.position}
            center
            occlude
            zIndexRange={[4, 0]}
            style={{ pointerEvents: "none" }}
          >
            <span className="landscape-label">{label.name}</span>
          </Html>
        ))}
    </group>
  );
}
