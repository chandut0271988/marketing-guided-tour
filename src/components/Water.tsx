import { site } from "../data/site";
import { PlanSurface } from "./PlanSurface";
import { Route } from "./Road";

export default function Water() {
  return (
    <group>
      <Route
        id="water-edge"
        points={site.water}
        width={1.4}
        closed
        smooth={false}
        color="#c7c6ac"
        elevation={0.12}
      />
      <PlanSurface
        points={site.water}
        color="#6e9fa1"
        elevation={0.15}
        roughness={0.38}
      />
      {[0, 1, 2, 3].map((index) => (
        <Route
          key={index}
          id={`water-ripple-${index}`}
          points={[
            [45 + index * 2.6, 95 - index * 5],
            [49 + index * 2.6, 91 - index * 5],
          ]}
          width={0.15}
          color="#a6c0b9"
          elevation={0.17}
        />
      ))}
    </group>
  );
}
