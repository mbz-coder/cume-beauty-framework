"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";
import { getPublishedSpecialists } from "@specialists/data";

// Uma narrativa só ("Especialistas"), não duas seções separadas tipo
// departamento. Jonathan à esquerda (impacto, editorial), Eliana à direita
// (acolhimento, conduz pro agendamento) — ordem definida em @specialists/data.
// Hover é discreto de propósito: "luxo é discrição" — scale 1.02–1.04, linha
// dourada aparecendo, texto subindo poucos pixels, nada chamativo.
export function SpecialistsTeaser() {
  const specialists = getPublishedSpecialists();
  if (specialists.length === 0) return null;

  return (
    <section className="py-32 md:py-[220px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-20 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Especialistas
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-bless-gray">
          Cada transformação começa pelas mãos de quem entende que beleza também é cuidado.
        </p>
      </motion.div>

      <div className={`grid gap-px bg-border ${specialists.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {specialists.map((specialist) => (
          <Link
            key={specialist.slug}
            href={`/especialistas/${specialist.slug}`}
            className="group relative block h-[75vh] overflow-hidden bg-bless-nude"
          >
            {specialist.imagemHomeSrc ? (
              <Image
                src={specialist.imagemHomeSrc}
                alt={specialist.imagemHomeAlt ?? specialist.imagemAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ objectPosition: specialist.imagemHomePosition ?? "50% 50%" }}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-sm text-bless-gray">
                  Foto de {specialist.nome} — em produção
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />

            <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-center transition-transform duration-500 ease-out group-hover:-translate-y-1 md:text-left">
              <span
                className="mb-4 block h-px w-10 scale-x-0 bg-bless-gold-light opacity-0 transition-all duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100 md:mx-0"
                aria-hidden
              />
              <h3 className="font-display text-4xl font-medium text-white">{specialist.nome}</h3>
              <span className="mt-1 block text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
                {specialist.papel}
              </span>
              <p className="mx-auto mt-3 max-w-sm text-sm text-white/85 md:mx-0">{specialist.descricaoCurta}</p>
              <span className="mt-4 inline-block text-xs font-medium tracking-widest text-white uppercase">
                Conhecer
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
