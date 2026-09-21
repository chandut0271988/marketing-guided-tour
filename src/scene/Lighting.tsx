export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#fff9ed", "#a6b29b", 1.2]} />
      <directionalLight
        position={[-100, 180, 80]}
        intensity={2.8}
        color="#fff5df"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-180}
        shadow-camera-right={180}
        shadow-camera-top={180}
        shadow-camera-bottom={-180}
        shadow-camera-near={1}
        shadow-camera-far={450}
        shadow-bias={-0.0003}
        shadow-normalBias={0.3}
      />
    </>
  );
}
