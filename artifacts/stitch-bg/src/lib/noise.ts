export type NoiseColor = "pink" | "brown";

const BUFFER_DURATION_SECONDS = 8;
const bufferCache = new WeakMap<BaseAudioContext, Map<NoiseColor, AudioBuffer>>();

function clampSample(sample: number): number {
  return Math.max(-1, Math.min(1, sample));
}

function fillBrownNoise(channelData: Float32Array) {
  let lastSample = 0;

  for (let index = 0; index < channelData.length; index += 1) {
    const white = Math.random() * 2 - 1;
    const brown = (lastSample + 0.02 * white) / 1.02;

    lastSample = brown;
    channelData[index] = clampSample(brown * 3.5);
  }
}

function fillPinkNoise(channelData: Float32Array) {
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let index = 0; index < channelData.length; index += 1) {
    const white = Math.random() * 2 - 1;

    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;

    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;

    b6 = white * 0.115926;
    channelData[index] = clampSample(pink * 0.11);
  }
}

function createNoiseBuffer(
  context: BaseAudioContext,
  color: NoiseColor,
): AudioBuffer {
  const frameCount = Math.floor(context.sampleRate * BUFFER_DURATION_SECONDS);
  const buffer = context.createBuffer(2, frameCount, context.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const channelData = buffer.getChannelData(channel);

    if (color === "brown") {
      fillBrownNoise(channelData);
    } else {
      fillPinkNoise(channelData);
    }
  }

  return buffer;
}

export function getNoiseBuffer(
  context: BaseAudioContext,
  color: NoiseColor,
): AudioBuffer {
  let contextBuffers = bufferCache.get(context);

  if (!contextBuffers) {
    contextBuffers = new Map<NoiseColor, AudioBuffer>();
    bufferCache.set(context, contextBuffers);
  }

  const cachedBuffer = contextBuffers.get(color);
  if (cachedBuffer) {
    return cachedBuffer;
  }

  const nextBuffer = createNoiseBuffer(context, color);
  contextBuffers.set(color, nextBuffer);

  return nextBuffer;
}
