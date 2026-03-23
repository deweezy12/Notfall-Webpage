import { StitchBackground } from "@/components/StitchBackground";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <StitchBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight mb-4">
            Stitch
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto font-light drop-shadow">
            A creative canvas for everyone
          </p>
        </div>
      </div>
    </main>
  );
}
