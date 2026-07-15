import { useEffect, useRef } from "react";
import "@/styles/spacefield-media.css";

type SpacefieldMediaVariant = "default" | "yellow";

type SpacefieldMediaPageProps = {
  variant?: SpacefieldMediaVariant;
};

const viewBox = { centerX: 600, centerY: 400 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function SpacefieldMediaPage({
  variant = "default",
}: SpacefieldMediaPageProps) {
  const stageRef = useRef<HTMLElement | null>(null);
  const wordLayerRef = useRef<SVGGElement | null>(null);
  const targetLetterRef = useRef<SVGTSpanElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const wordLayer = wordLayerRef.current;
    const targetLetter = targetLetterRef.current;

    if (!stage || !wordLayer || !targetLetter) {
      return;
    }

    let maxScale = 7;
    let startOriginX = viewBox.centerX;
    let startOriginY = viewBox.centerY;
    let endOriginX = viewBox.centerX;
    let endOriginY = viewBox.centerY;
    let ticking = false;

    const update = () => {
      ticking = false;

      const stageRect = stage.getBoundingClientRect();
      const scrollableDistance = Math.max(
        stage.offsetHeight - window.innerHeight,
        1,
      );
      const rawProgress = clamp(-stageRect.top / scrollableDistance, 0, 1);
      const zoomProgress = Math.pow(rawProgress, 1.55);
      const scale = Math.pow(maxScale, zoomProgress);

      const targetShift = smoothstep(4.5, 22, scale);
      const originX = startOriginX + (endOriginX - startOriginX) * targetShift;
      const originY = startOriginY + (endOriginY - startOriginY) * targetShift;
      const targetX = (viewBox.centerX - originX) * zoomProgress;
      const targetY = (viewBox.centerY - originY) * zoomProgress;
      const fade = smoothstep(0.76, 0.99, rawProgress);

      wordLayer.setAttribute(
        "transform",
        `translate(${targetX.toFixed(2)} ${targetY.toFixed(2)}) translate(${originX.toFixed(2)} ${originY.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${(-originX).toFixed(2)} ${(-originY).toFixed(2)})`,
      );
      stage.style.setProperty("--spacefield-fade-opacity", fade.toFixed(4));
    };

    const measureTarget = () => {
      wordLayer.setAttribute("transform", "");

      const targetBox = targetLetter.getBBox();
      startOriginX = targetBox.x + targetBox.width * 0.26;
      startOriginY = targetBox.y + targetBox.height * 0.47;
      endOriginX = targetBox.x + targetBox.width * 0.68;
      endOriginY = targetBox.y + targetBox.height * 0.39;
      maxScale = 90;

      update();
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measureTarget);
    window.addEventListener("load", measureTarget);

    const fontsReady = document.fonts?.ready.then(measureTarget);
    measureTarget();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measureTarget);
      window.removeEventListener("load", measureTarget);
      fontsReady?.catch(() => undefined);
    };
  }, []);

  return (
    <main className={`spacefield-media-page spacefield-media-page--${variant}`}>
      <section
        className="spacefield-media-stage"
        id="space-stage"
        aria-label="SPACEFIELD scroll animation"
        ref={stageRef}
      >
        <div className="spacefield-media-hero">
          <svg
            className="spacefield-media-svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="SPACEFIELD"
          >
            <g className="spacefield-media-word-layer" ref={wordLayerRef}>
              <text
                className="spacefield-media-word"
                x="600"
                y="355"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan>S</tspan>
                <tspan>P</tspan>
                <tspan>A</tspan>
                <tspan>C</tspan>
                <tspan>E</tspan>
                <tspan ref={targetLetterRef}>F</tspan>
                <tspan>I</tspan>
                <tspan>E</tspan>
                <tspan>L</tspan>
                <tspan>D</tspan>
              </text>
              <text
                className="spacefield-media-word spacefield-media-word--media"
                x="600"
                y="510"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                MEDIA
              </text>
            </g>
          </svg>
          <div className="spacefield-media-wash" />
        </div>
      </section>

      <section className="spacefield-media-arrival">
        <div className="spacefield-media-arrival__inner">
          <h1>Arrival</h1>
          <p>
            The zoom resolves into a clean white section, ready for the rest of
            the landing page content.
          </p>
        </div>
      </section>
    </main>
  );
}
