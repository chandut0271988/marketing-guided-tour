import type { ViewMode } from "../types/community";
import Icon from "./Icon";

export default function Toolbar({
  view,
  onView,
  showLabels,
  onToggleLabels,
  onReset,
  onZoom,
}: {
  view: ViewMode;
  onView: (view: ViewMode) => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  onReset: () => void;
  onZoom: (amount: number) => void;
}) {
  return (
    <>
      <div className="view-switch" role="group" aria-label="Camera view">
        <button
          aria-pressed={view === "aerial"}
          onClick={() => onView("aerial")}
        >
          <Icon name="orbit" size={17} />
          <span>3D overview</span>
        </button>
        <button aria-pressed={view === "plan"} onClick={() => onView("plan")}>
          <Icon name="plan" size={17} />
          <span>Plan view</span>
        </button>
      </div>
      <div
        className="scene-tools"
        role="group"
        aria-label="Masterplan controls"
      >
        <button
          className="reset-button"
          onClick={onReset}
          title="Reset view (R)"
        >
          <Icon name="reset" size={18} />
          <span>Reset view</span>
        </button>
        <span className="tool-divider" />
        <button
          className="icon-button"
          onClick={() => onZoom(45)}
          aria-label="Zoom in"
          title="Zoom in (+)"
        >
          <Icon name="plus" size={19} />
        </button>
        <button
          className="icon-button"
          onClick={() => onZoom(-45)}
          aria-label="Zoom out"
          title="Zoom out (-)"
        >
          <Icon name="minus" size={19} />
        </button>
        <span className="tool-divider" />
        <button
          className="icon-button label-toggle"
          aria-label="Show building and landscape labels"
          aria-pressed={showLabels}
          onClick={onToggleLabels}
          title="Toggle labels"
        >
          <Icon name="labels" size={18} />
        </button>
      </div>
    </>
  );
}
