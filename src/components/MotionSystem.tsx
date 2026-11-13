import { useEffect } from "react";
import "../motion.css";

type MotionFamily =
  | "typography"
  | "transform"
  | "mask"
  | "prism"
  | "spatial"
  | "editorial"
  | "media";

const motion: Record<MotionFamily, { duration: number; frames: Keyframe[] }> = {
  typography: {
    duration: 640,
    frames: [
      { clipPath: "inset(0 0 100% 0)", translate: "0 .12em" },
      { clipPath: "inset(0 0 0% 0)", translate: "0 0" },
    ],
  },
  transform: {
    duration: 600,
    frames: [
      { clipPath: "inset(0 22% 0 0)", scale: ".98 1", opacity: 0.7 },
      { clipPath: "inset(0 0% 0 0)", scale: "1 1", opacity: 1 },
    ],
  },
  mask: {
    duration: 740,
    frames: [
      { clipPath: "inset(9% 0 12% 0)", scale: "1.025" },
      { clipPath: "inset(0% 0 0% 0)", scale: "1" },
    ],
  },
  prism: {
    duration: 800,
    frames: [{ opacity: 0.84 }, { opacity: 1 }],
  },
  spatial: {
    duration: 620,
    frames: [
      { translate: "0 12px", scale: ".97", opacity: 0.65 },
      { translate: "0 0", scale: "1", opacity: 1 },
    ],
  },
  editorial: {
    duration: 520,
    frames: [
      { clipPath: "inset(0 12% 0 0)", opacity: 0.7 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1 },
    ],
  },
  media: {
    duration: 360,
    frames: [{ opacity: 0.45 }, { opacity: 1 }],
  },
};

/** One controller for declared regions. Content is never hidden by default. */
export default function MotionSystem() {
  useEffect(() => {
    if (
      !window.IntersectionObserver ||
      !window.MutationObserver ||
      typeof Element.prototype.animate !== "function"
    )
      return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 760px)");
    const regions = new Map<Element, { visible: boolean; pending: boolean }>();
    const animations = new Map<Element, Animation>();

    const stop = (element: Element) => {
      const animation = animations.get(element);
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
        animations.delete(element);
      }
      element.removeAttribute("data-motion-active");
    };

    const play = (element: Element) => {
      const region = regions.get(element);
      const family =
        motion[element.getAttribute("data-motion") as MotionFamily];
      if (
        !region ||
        !family ||
        !region.pending ||
        !region.visible ||
        reduced.matches ||
        document.hidden
      )
        return;
      if (element.contains(document.activeElement)) {
        region.pending = false;
        return;
      }
      stop(element);
      region.pending = false;
      element.setAttribute("data-motion-active", "");
      // Mobile gets a short opacity entrance: no masking controls or depth shift.
      const animation = element.animate(
        narrow.matches ? [{ opacity: 0.75 }, { opacity: 1 }] : family.frames,
        {
          duration: narrow.matches
            ? Math.min(400, family.duration)
            : family.duration,
          easing: "cubic-bezier(.22,.72,.2,1)",
          fill: "none",
        },
      );
      animations.set(element, animation);
      animation.onfinish = () => {
        animations.delete(element);
        element.removeAttribute("data-motion-active");
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const region = regions.get(entry.target);
          if (!region) return;
          region.visible = entry.isIntersecting;
          if (entry.isIntersecting) play(entry.target);
          else stop(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const register = (element: Element) => {
      if (
        regions.has(element) ||
        !motion[element.getAttribute("data-motion") as MotionFamily]
      )
        return;
      regions.set(element, { visible: false, pending: !reduced.matches });
      observer.observe(element);
    };
    const scan = (node: Node) => {
      if (!(node instanceof Element)) return;
      if (node.matches("[data-motion]")) register(node);
      node.querySelectorAll("[data-motion]").forEach(register);
    };
    scan(document.body);

    const changes = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "childList") {
          record.addedNodes.forEach(scan);
        } else if (record.target instanceof Element) {
          const element = record.target;
          register(element);
          const region = regions.get(element);
          if (region) {
            region.pending = !reduced.matches;
            play(element);
          }
        }
      });
      // Discard route and conditional-module nodes, including active animations.
      regions.forEach((_, element) => {
        if (!element.isConnected) {
          stop(element);
          observer.unobserve(element);
          regions.delete(element);
        }
      });
    });
    changes.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-motion", "data-motion-key"],
    });

    const preferenceChanged = () => {
      if (!reduced.matches) return;
      regions.forEach((region, element) => {
        region.pending = false;
        stop(element);
      });
    };
    const visibilityChanged = () => {
      if (document.hidden) animations.forEach((_, element) => stop(element));
    };
    const focusChanged = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const focused = event.target;
      regions.forEach((region, element) => {
        if (element.contains(focused)) {
          region.pending = false;
          stop(element);
        }
      });
    };
    reduced.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    document.addEventListener("focusin", focusChanged, true);
    return () => {
      observer.disconnect();
      changes.disconnect();
      reduced.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
      document.removeEventListener("focusin", focusChanged, true);
      animations.forEach((_, element) => stop(element));
      regions.clear();
    };
  }, []);
  return null;
}
