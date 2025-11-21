import { Terminal } from "@/components/Terminal/Terminal";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-4xl">
        <Terminal />
      </div>
    </main>
  );
}
