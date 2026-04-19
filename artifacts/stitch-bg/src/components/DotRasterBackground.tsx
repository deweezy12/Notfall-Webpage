import { useEffect, useRef } from "react";

import { useOptionalSoundfieldAudio } from "@/lib/soundfield-audio";
import type { ThemeMode } from "@/lib/theme";

type DotRasterBackgroundProps = {
  theme: ThemeMode;
  contained?: boolean;
  backgroundColor?: string;
  rainbow?: boolean;
  audioReactive?: boolean;
};

type PointerState = {
  active: boolean;
  x: number;
  y: number;
};

type GridPoint = {
  x: number;
  y: number;
  radius: number;
  directionX: number;
  directionY: number;
  angle: number;
  normalizedRadius: number;
};

export function DotRasterBackground({
  theme,
  contained = false,
  backgroundColor,
  rainbow = false,
  audioReactive = false,
}: DotRasterBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioReaderRef = useRef<{
    getFrequencyData: () => Uint8Array<ArrayBuffer> | null;
    isPlaying: boolean;
  } | null>(null);
  const soundfieldAudio = useOptionalSoundfieldAudio();

  useEffect(() => {
    audioReaderRef.current =
      audioReactive && soundfieldAudio
        ? {
            getFrequencyData: soundfieldAudio.getFrequencyData,
            isPlaying: soundfieldAudio.isPlaying,
          }
        : null;
  }, [audioReactive, soundfieldAudio]);

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
    const dotSpacing = 11;
    const baseDotSize = 0.85;
    const hoverRadius = 140;
    const hoverRadiusSquared = hoverRadius * hoverRadius;
    const idleThresholdMs = 200;
    const spectralBandCount = 18;
    const maxAudioDisplacement = dotSpacing * 0.72;
    const smoothedBands = new Float32Array(spectralBandCount);
    const targetBands = new Float32Array(spectralBandCount);
    let gridPoints: GridPoint[] = [];
    let frameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerWasActive = false;
    let lastPointerMoveAt = 0;

    const palette =
      theme === "dark"
        ? {
            background: backgroundColor ?? "#202124",
            bright: "255,255,255",
            brightAlpha: 0.28,
            hoverAlpha: 0.82,
          }
        : {
            background: backgroundColor ?? "#ffffff",
            bright: "18,24,38",
            brightAlpha: 0.17,
            hoverAlpha: 0.42,
          };

    const resize = () => {
      if (contained && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(Math.hypot(centerX, centerY), 1);

      gridPoints = [];

      for (let y = 0; y <= height + dotSpacing; y += dotSpacing) {
        for (let x = 0; x <= width + dotSpacing; x += dotSpacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const radius = Math.hypot(dx, dy);
          const inverseRadius = radius > 0 ? 1 / radius : 0;

          gridPoints.push({
            x,
            y,
            radius,
            directionX: dx * inverseRadius,
            directionY: dy * inverseRadius,
            angle: Math.atan2(dy, dx),
            normalizedRadius: radius / maxRadius,
          });
        }
      }
    };

    const updatePointer = (event: PointerEvent) => {
      pointerTarget.active = true;

      if (contained && canvas.parentElement) {
        const rect = canvas.getBoundingClientRect();
        pointerTarget.x = event.clientX - rect.left;
        pointerTarget.y = event.clientY - rect.top;
      } else {
        pointerTarget.x = event.clientX;
        pointerTarget.y = event.clientY;
      }

      lastPointerMoveAt = performance.now();

      if (!pointerWasActive) {
        pointerCurrent.x = pointerTarget.x;
        pointerCurrent.y = pointerTarget.y;
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
      const audioReader = audioReaderRef.current;
      const frequencyData =
        audioReactive && audioReader?.isPlaying ? audioReader.getFrequencyData() : null;
      let energyAverage = 0;

      context.fillStyle = palette.background;
      context.fillRect(0, 0, width, height);

      const pointerActive = pointerTarget.active && !reducedMotionQuery.matches;
      const pointerIdle =
        pointerActive && performance.now() - lastPointerMoveAt > idleThresholdMs;
      const pointerIntensityTarget = pointerActive && !pointerIdle ? 1 : 0;
      const intensitySpeed =
        pointerIntensityTarget > pointerCurrent.intensity ? 0.5 : 0.03;

      pointerCurrent.intensity +=
        (pointerIntensityTarget - pointerCurrent.intensity) * intensitySpeed;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.45;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.45;

      if (
        audioReactive &&
        !reducedMotionQuery.matches &&
        frequencyData &&
        frequencyData.length > 0
      ) {
        const bandLimit = Math.min(frequencyData.length, 96);

        for (let bandIndex = 0; bandIndex < spectralBandCount; bandIndex += 1) {
          const bandStart = Math.floor(
            (bandIndex / spectralBandCount) ** 1.7 * bandLimit,
          );
          const bandEnd = Math.max(
            bandStart + 1,
            Math.floor(
              ((bandIndex + 1) / spectralBandCount) ** 1.7 * bandLimit,
            ),
          );
          let bandTotal = 0;

          for (
            let dataIndex = bandStart;
            dataIndex < bandEnd && dataIndex < bandLimit;
            dataIndex += 1
          ) {
            bandTotal += frequencyData[dataIndex] / 255;
          }

          const bandWidth = Math.max(1, bandEnd - bandStart);
          targetBands[bandIndex] = (bandTotal / bandWidth) ** 1.35;
          smoothedBands[bandIndex] +=
            (targetBands[bandIndex] - smoothedBands[bandIndex]) * 0.2;
          energyAverage += smoothedBands[bandIndex];
        }

        energyAverage /= spectralBandCount;
      } else {
        for (let bandIndex = 0; bandIndex < spectralBandCount; bandIndex += 1) {
          smoothedBands[bandIndex] *= audioReactive ? 0.56 : 0.92;
        }
      }

      const staticBreath =
        !audioReactive && theme === "dark" && !reducedMotionQuery.matches
          ? 0.86 + 0.14 * ((Math.sin(now * 0.0014) + 1) / 2)
          : 1;
      const hueShift =
        !audioReactive && theme === "dark" && !reducedMotionQuery.matches
          ? now * 0.012
          : 0;
      const radialMotionActive = audioReactive && energyAverage > 0.012;

      for (const point of gridPoints) {
        const pointerDx = point.x - pointerCurrent.x;
        const pointerDy = point.y - pointerCurrent.y;
        const distanceSquared = pointerDx * pointerDx + pointerDy * pointerDy;
        const falloff =
          pointerCurrent.intensity > 0.01 && distanceSquared < hoverRadiusSquared
            ? (1 - distanceSquared / hoverRadiusSquared) ** 2.4 *
              pointerCurrent.intensity
            : 0;
        let radialDisplacement = 0;
        let waveGlow = 0;

        if (radialMotionActive && !reducedMotionQuery.matches) {
          const texturePhase =
            Math.sin(point.angle * 4 + point.radius * 0.015) * 0.4;

          for (
            let bandIndex = 0;
            bandIndex < spectralBandCount;
            bandIndex += 1
          ) {
            const bandEnergy = smoothedBands[bandIndex];
            if (bandEnergy < 0.01) {
              continue;
            }

            const spectralPosition =
              bandIndex / Math.max(spectralBandCount - 1, 1);
            const radialFrequency = 0.015 + spectralPosition * 0.032;
            const temporalSpeed = 0.0026 + spectralPosition * 0.0048;
            const phase =
              point.radius * radialFrequency -
              now * temporalSpeed +
              spectralPosition * 8 +
              texturePhase * (1.3 + spectralPosition * 2.2);
            const waveSample = Math.sin(phase);
            const weightedSample =
              waveSample * bandEnergy * (1.08 - spectralPosition * 0.28);

            radialDisplacement += weightedSample;
            waveGlow += Math.max(0, waveSample) * bandEnergy;
          }

          radialDisplacement *=
            maxAudioDisplacement * (0.96 - point.normalizedRadius * 0.18);
          radialDisplacement = Math.max(
            -maxAudioDisplacement,
            Math.min(maxAudioDisplacement, radialDisplacement),
          );
        }

        const drawX = point.x + point.directionX * radialDisplacement;
        const drawY = point.y + point.directionY * radialDisplacement;
        const alpha = Math.min(
          1,
          (palette.brightAlpha +
            (palette.hoverAlpha - palette.brightAlpha) * falloff +
            waveGlow * 0.11) *
            staticBreath,
        );
        const dotSize = baseDotSize + falloff * 0.65 + Math.min(1.15, waveGlow * 0.45);

        let dotColor: string;
        if (rainbow && theme === "dark") {
          const darkGradientHue =
            ((point.x / Math.max(width, 1)) * 220 +
              (point.y / Math.max(height, 1)) * 140 +
              waveGlow * 18 +
              hueShift) %
            360;
          dotColor = `hsla(${darkGradientHue} 92% 72% / ${alpha})`;
        } else {
          dotColor = `rgba(${palette.bright}, ${alpha})`;
        }

        context.beginPath();
        context.fillStyle = dotColor;
        context.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
        context.fill();
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
  }, [theme, contained, backgroundColor, rainbow, audioReactive]);

  return (
    <canvas
      ref={canvasRef}
      className={contained ? "dot-raster dot-raster--contained" : "dot-raster"}
      aria-hidden="true"
    />
  );
}
