import type { ChangeEvent } from "react";

import { useSoundfieldAudio } from "@/lib/soundfield-audio";

function formatTime(time: number) {
  if (!Number.isFinite(time) || time < 0) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const {
    sources,
    selectedSource,
    selectedSourceId,
    isPlaying,
    currentTime,
    duration,
    volume,
    setSource,
    togglePlay,
    seek,
    setVolume,
  } = useSoundfieldAudio();

  if (!selectedSource) {
    return null;
  }

  const isFileSource = selectedSource.kind === "file";

  const handleSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number.parseFloat(event.target.value));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseFloat(event.target.value));
  };

  return (
    <div className="music-player">
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
