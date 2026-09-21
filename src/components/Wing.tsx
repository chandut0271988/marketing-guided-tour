import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCursor, useGLTF } from "@react-three/drei";
import { Box3, InstancedMesh, Object3D, Vector3 } from "three";
import { wingHeight } from "../data/wings";
import type { WingData, WingId } from "../types/community";
import BuildingLabel from "./BuildingLabel";

function FloorBands({ wing }: { wing: WingData }) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    for (let floor = 0; floor <= wing.floors; floor++) {
      transform.position.set(
        0,
        wing.groundHeight + floor * wing.heightPerFloor,
        0,
      );
      transform.updateMatrix();
      mesh.current.setMatrixAt(floor, transform.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [wing]);
  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, wing.floors + 1]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[wing.width + 0.65, 0.22, wing.depth + 0.65]} />
      <meshStandardMaterial color="#eeeae0" roughness={0.8} />
    </instancedMesh>
  );
}

function ProceduralWing({ wing, active }: { wing: WingData; active: boolean }) {
  const height = wingHeight(wing);
  const bodyHeight = height - wing.groundHeight;
  return (
    <group>
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[wing.width + 2.4, 0.7, wing.depth + 2.4]} />
        <meshStandardMaterial color={active ? "#a7b7a0" : "#d6d2c5"} />
      </mesh>
      <mesh position={[0, wing.groundHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[wing.width - 0.9, wing.groundHeight, wing.depth - 0.9]}
        />
        <meshStandardMaterial color="#898f83" roughness={0.9} />
      </mesh>
      <mesh
        position={[0, wing.groundHeight + bodyHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[wing.width, bodyHeight, wing.depth]} />
        <meshStandardMaterial
          color={active ? "#becbb1" : wing.facade}
          roughness={0.85}
        />
      </mesh>
      <FloorBands wing={wing} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * (wing.width / 2 + 0.38), height / 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.75, height, wing.depth * 0.24]} />
            <meshStandardMaterial
              color={active ? "#839b7a" : "#e0ded3"}
              roughness={0.9}
            />
          </mesh>
          <mesh
            position={[
              0,
              wing.groundHeight + bodyHeight / 2,
              side * (wing.depth / 2 + 0.08),
            ]}
          >
            <boxGeometry args={[wing.width * 0.24, bodyHeight, 0.2]} />
            <meshStandardMaterial color="#a4afa7" roughness={0.7} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, height + 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[wing.width + 1.1, 0.7, wing.depth + 1.1]} />
        <meshStandardMaterial
          color={active ? "#d6e0ca" : "#f1eee4"}
          roughness={0.85}
        />
      </mesh>
      <mesh position={[0, height + 0.74, 0]} receiveShadow>
        <boxGeometry args={[wing.width - 1.5, 0.12, wing.depth - 1.5]} />
        <meshStandardMaterial color="#c3c3b5" roughness={1} />
      </mesh>
      <mesh position={[0, height + 1.5, -wing.depth * 0.16]} castShadow>
        <boxGeometry args={[wing.width * 0.4, 1.6, wing.depth * 0.3]} />
        <meshStandardMaterial color="#e3e1d7" roughness={1} />
      </mesh>
    </group>
  );
}

// The interaction wrapper is shared by procedural and future normalized GLB assets.
function ModelWing({ url, wing }: { url: string; wing: WingData }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    clone.scale.set(
      wing.width / (size.x || 1),
      wingHeight(wing) / (size.y || 1),
      wing.depth / (size.z || 1),
    );
    clone.position.set(
      -center.x * clone.scale.x,
      -box.min.y * clone.scale.y,
      -center.z * clone.scale.z,
    );
    return clone;
  }, [scene, wing]);
  return <primitive object={model} />;
}

export default function Wing({
  wing,
  selected,
  showLabel,
  onSelect,
}: {
  wing: WingData;
  selected: boolean;
  showLabel: boolean;
  onSelect: (id: WingId) => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );
  return (
    <group
      position={wing.position}
      rotation={[0, wing.rotation, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        if (event.delta < 5) onSelect(wing.id);
      }}
    >
      {wing.modelUrl ? (
        <Suspense
          fallback={<ProceduralWing wing={wing} active={selected || hovered} />}
        >
          <ModelWing url={wing.modelUrl} wing={wing} />
        </Suspense>
      ) : (
        <ProceduralWing wing={wing} active={selected || hovered} />
      )}
      {(showLabel || selected) && (
        <BuildingLabel
          id={wing.id}
          height={wingHeight(wing)}
          selected={selected}
          onSelect={onSelect}
        />
      )}
    </group>
  );
}
