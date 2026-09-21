import { Html } from "@react-three/drei";
import type { WingId } from "../types/community";

export default function BuildingLabel({
  id,
  height,
  selected,
  onSelect,
}: {
  id: WingId;
  height: number;
  selected: boolean;
  onSelect: (id: WingId) => void;
}) {
  return (
    <Html position={[0, height + 2, 0]} center zIndexRange={[20, 5]}>
      <button
        className={`building-label${selected ? " is-selected" : ""}`}
        aria-label={`Select Wing ${id}`}
        aria-pressed={selected}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(id);
        }}
      >
        {id}
      </button>
    </Html>
  );
}
