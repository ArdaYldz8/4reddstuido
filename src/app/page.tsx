import { MarzipanoViewer } from "@/components/tour";

export default function Home() {
  return (
    <main className="relative w-screen h-screen bg-neutral-900 overflow-hidden">
      <MarzipanoViewer initialNode="node1" className="w-full h-full" />
    </main>
  );
}
