import { useEffect, useRef } from "react";
import type { ShowcaseState } from "../showcase-state";
import { createLivingScene, type SceneHandle } from "../three/living-scene";
export default function SpatialScene({
  state,
  onReady,
  onError,
  theme = "glass",
}: {
  state: ShowcaseState;
  onReady: () => void;
  onError: () => void;
  theme?: "glass" | "atelier";
}) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<SceneHandle | null>(null);
  const latest = useRef(state);
  latest.current = state;
  const callbacks = useRef({ onReady, onError });
  callbacks.current = { onReady, onError };
  useEffect(() => {
    if (!host.current) return;
    let active = true;
    let handle: SceneHandle | null = null;
    try {
      handle = createLivingScene(
        host.current,
        latest.current,
        () => {
          if (active) callbacks.current.onReady();
        },
        () => {
          if (active) callbacks.current.onError();
        },
        theme,
      );
      scene.current = handle;
    } catch {
      callbacks.current.onError();
    }
    return () => {
      active = false;
      handle?.dispose();
      if (scene.current === handle) scene.current = null;
    };
  }, [theme]);
  useEffect(() => scene.current?.update(state), [state]);
  return (
    <div
      className="spatial-canvas"
      ref={host}
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
