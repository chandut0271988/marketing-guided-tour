import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Box3, MathUtils, PerspectiveCamera, Vector3 } from "three";
import { site } from "../data/site";
import { wingHeight, wings } from "../data/wings";
import type { CameraCommand } from "../types/community";

const aerialDirection = new Vector3(0.7, 1.8, 1.1).normalize();
const planDirection = new Vector3(0, 1, 0.001).normalize();

function boxCorners(box: Box3) {
  const corners: Vector3[] = [];
  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z])
        corners.push(new Vector3(x, y, z));
    }
  }
  return corners;
}

const overviewPoints = [
  ...site.boundary.map(([x, z]) => new Vector3(x, 0, z)),
  ...site.contextRoads.flatMap((road) =>
    road.points.flatMap(([x, z]) => [
      new Vector3(x - road.width / 2, -2.4, z - road.width / 2),
      new Vector3(x + road.width / 2, -2.4, z + road.width / 2),
    ]),
  ),
  ...wings.flatMap((wing) =>
    boxCorners(
      new Box3(
        new Vector3(
          wing.position[0] - wing.width / 2 - 1.5,
          0,
          wing.position[2] - wing.depth / 2 - 1.5,
        ),
        new Vector3(
          wing.position[0] + wing.width / 2 + 1.5,
          wingHeight(wing) + 6,
          wing.position[2] + wing.depth / 2 + 1.5,
        ),
      ),
    ),
  ),
];

export default function CameraController({
  command,
}: {
  command: CameraCommand;
}) {
  const controls = useRef<CameraControls>(null);
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const size = useThree((state) => state.size);
  const initialized = useRef(false);
  const lastView = useRef<
    Extract<CameraCommand, { type: "overview" | "wing" }>
  >({ type: "overview", view: "aerial", key: 0 });
  const lastCommandKey = useRef(-1);

  useEffect(() => {
    const controller = controls.current;
    if (!controller) return;
    controller.setBoundary(
      new Box3(
        new Vector3(...site.cameraBounds.min),
        new Vector3(...site.cameraBounds.max),
      ),
    );
    controller.boundaryEnclosesCamera = false;
    const isNewCommand = command.key !== lastCommandKey.current;
    lastCommandKey.current = command.key;
    if (isNewCommand && command.type === "zoom") {
      void controller.dolly(command.amount, true);
      return;
    }
    if (isNewCommand && command.type === "orbit") {
      void controller.rotate(command.azimuth, command.polar, true);
      return;
    }
    if (command.type === "overview" || command.type === "wing")
      lastView.current = command;
    const current = lastView.current;
    const wing =
      current.type === "wing"
        ? wings.find((item) => item.id === current.id)
        : undefined;
    const points = wing
      ? boxCorners(
          new Box3(
            new Vector3(
              wing.position[0] - wing.width,
              0,
              wing.position[2] - wing.depth * 0.8,
            ),
            new Vector3(
              wing.position[0] + wing.width,
              wingHeight(wing) + 6,
              wing.position[2] + wing.depth * 0.8,
            ),
          ),
        )
      : overviewPoints;
    const target = new Box3().setFromPoints(points).getCenter(new Vector3());
    const direction = current.view === "plan" ? planDirection : aerialDirection;
    const right = new Vector3(0, 1, 0).cross(direction).normalize();
    const up = direction.clone().cross(right).normalize();
    const horizontal = points.map((point) =>
      point.clone().sub(target).dot(right),
    );
    const vertical = points.map((point) => point.clone().sub(target).dot(up));
    target.addScaledVector(
      right,
      (Math.min(...horizontal) + Math.max(...horizontal)) / 2,
    );
    target.addScaledVector(
      up,
      (Math.min(...vertical) + Math.max(...vertical)) / 2,
    );
    const tangent = Math.tan(MathUtils.degToRad(camera.fov / 2));
    const aspect = size.width / size.height;
    let distance = 0;
    // Fit the actual irregular site silhouette instead of an oversized bounding box.
    for (const point of points) {
      const offset = point.clone().sub(target);
      const depth = offset.dot(direction);
      distance = Math.max(
        distance,
        depth + Math.abs(offset.dot(right)) / (tangent * aspect * 0.9),
        depth + Math.abs(offset.dot(up)) / (tangent * 0.88),
      );
    }
    const position = direction.clone().multiplyScalar(distance).add(target);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    void controller.setLookAt(
      position.x,
      position.y,
      position.z,
      target.x,
      target.y,
      target.z,
      initialized.current && !reducedMotion,
    );
    initialized.current = true;
  }, [command, camera, size.width, size.height]);

  return (
    <CameraControls
      ref={controls}
      makeDefault
      minDistance={40}
      maxDistance={1200}
      minPolarAngle={0.001}
      maxPolarAngle={Math.PI * 0.46}
      smoothTime={0.7}
      draggingSmoothTime={0.15}
      dollySpeed={0.65}
      truckSpeed={0.5}
      onControlStart={() => {
        void controls.current?.stop();
      }}
    />
  );
}
