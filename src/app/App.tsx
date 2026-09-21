import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { wings } from "../data/wings";
import type { CameraCommand, ViewMode, WingId } from "../types/community";
import PropertyPanel from "../ui/PropertyPanel";
import SceneBoundary from "../ui/SceneBoundary";
import Toolbar from "../ui/Toolbar";
import TopBar from "../ui/TopBar";

const CommunityScene = lazy(() => import("../scene/CommunityScene"));

export default function App() {
  const [selectedId, setSelectedId] = useState<WingId | null>(null);
  const [view, setView] = useState<ViewMode>("aerial");
  const [showLabels, setShowLabels] = useState(true);
  const [panelExpanded, setPanelExpanded] = useState(false);
  const sequence = useRef(0);
  const [command, setCommand] = useState<CameraCommand>({
    type: "overview",
    view: "aerial",
    key: 0,
  });
  const selected = wings.find((wing) => wing.id === selectedId);

  const selectWing = useCallback(
    (id: WingId) => {
      setSelectedId(id);
      setCommand({ type: "wing", id, view, key: ++sequence.current });
    },
    [view],
  );
  const reset = useCallback(() => {
    setSelectedId(null);
    setCommand({ type: "overview", view, key: ++sequence.current });
  }, [view]);
  const changeView = (nextView: ViewMode) => {
    setView(nextView);
    setSelectedId(null);
    setCommand({ type: "overview", view: nextView, key: ++sequence.current });
  };
  const zoom = (amount: number) =>
    setCommand({ type: "zoom", amount, key: ++sequence.current });

  return (
    <div className="app-shell">
      <TopBar />
      <main className="experience">
        <PropertyPanel
          selected={selected}
          onSelect={selectWing}
          onReset={reset}
          expanded={panelExpanded}
          onToggle={() => setPanelExpanded((value) => !value)}
        />
        <section
          className="scene-stage"
          aria-label="Explore the masterplan"
          aria-describedby="camera-instructions"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "+" || event.key === "=") zoom(45);
            else if (event.key === "-") zoom(-45);
            else if (event.key.toLowerCase() === "r") reset();
            else if (event.key.startsWith("Arrow"))
              setCommand({
                type: "orbit",
                azimuth:
                  event.key === "ArrowLeft"
                    ? -0.18
                    : event.key === "ArrowRight"
                      ? 0.18
                      : 0,
                polar:
                  event.key === "ArrowUp"
                    ? -0.12
                    : event.key === "ArrowDown"
                      ? 0.12
                      : 0,
                key: ++sequence.current,
              });
            else return;
            event.preventDefault();
          }}
        >
          <div className="canvas-container">
            <SceneBoundary>
              <Suspense
                fallback={
                  <div className="scene-message" role="status">
                    <span className="loading-symbol" />
                    <p>Preparing your perspective…</p>
                  </div>
                }
              >
                <CommunityScene
                  command={command}
                  selectedId={selectedId}
                  showLabels={showLabels}
                  onSelect={selectWing}
                />
              </Suspense>
            </SceneBoundary>
          </div>
          <Toolbar
            view={view}
            onView={changeView}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels((value) => !value)}
            onReset={reset}
            onZoom={zoom}
          />
          <div className="view-caption">
            <span className="caption-line" />
            <span>
              {selected
                ? `WING ${selected.id}`
                : view === "aerial"
                  ? "THE WHOLE PICTURE"
                  : "THE SITE, FROM ABOVE"}
              <small>
                {selected
                  ? `${selected.floors} residential floors + ground`
                  : "Schematic community model"}
              </small>
            </span>
          </div>
          <p id="camera-instructions" className="camera-instructions">
            <span className="desktop-instructions">
              Drag to orbit <i /> Scroll to zoom
            </span>
            <span className="touch-instructions">
              Drag to orbit <i /> Pinch to zoom
            </span>
            <span className="sr-only">
              . Keyboard: focus the scene and use arrow keys to orbit, plus and
              minus to zoom, R to reset. Select wings using the numbered
              buttons.
            </span>
          </p>
        </section>
      </main>
      <footer className="footer">
        <span>
          <span className="status-dot" /> SCHEMATIC VISUALIZATION <i>·</i> NOT
          TO SCALE
        </span>
        <span className="footer-right">
          Twelve wings. One connected community.
        </span>
      </footer>
    </div>
  );
}
