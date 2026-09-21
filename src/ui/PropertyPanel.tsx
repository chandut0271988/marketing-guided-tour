import { wings } from "../data/wings";
import type { WingData, WingId } from "../types/community";
import Icon from "./Icon";

export default function PropertyPanel({
  selected,
  onSelect,
  onReset,
  expanded,
  onToggle,
}: {
  selected?: WingData;
  onSelect: (id: WingId) => void;
  onReset: () => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`property-panel${expanded ? " is-expanded" : ""}`}
      aria-label="Community information"
    >
      <div className="intro">
        <div className="eyebrow">
          <span /> A NEW PERSPECTIVE
        </div>
        <h1>
          Room to live.
          <br />
          <em>Space to breathe.</em>
        </h1>
        <p>
          Discover twelve residential wings woven around gardens and a tropical
          forestscape.
        </p>
      </div>
      <button
        className="mobile-panel-toggle"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls="property-content"
      >
        <span>
          <Icon name={selected ? "building" : "leaf"} />
          <strong>
            {selected
              ? `Wing ${selected.id} · ${selected.floors} residential floors`
              : "Explore the community"}
          </strong>
        </span>
        <Icon name="chevron" />
      </button>
      <div id="property-content" className="property-content">
        <section className="wing-picker" aria-labelledby="wing-picker-title">
          <div className="section-heading">
            <h2 id="wing-picker-title">The residences</h2>
            <span>01 — 12</span>
          </div>
          <p className="selection-hint">Choose a wing to take a closer look.</p>
          <div className="wing-grid">
            {wings.map((wing) => (
              <button
                key={wing.id}
                onClick={() => onSelect(wing.id)}
                aria-label={`View Wing ${wing.id}, ${wing.floors} residential floors`}
                aria-pressed={selected?.id === wing.id}
                className={selected?.id === wing.id ? "is-selected" : ""}
              >
                {wing.id}
              </button>
            ))}
          </div>
        </section>
        <div className="selection-info" aria-live="polite" aria-atomic="true">
          {selected ? (
            <section className="wing-details">
              <div className="section-heading">
                <span className="eyebrow">RESIDENTIAL WING</span>
                <button
                  className="icon-button close-selection"
                  onClick={onReset}
                  aria-label="Clear selection and return to overview"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
              <h2>
                Wing {selected.id}
                <span>3 BHK residences</span>
              </h2>
              <p>
                <strong>{selected.floors}</strong> residential floors{" "}
                <span>+ ground</span>
              </p>
              <dl className="apartment-types">
                <div>
                  <dt>Type C</dt>
                  <dd>
                    1,553 <span>sq ft SBA</span>
                  </dd>
                </div>
                <div>
                  <dt>Type D</dt>
                  <dd>
                    1,789 <span>sq ft SBA</span>
                  </dd>
                </div>
              </dl>
            </section>
          ) : (
            <section className="landscape-note">
              <span className="leaf-emblem">
                <Icon name="leaf" size={24} />
              </span>
              <div>
                <h2>Nature at the heart</h2>
                <p>A garden spine, shaded trails and a quiet water edge.</p>
              </div>
            </section>
          )}
        </div>
        <div className="legend" aria-label="Masterplan legend">
          <span>
            <i className="legend-building" />
            Residences
          </span>
          <span>
            <i className="legend-landscape" />
            Landscape
          </span>
          <span>
            <i className="legend-water" />
            Water
          </span>
        </div>
      </div>
      <p className="approximation-note">
        An illustrative interpretation of the masterplan. Building forms and
        landscape are approximate.
      </p>
    </aside>
  );
}
