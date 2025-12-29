import { Terminal } from "@/components/Terminal/Terminal";
import { ParticleBackground } from "@/components/Background/ParticleBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1a1a] p-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="w-full max-w-4xl relative z-10">
        <Terminal />
      </div>
    </main>
  );
}
