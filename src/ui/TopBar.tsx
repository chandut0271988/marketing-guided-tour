import { site } from "../data/site";
import Icon from "./Icon";

export default function TopBar() {
  return (
    <header className="top-bar">
      <a className="brand" href="/" aria-label="The Community home">
        <span className="brand-mark">
          <Icon name="building" size={25} />
        </span>
        <span>
          <strong>THE COMMUNITY</strong>
          <small>A little closer to nature.</small>
        </span>
      </a>
      <div className="header-caption">
        <span className="status-dot" /> INTERACTIVE MASTERPLAN
      </div>
      <dl className="site-stats">
        <div>
          <dt>Acres</dt>
          <dd>{site.areaAcres}</dd>
        </div>
        <div>
          <dt>Residences</dt>
          <dd>{site.residences}</dd>
        </div>
        <div>
          <dt>Wings</dt>
          <dd>{site.wingCount}</dd>
        </div>
      </dl>
    </header>
  );
}
