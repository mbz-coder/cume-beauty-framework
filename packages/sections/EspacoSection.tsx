"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";

// Ensaio fotográfico, não grade — uma foto enorme por vez, muito espaço entre
// elas. Adicionar foto nova é só acrescentar no array (lavabo, sala de
// maquiagem, sala do laser, área do café — ainda por vir).
const FOTOS_ESPACO = [
  { src: "/images/espaco/IMG_2068.PNG", alt: "Estação de atendimento da Bless, com poltronas e espelho" },
  { src: "/images/espaco/IMG_2069.PNG", alt: "Salão da Bless com lustres de cristal e paredes de tijolo aparente" },
  {
    src: "/images/espaco/WhatsApp Image 2026-07-16 at 18.02.58.jpeg",
    alt: "Detalhe do espaço da Bless Hair & Care",
  },
  {
    src: "/images/espaco/WhatsApp Image 2026-07-16 at 18.07.04.jpeg",
    alt: "Detalhe do espaço da Bless Hair & Care",
  },
  { src: "/images/espaco/IMG_2934.jpg", alt: "Balcão de atendimento da Bless Hair & Care" },
  { src: "/images/espaco/IMG_2935.jpg", alt: "Fachada e entrada da Bless Hair & Care" },
  { src: "/images/espaco/loja-de-roupa.jpg", alt: "Loja de roupa dentro da Bless Hair & Care" },
];

export function EspacoSection() {
  return (
    <section id="espaco" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Conheça nosso espaço
        </h2>
        <p className="mx-auto mt-4 max-w-md text-bless-gray">Cada canto pensado pra você se sentir em casa — e sair diferente de como entrou.</p>
      </motion.div>

      <div className="flex flex-col gap-28 md:gap-40">
        {FOTOS_ESPACO.map((foto, i) => {
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
