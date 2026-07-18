"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";

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
    <section id="resultados" className="scroll-mt-20 py-32 md:py-[220px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-20 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Resultados
        </h2>
        <p className="mx-auto mt-4 max-w-md text-bless-gray">Resultado real de cliente, com avaliação antes de qualquer procedimento.</p>
      </motion.div>

      <div className="flex flex-col gap-24 md:gap-32">
        {RESULTADOS.map((par) => (
          <motion.div
            key={par.antes.src}
            {...scaleInViewport}
            className="mx-auto w-full max-w-[1600px] px-6"
          >
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {([
                ["Antes", par.antes],
                ["Depois", par.depois],
              ] as const).map(([label, foto]) => (
                <div key={label} className="relative h-[55vh] overflow-hidden md:rounded-sm">
                  <Image src={foto.src} alt={foto.alt} fill sizes="50vw" className="object-cover" />
                  <span className="absolute top-4 left-4 rounded-full bg-bless-black/70 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-white uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center font-display text-lg text-bless-ink">{par.tratamento}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
