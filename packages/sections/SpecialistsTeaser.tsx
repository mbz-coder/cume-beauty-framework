"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";
import { getPublishedSpecialists } from "@specialists/data";

// Revista, não seção — split-screen lado a lado, imagem aproxima devagar no
// hover. "As pessoas compram pessoas antes de comprarem procedimento."
export function SpecialistsTeaser() {
  const specialists = getPublishedSpecialists();
  if (specialists.length === 0) return null;

  return (
    <section className="py-24 md:py-[180px]">
      <motion.p
        {...fadeUpViewport}
        className="px-6 pb-16 text-center text-xs font-medium tracking-[0.2em] text-bless-gray uppercase"
      >
        Nossa equipe
      </motion.p>

      <div className={`grid gap-px bg-border ${specialists.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {specialists.map((specialist) => (
          <Link
            key={specialist.slug}
            href={`/especialistas/${specialist.slug}`}
            className="group relative block h-[70vh] overflow-hidden bg-bless-nude"
          >
            {specialist.imagemSrc ? (
              <Image
                src={specialist.imagemSrc}
                alt={specialist.imagemAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-sm text-bless-gray">
                  Foto de {specialist.nome} — em produção
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" aria-hidden />

            <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-center md:text-left">
              <span className="text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
                {specialist.papel}
              </span>
              <h3 className="mt-2 font-display text-4xl font-medium text-white">{specialist.nome}</h3>
              <span className="mt-3 inline-block text-xs font-medium tracking-widest text-white uppercase underline-offset-4 group-hover:underline">
                {specialist.variant === "conversion" ? "Conhecer a história" : "Conhecer o trabalho"} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
