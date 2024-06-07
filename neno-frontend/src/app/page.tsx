"use client"

import { UseAnimation } from "@/Context/AnimationContext";
import LoadingAnimation from "@/components/LoadingAnimation";
import Conversor from "@/components/conversor";

export default function Home() {

  const { animation } = UseAnimation()

  return (
    <main id="main-bg" className="flex min-h-screen flex-col items-center justify-center p-16 bg-gray-100 relative overflow-hidden">
         {animation && <LoadingAnimation />}
      <section className="z-50">
      <h1 className="text-3xl">Neno</h1>
      <p className="text-lg">Faça o Download do áudio de seus vídeos favoritos do Youtube.</p>
      <Conversor />
      </section>
    </main>
  );
}
