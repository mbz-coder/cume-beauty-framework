"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpViewport, scaleInViewport } from "@theme/motion";

// Item exibido nesta secao — ou vem do Content Repository (Servico ->
// Profissional/Midia, evolucao de schema 2026-07-21) ou do fallback local
// derivado de packages/specialists/data.ts (ver app/page.tsx, mesma regra
// de propriedade por dominio do FAQ: Repository ganha inteiro assim que
// tiver >=1 Servico pro cliente, senao cai pro fallback inteiro).
export interface EspecialidadeExibida {
  titulo: string;
  texto: string;
  especialista: string;
  imagemSrc?: string;
  imagemAlt?: string;
}

// Mesmo ensaio fotográfico do EspacoSection — uma foto grande por vez — mas
// aqui cada bloco carrega o procedimento + quem faz.
export function TreatmentsSection({ especialidades }: { especialidades: EspecialidadeExibida[] }) {
  return (
    <section id="especialidades" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Nossas especialidades
        </h2>
        <p className="mx-auto mt-4 max-w-md text-bless-gray">
          Cada procedimento pensado pra valorizar sua essência — nunca em série.
        </p>
      </motion.div>

      <div className="flex flex-col gap-28 md:gap-40">
        {especialidades.map((item, i) => (
          <motion.div
            key={`${item.especialista}-${item.titulo}`}
            {...scaleInViewport}
            className="relative mx-auto h-[80vh] w-full max-w-[1600px] overflow-hidden md:px-6"
          >
            <div className="relative h-full w-full overflow-hidden md:rounded-sm">
              {item.imagemSrc ? (
                <Image
                  src={item.imagemSrc}
                  alt={item.imagemAlt ?? item.titulo}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Foto de ${item.titulo} — em produção`}
                  className="flex h-full w-full items-center justify-center bg-bless-nude text-bless-primaria-dark/50"
                >
                  <span className="font-display text-sm">Foto de {item.titulo} — em produção</span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bless-black/70 to-transparent px-8 py-10 md:px-12">
                <span className="text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
                  {item.especialista}
                </span>
                <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{item.titulo}</h3>
                <p className="mt-2 max-w-md text-sm text-white/80">{item.texto}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
