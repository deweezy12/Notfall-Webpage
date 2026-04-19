import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { getNoiseBuffer, type NoiseColor } from "@/lib/noise";

type FrequencyData = Uint8Array<ArrayBuffer>;

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

type SoundfieldAudioContextValue = {
  sources: SoundfieldSource[];
  selectedSourceId: string;
  selectedSource: SoundfieldSource | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  setSource: (sourceId: string) => void;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (value: number) => void;
  getFrequencyData: () => FrequencyData | null;
};

type SoundfieldAudioProviderProps = PropsWithChildren<{
  sources: SoundfieldSource[];
  initialSourceId?: string;
}>;

const SoundfieldAudioContext = createContext<SoundfieldAudioContextValue | null>(
  null,
);

function resolveInitialSourceId(
  sources: SoundfieldSource[],
  initialSourceId?: string,
): string {
  if (initialSourceId && sources.some((source) => source.id === initialSourceId)) {
    return initialSourceId;
  }

  return sources[0]?.id ?? "";
}

export function SoundfieldAudioProvider({
  children,
  sources,
  initialSourceId,
}: SoundfieldAudioProviderProps) {
  const [selectedSourceId, setSelectedSourceId] = useState(() =>
    resolveInitialSourceId(sources, initialSourceId),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.55);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const frequencyDataRef = useRef<FrequencyData | null>(null);
  const currentSourceRef = useRef<SoundfieldSource | null>(null);
  const isPlayingRef = useRef(false);

  const selectedSource =
    sources.find((source) => source.id === selectedSourceId) ?? sources[0] ?? null;

  currentSourceRef.current = selectedSource;
  isPlayingRef.current = isPlaying;

  const stopNoiseSource = () => {
    const activeNoiseSource = noiseSourceRef.current;

    if (!activeNoiseSource) {
      return;
    }

    noiseSourceRef.current = null;
    activeNoiseSource.onended = null;

    try {
      activeNoiseSource.stop();
    } catch {
      // Source nodes throw when already stopped.
    }

    activeNoiseSource.disconnect();
  };

  const ensureAudioGraph = async () => {
    const audioElement = audioElementRef.current;
    if (!audioElement) {
      return null;
    }

    let audioContext = audioContextRef.current;
    let gainNode = gainNodeRef.current;
    let analyserNode = analyserNodeRef.current;

    if (!audioContext || !gainNode || !analyserNode) {
      audioContext = new window.AudioContext();
      gainNode = audioContext.createGain();
      analyserNode = audioContext.createAnalyser();

      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.86;
      gainNode.gain.value = volume;
      gainNode.connect(analyserNode);
      analyserNode.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      gainNodeRef.current = gainNode;
      analyserNodeRef.current = analyserNode;
      frequencyDataRef.current = new Uint8Array(
        analyserNode.frequencyBinCount,
      ) as FrequencyData;
    }

    if (!mediaSourceRef.current) {
      mediaSourceRef.current =
        audioContext.createMediaElementSource(audioElement);
      mediaSourceRef.current.connect(gainNode);
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    return { audioContext, gainNode };
  };

  const syncSource = async (
    source: SoundfieldSource,
    shouldAutoplay: boolean,
  ) => {
    const audioElement = audioElementRef.current;
    if (!audioElement) {
      return;
    }

    audioElement.pause();
    stopNoiseSource();
    setCurrentTime(0);
    setDuration(0);

    if (source.kind === "file") {
      audioElement.currentTime = 0;
      audioElement.src = source.src;
      audioElement.load();

      if (!shouldAutoplay) {
        setIsPlaying(false);
        return;
      }

      const graph = await ensureAudioGraph();
      if (!graph) {
        setIsPlaying(false);
        return;
      }

      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audioElement.removeAttribute("src");
    audioElement.load();

    if (!shouldAutoplay) {
      setIsPlaying(false);
      return;
    }

    const graph = await ensureAudioGraph();
    if (!graph) {
      setIsPlaying(false);
      return;
    }

    const noiseSource = graph.audioContext.createBufferSource();
    noiseSource.buffer = getNoiseBuffer(graph.audioContext, source.color);
    noiseSource.loop = true;
    noiseSource.connect(graph.gainNode);
    noiseSource.onended = () => {
      if (noiseSourceRef.current === noiseSource) {
        noiseSourceRef.current = null;
      }

      noiseSource.disconnect();
    };
    noiseSource.start();
    noiseSourceRef.current = noiseSource;
    setIsPlaying(true);
  };

  useEffect(() => {
    const audioElement = new Audio();
    audioElement.preload = "metadata";
    audioElementRef.current = audioElement;

    const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
    const updateDuration = () =>
      setDuration(Number.isFinite(audioElement.duration) ? audioElement.duration : 0);
    const handleEnded = () => setIsPlaying(false);

    audioElement.addEventListener("timeupdate", updateCurrentTime);
    audioElement.addEventListener("loadedmetadata", updateDuration);
    audioElement.addEventListener("durationchange", updateDuration);
    audioElement.addEventListener("ended", handleEnded);

    if (currentSourceRef.current) {
      void syncSource(currentSourceRef.current, false);
    }

    return () => {
      audioElement.pause();
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
      audioElement.removeEventListener("loadedmetadata", updateDuration);
      audioElement.removeEventListener("durationchange", updateDuration);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeAttribute("src");
      audioElement.load();
      audioElementRef.current = null;

      stopNoiseSource();
      gainNodeRef.current?.disconnect();
      analyserNodeRef.current?.disconnect();
      mediaSourceRef.current?.disconnect();
      gainNodeRef.current = null;
      analyserNodeRef.current = null;
      mediaSourceRef.current = null;
      frequencyDataRef.current = null;

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        void audioContextRef.current.close();
      }

      audioContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sources.some((source) => source.id === selectedSourceId)) {
      setSelectedSourceId(resolveInitialSourceId(sources, initialSourceId));
    }
  }, [initialSourceId, selectedSourceId, sources]);

  const setSource = (sourceId: string) => {
    const nextSource =
      sources.find((source) => source.id === sourceId) ?? sources[0] ?? null;

    if (!nextSource) {
      return;
    }

    const shouldAutoplay = isPlayingRef.current;
    setSelectedSourceId(nextSource.id);
    void syncSource(nextSource, shouldAutoplay);
  };

  const togglePlay = async () => {
    const source = currentSourceRef.current;
    if (!source) {
      return;
    }

    if (isPlayingRef.current) {
      if (source.kind === "file") {
        audioElementRef.current?.pause();
      } else {
        stopNoiseSource();
      }

      setIsPlaying(false);
      return;
    }

    const audioElement = audioElementRef.current;
    if (!audioElement) {
      return;
    }

    if (source.kind === "file") {
      const graph = await ensureAudioGraph();
      if (!graph) {
        setIsPlaying(false);
        return;
      }

      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    const graph = await ensureAudioGraph();
    if (!graph) {
      setIsPlaying(false);
      return;
    }

    stopNoiseSource();

    const noiseSource = graph.audioContext.createBufferSource();
    noiseSource.buffer = getNoiseBuffer(graph.audioContext, source.color);
    noiseSource.loop = true;
    noiseSource.connect(graph.gainNode);
    noiseSource.onended = () => {
      if (noiseSourceRef.current === noiseSource) {
        noiseSourceRef.current = null;
      }

      noiseSource.disconnect();
    };
    noiseSource.start();
    noiseSourceRef.current = noiseSource;
    setIsPlaying(true);
  };

  const seek = (time: number) => {
    if (currentSourceRef.current?.kind !== "file") {
      return;
    }

    const audioElement = audioElementRef.current;
    if (!audioElement) {
      return;
    }

    audioElement.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (nextVolume: number) => {
    setVolumeState(nextVolume);

    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = nextVolume;
    }
  };

  const getFrequencyData = () => {
    const analyserNode = analyserNodeRef.current;
    const frequencyData = frequencyDataRef.current;

    if (!analyserNode || !frequencyData || !isPlayingRef.current) {
      return null;
    }

    analyserNode.getByteFrequencyData(frequencyData);
    return frequencyData;
  };

  return (
    <SoundfieldAudioContext.Provider
      value={{
        sources,
        selectedSourceId,
        selectedSource,
        isPlaying,
        currentTime,
        duration,
        volume,
        setSource,
        togglePlay,
        seek,
        setVolume,
        getFrequencyData,
      }}
    >
      {children}
    </SoundfieldAudioContext.Provider>
  );
}

export function useSoundfieldAudio(): SoundfieldAudioContextValue {
  const context = useContext(SoundfieldAudioContext);

  if (!context) {
    throw new Error("useSoundfieldAudio must be used inside SoundfieldAudioProvider");
  }

  return context;
}

export function useOptionalSoundfieldAudio() {
  return useContext(SoundfieldAudioContext);
}
