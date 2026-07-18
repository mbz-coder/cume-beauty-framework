"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";
import { getPublishedSpecialists } from "@specialists/data";
import { blessTheme } from "@theme/tokens";

// Uma narrativa só ("Especialistas"), não duas seções separadas tipo
// departamento. Jonathan à esquerda (impacto, editorial), Eliana à direita
// (acolhimento, conduz pro agendamento) — ordem definida em @specialists/data.
// Hover é discreto de propósito: "luxo é discrição" — scale 1.02–1.04, linha
// dourada aparecendo, texto subindo poucos pixels, nada chamativo.
//
// Dois botões por card (2026-07-18, pedido do Moabe): "Conhecer {artigo}
// {nome}" (sempre vai pra página do especialista) + o CTA assimétrico de
// cada um (specialist.ctaTeaser) — Eliana capta ("Agendar avaliação", pula
// pro #agendar da própria Home), Jonathan não ("Conhecer o trabalho", vai
// pro WhatsApp) — agenda dele já é cheia, nunca prometer vaga que não existe.
export function SpecialistsTeaser() {
  const specialists = getPublishedSpecialists();
  if (specialists.length === 0) return null;

  return (
    <section id="especialistas" className="scroll-mt-16 py-40 md:py-[260px]">
      <motion.div {...fadeUpViewport} className="px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-medium tracking-wide text-bless-ink uppercase md:text-5xl">
          Especialistas
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-bless-gray">
          Cada transformação começa pelas mãos de quem entende que beleza também é cuidado.
        </p>
      </motion.div>

      <div className={`grid gap-px bg-border ${specialists.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {specialists.map((specialist) => {
          const waHref = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(specialist.waMensagemPadrao)}`;
          const isConversion = specialist.variant === "conversion";

          return (
            <div key={specialist.slug} className="group relative h-[80vh] overflow-hidden bg-bless-nude md:h-[85vh]">
              <Link
                href={`/especialistas/${specialist.slug}`}
                className="absolute inset-0"
                aria-label={`Conhecer ${specialist.artigo} ${specialist.nome}`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" aria-hidden />
              </Link>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-8 pb-12 text-center transition-transform duration-500 ease-out group-hover:-translate-y-1 md:text-left">
                <span
                  className="mb-4 block h-px w-10 scale-x-0 bg-bless-gold-light opacity-0 transition-all duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100 md:mx-0"
                  aria-hidden
                />
                <h3 className="font-display text-4xl font-medium text-white">{specialist.nome}</h3>
                <span className="mt-1 block text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
                  {specialist.papel}
                </span>
                <p className="mx-auto mt-3 max-w-sm text-sm text-white/85 md:mx-0">{specialist.descricaoCurta}</p>

                <div className="pointer-events-auto mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href={`/especialistas/${specialist.slug}`}
                    className="inline-flex h-11 items-center rounded-full border border-white/50 px-6 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-bless-ink"
                  >
                    Conhecer {specialist.artigo} {specialist.nome}
                  </Link>
                  {isConversion ? (
                    <Link
                      href="#agendar"
                      className="inline-flex h-11 items-center rounded-full border border-bless-gold-light/70 px-6 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-bless-primaria"
                    >
                      {specialist.ctaTeaser}
                    </Link>
                  ) : (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center rounded-full border border-bless-gold-light/70 px-6 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-bless-primaria"
                    >
                      {specialist.ctaTeaser}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
