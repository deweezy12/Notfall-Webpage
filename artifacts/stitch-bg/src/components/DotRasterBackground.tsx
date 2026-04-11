import { useEffect, useRef } from "react";
import type { ThemeMode } from "@/lib/theme";

type DotRasterBackgroundProps = {
  theme: ThemeMode;
};

type PointerState = {
  active: boolean;
  x: number;
  y: number;
};

export function DotRasterBackground({ theme }: DotRasterBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const pointerTarget: PointerState = { active: false, x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0, intensity: 0 };
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const dotSpacing = 9;
    const dotSize = 0.65;
    const hoverRadius = 100;
    const hoverRadiusSquared = hoverRadius * hoverRadius;
    const idleThresholdMs = 70;
    const idleIntensity = 0.62;
    let frameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerWasActive = false;
    let lastPointerMoveAt = 0;

    const palette =
      theme === "dark"
        ? {
            background: "#202124",
            dim: "255,255,255",
            bright: "255,255,255",
            dimAlpha: 0.12,
            brightAlpha: 0.28,
            hoverAlpha: 0.72,
          }
        : {
            background: "#f7f7fb",
            dim: "18,24,38",
            bright: "18,24,38",
            dimAlpha: 0.08,
            brightAlpha: 0.17,
            hoverAlpha: 0.34,
          };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updatePointer = (event: PointerEvent) => {
      pointerTarget.active = true;
      pointerTarget.x = event.clientX;
      pointerTarget.y = event.clientY;
      lastPointerMoveAt = performance.now();

      if (!pointerWasActive) {
        pointerCurrent.x = event.clientX;
        pointerCurrent.y = event.clientY;
        pointerCurrent.intensity = 1;
        pointerWasActive = true;
      }
    };

    const resetPointer = () => {
      pointerTarget.active = false;
      pointerWasActive = false;
    };

    const draw = () => {
      frameId = window.requestAnimationFrame(draw);
      const now = performance.now();
      const breath =
        theme === "dark" && !reducedMotionQuery.matches
          ? 0.86 + 0.14 * ((Math.sin(now * 0.0014) + 1) / 2)
          : 1;
      const hueShift =
        theme === "dark" && !reducedMotionQuery.matches ? now * 0.012 : 0;

      context.fillStyle = palette.background;
      context.fillRect(0, 0, width, height);

      const pointerActive = pointerTarget.active && !reducedMotionQuery.matches;
      const pointerIdle =
        pointerActive && performance.now() - lastPointerMoveAt > idleThresholdMs;
      const pointerIntensityTarget = pointerActive
        ? pointerIdle
          ? idleIntensity
          : 1
        : 0;

      pointerCurrent.intensity +=
        (pointerIntensityTarget - pointerCurrent.intensity) * 0.22;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.38;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.38;

      let rowIndex = 0;
      for (let y = 0; y <= height + dotSpacing; y += dotSpacing) {
        let columnIndex = 0;

        for (let x = 0; x <= width + dotSpacing; x += dotSpacing) {
          const brightDot = rowIndex % 2 === 1 && columnIndex % 2 === 1;
          const dx = x - pointerCurrent.x;
          const dy = y - pointerCurrent.y;
          const distanceSquared = dx * dx + dy * dy;
          const falloff =
            pointerCurrent.intensity > 0.01 &&
            distanceSquared < hoverRadiusSquared
              ? (1 - distanceSquared / hoverRadiusSquared) ** 2.4 *
                pointerCurrent.intensity
              : 0;
          const baseAlpha = brightDot ? palette.brightAlpha : palette.dimAlpha;
          const alpha =
            (baseAlpha + (palette.hoverAlpha - baseAlpha) * falloff) * breath;
          const darkGradientHue =
            (((x / Math.max(width, 1)) * 220 +
              (y / Math.max(height, 1)) * 140 +
              hueShift) %
              360);
          const darkGradientColor =
            theme === "dark"
              ? brightDot
                ? `hsla(${darkGradientHue} 92% 72% / ${Math.min(alpha, 1)})`
                : `hsla(${darkGradientHue} 88% 64% / ${Math.min(alpha, 1)})`
              : `rgba(${brightDot ? palette.bright : palette.dim}, ${alpha})`;

          context.beginPath();
          context.fillStyle = darkGradientColor;
          context.arc(x, y, dotSize, 0, Math.PI * 2);
          context.fill();

          columnIndex += 1;
        }

        rowIndex += 1;
      }
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="dot-raster" aria-hidden="true" />;
}
