"use client";

import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";
import { BeforeAfterSlider } from "@ui/before-after-slider";

// Pareado por enquadramento (mesmo ângulo/pose em dois momentos) — não
// confirmado clinicamente qual é antes/depois de fato, Moabe corrige depois
// se precisar. Novo par: só acrescentar aqui, mesmo padrão de EspacoSection.
const RESULTADOS = [
  {
    tratamento: "Lavieen / Protocolo Pele Nova",
    antes: { src: "/images/resultados/pescoco-antes.jpg", alt: "Pescoço e colo antes do protocolo" },
    depois: { src: "/images/resultados/pescoco-depois.jpg", alt: "Pescoço e colo depois do protocolo" },
  },
  {
    tratamento: "Lavieen / Protocolo Pele Nova",
    antes: { src: "/images/resultados/rosto-antes.jpg", alt: "Rosto de perfil antes do protocolo" },
    depois: { src: "/images/resultados/rosto-depois.jpg", alt: "Rosto de frente depois do protocolo" },
  },
];

export function ResultadosSection() {
  return (
    <section id="resultados" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Resultados
        </h2>
        <p className="mx-auto mt-4 max-w-md text-bless-gray">
          Transformação real, contada por quem viveu — sempre com avaliação antes de qualquer procedimento.
        </p>
      </motion.div>

      <div className="flex flex-col gap-28 md:gap-40">
        {RESULTADOS.map((par) => (
          <motion.div
            key={par.antes.src}
            {...scaleInViewport}
            className="mx-auto w-full max-w-[1600px] px-6"
          >
            <BeforeAfterSlider antes={par.antes} depois={par.depois} />
            <p className="mt-6 text-center font-display text-lg text-bless-ink">{par.tratamento}</p>
            <p className="mt-1 text-center text-xs text-bless-gray">Arraste pra comparar</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
