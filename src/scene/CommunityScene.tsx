import { Canvas } from "@react-three/fiber";
import { PCFShadowMap } from "three";
import { wings } from "../data/wings";
import type { CameraCommand, WingId } from "../types/community";
import Wing from "../components/Wing";
import CameraController from "./CameraController";
import Ground from "./Ground";
import Landscape from "./Landscape";
import Lighting from "./Lighting";

export default function CommunityScene({
  command,
  selectedId,
  showLabels,
  onSelect,
}: {
  command: CameraCommand;
  selectedId: WingId | null;
  showLabels: boolean;
  onSelect: (id: WingId) => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      shadows={{ type: PCFShadowMap }}
      camera={{ position: [250, 350, 360], fov: 38, near: 1, far: 2200 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      aria-label="Interactive schematic 3D apartment community with 12 wings, central gardens, forestscape and a southern water feature"
    >
      <color attach="background" args={["#eeeee6"]} />
      <Lighting />
      <Ground />
      <Landscape showLabels={showLabels} />
      {wings.map((wing) => (
        <Wing
          key={wing.id}
          wing={wing}
          selected={selectedId === wing.id}
          showLabel={showLabels}
          onSelect={onSelect}
        />
      ))}
      <CameraController command={command} />
    </Canvas>
  );
}
