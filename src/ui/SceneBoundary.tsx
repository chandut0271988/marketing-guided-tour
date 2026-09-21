import { Component, type ReactNode } from "react";

export default class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="scene-message" role="alert">
          <h2>The 3D view couldn’t load.</h2>
          <p>
            Use the wing directory to browse the community, or reload to try
            again.
          </p>
          <button onClick={() => window.location.reload()}>
            Reload 3D view
          </button>
        </div>
      );
    return this.props.children;
  }
}
