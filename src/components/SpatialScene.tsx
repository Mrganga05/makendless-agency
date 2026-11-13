import { useEffect, useRef } from "react";
import type { ShowcaseState } from "../showcase-state";
import { createLivingScene, type SceneHandle } from "../three/living-scene";
export default function SpatialScene({
  state,
  onReady,
  onError,
}: {
  state: ShowcaseState;
  onReady: () => void;
  onError: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<SceneHandle | null>(null);
  const latest = useRef(state);
  latest.current = state;
  const callbacks = useRef({ onReady, onError });
  callbacks.current = { onReady, onError };
  useEffect(() => {
    if (!host.current) return;
    try {
      scene.current = createLivingScene(
        host.current,
        latest.current,
        () => callbacks.current.onReady(),
        () => callbacks.current.onError(),
      );
    } catch {
      callbacks.current.onError();
    }
    return () => {
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);
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
