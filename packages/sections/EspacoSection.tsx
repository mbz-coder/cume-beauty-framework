"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";

interface EspacoSectionProps {
  fotos: { src: string; alt: string }[];
}

// Ensaio fotográfico, não grade — uma foto enorme por vez, muito espaço entre
// elas. Resultados/Espaco (2026-07-23), item 6 da fila -- fotos agora vem
// via prop (Content Repository com fallback, ver app/page.tsx), nao
// hardcoded aqui.
export function EspacoSection({ fotos }: EspacoSectionProps) {
  return (
    <section id="espaco" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-brand-ink uppercase md:text-5xl">
          Conheça nosso espaço
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brand-gray">Cada canto pensado pra você se sentir em casa — e sair diferente de como entrou.</p>
      </motion.div>

      <div className="flex flex-col gap-28 md:gap-40">
        {fotos.map((foto, i) => {
          // Primeira foto quebra o padrão contido das outras — full-bleed, sem
          // moldura — pra variar o ritmo em vez de repetir o mesmo bloco.
          const fullBleed = i === 0;
          return (
            <motion.div
              key={foto.src}
              {...scaleInViewport}
              className={
                fullBleed
                  ? "relative h-screen w-full overflow-hidden"
                  : "relative mx-auto h-[80vh] w-full max-w-[1600px] overflow-hidden md:px-6"
              }
            >
              <div className={fullBleed ? "relative h-full w-full overflow-hidden" : "relative h-full w-full overflow-hidden md:rounded-sm"}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
