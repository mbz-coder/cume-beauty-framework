"use client";

import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";
import { BeforeAfterSlider } from "@ui/before-after-slider";

interface ResultadoPar {
  tratamento: string;
  antes: { src: string; alt: string };
  depois: { src: string; alt: string };
}

interface ResultadosSectionProps {
  resultados: ResultadoPar[];
}

// Pareado por enquadramento (mesmo ângulo/pose em dois momentos) — não
// confirmado clinicamente qual é antes/depois de fato, Moabe corrige depois
// se precisar. Resultados/Espaco (2026-07-23), item 6 da fila -- pares
// agora vem via prop (Content Repository com fallback, ver app/page.tsx),
// nao hardcoded aqui.
export function ResultadosSection({ resultados }: ResultadosSectionProps) {
  return (
    <section id="resultados" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-brand-ink uppercase md:text-5xl">
          Resultados
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brand-gray">
          Transformação real, contada por quem viveu — sempre com avaliação antes de qualquer procedimento.
        </p>
      </motion.div>

      <div className="flex flex-col gap-28 md:gap-40">
        {resultados.map((par) => (
          <motion.div
            key={par.antes.src}
            {...scaleInViewport}
            className="mx-auto w-full max-w-[1600px] px-6"
          >
            <BeforeAfterSlider antes={par.antes} depois={par.depois} />
            <p className="mt-6 text-center font-display text-lg text-brand-ink">{par.tratamento}</p>
            <p className="mt-1 text-center text-xs text-brand-gray">Arraste pra comparar</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
