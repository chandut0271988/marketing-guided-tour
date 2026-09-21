import { useLayoutEffect, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";
import { trees } from "../data/trees";

const shades = ["#71856a", "#879474", "#98a180", "#60775f"];

export default function Trees() {
  const canopies = useRef<InstancedMesh>(null);
  const trunks = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!canopies.current || !trunks.current) return;
    const transform = new Object3D();
    trees.forEach((tree, index) => {
      const [x, z] = tree.position;
      const scale = tree.scale;
      transform.position.set(x, 4.1 * scale, z);
      transform.rotation.set(index * 0.3, index * 1.7, 0.1);
      transform.scale.set(2.45 * scale, 2.9 * scale, 2.4 * scale);
      transform.updateMatrix();
      canopies.current!.setMatrixAt(index, transform.matrix);
      canopies.current!.setColorAt(index, new Color(shades[tree.shade]));
      transform.position.set(x, 1.25 * scale, z);
      transform.rotation.set(0, 0, 0);
      transform.scale.set(scale, scale, scale);
      transform.updateMatrix();
      trunks.current!.setMatrixAt(index, transform.matrix);
    });
    for (const mesh of [canopies.current, trunks.current]) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  }, []);
  return (
    <group>
      <instancedMesh
        ref={canopies}
        args={[undefined, undefined, trees.length]}
        castShadow
        receiveShadow
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh ref={trunks} args={[undefined, undefined, trees.length]}>
        <cylinderGeometry args={[0.22, 0.34, 2.5, 5]} />
        <meshStandardMaterial color="#7d7761" roughness={1} />
      </instancedMesh>
    </group>
  );
}
