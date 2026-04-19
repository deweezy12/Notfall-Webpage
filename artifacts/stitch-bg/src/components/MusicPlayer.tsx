import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { NoisePlayer, type NoiseColor } from "@/lib/noise";

export type SoundfieldSource =
  | {
      id: string;
      label: string;
      kind: "file";
      src: string;
    }
  | {
      id: string;
      label: string;
      kind: "noise";
      color: NoiseColor;
    };

type MusicPlayerProps = {
  sources: SoundfieldSource[];
  initialSourceId?: string;
};

function resolveInitialSourceId(
  sources: SoundfieldSource[],
  initialSourceId?: string,
): string {
  if (initialSourceId && sources.some((source) => source.id === initialSourceId)) {
    return initialSourceId;
  }

  return sources[0]?.id ?? "";
}

export function MusicPlayer({
  sources,
  initialSourceId,
}: MusicPlayerProps) {
  const [selectedSourceId, setSelectedSourceId] = useState(() =>
    resolveInitialSourceId(sources, initialSourceId),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.55);
  const audioRef = useRef<HTMLAudioElement>(null);
  const noisePlayerRef = useRef<NoisePlayer | null>(null);

  const selectedSource =
    sources.find((source) => source.id === selectedSourceId) ?? sources[0];
  const isFileSource = selectedSource?.kind === "file";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.volume = volume;
    noisePlayerRef.current = new NoisePlayer();

    if (selectedSource) {
      void syncSource(selectedSource, false);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeAttribute("src");
      audio.load();
      void noisePlayerRef.current?.dispose();
      noisePlayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sources.some((source) => source.id === selectedSourceId)) {
      setSelectedSourceId(resolveInitialSourceId(sources, initialSourceId));
    }
  }, [initialSourceId, selectedSourceId, sources]);

  const stopFilePlayback = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
  };

  async function syncSource(source: SoundfieldSource, shouldAutoplay: boolean) {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    stopFilePlayback();
    noisePlayerRef.current?.stop();
    setCurrentTime(0);
    setDuration(0);

    if (source.kind === "file") {
      audio.currentTime = 0;
      audio.src = source.src;
      audio.volume = volume;
      audio.load();

      if (!shouldAutoplay) {
        setIsPlaying(false);
        return;
      }

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.removeAttribute("src");
    audio.load();

    if (!shouldAutoplay) {
      setIsPlaying(false);
      return;
    }

    try {
      await noisePlayerRef.current?.start(source.color, volume);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !selectedSource) {
      return;
    }

    if (isPlaying) {
      if (selectedSource.kind === "file") {
        audio.pause();
      } else {
        noisePlayerRef.current?.stop();
      }

      setIsPlaying(false);
      return;
    }

    if (selectedSource.kind === "file") {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    try {
      await noisePlayerRef.current?.start(selectedSource.color, volume);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSourceId = event.target.value;
    const nextSource =
      sources.find((source) => source.id === nextSourceId) ?? sources[0];

    if (!nextSource) {
      return;
    }

    const shouldAutoplay = isPlaying;
    setSelectedSourceId(nextSource.id);
    void syncSource(nextSource, shouldAutoplay);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFileSource) {
      return;
    }

    const time = Number.parseFloat(event.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number.parseFloat(event.target.value);
    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }

    noisePlayerRef.current?.setVolume(nextVolume);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!selectedSource) {
    return null;
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} preload="metadata" />

      <label className="music-player__source-picker">
        <span className="music-player__meta-label">Quelle</span>
        <select
          className="music-player__select"
          value={selectedSourceId}
          onChange={handleSourceChange}
          aria-label="Audio source"
        >
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.label}
            </option>
          ))}
        </select>
      </label>

      <div className="music-player__transport">
        <button
          className="music-player__play-button"
          onClick={() => {
            void togglePlay();
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
          type="button"
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="music-player__panel">
          {isFileSource ? (
            <div className="music-player__controls">
              <span className="music-player__time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="music-player__slider"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek track position"
                disabled={!duration}
              />
              <span className="music-player__time">{formatTime(duration)}</span>
            </div>
          ) : (
            <div className="music-player__status">
              <span className="music-player__live-badge">
                {isPlaying ? "Live" : "Standby"}
              </span>
              <span className="music-player__status-copy">
                {selectedSource.label} is generated in the browser.
              </span>
            </div>
          )}

          <label className="music-player__volume">
            <span className="music-player__meta-label">Volume</span>
            <input
              type="range"
              className="music-player__slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
            />
            <span className="music-player__time">
              {Math.round(volume * 100)}%
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
