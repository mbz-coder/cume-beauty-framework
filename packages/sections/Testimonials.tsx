"use client";

import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";

interface Depoimento {
  texto: string;
  autor: string;
  placeholder?: boolean;
}

export function Testimonials({ depoimentos }: { depoimentos: Depoimento[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <motion.h2 {...fadeUpViewport} className="text-center font-display text-3xl text-bless-ink md:text-4xl">
        Quem já passou pela Bless
      </motion.h2>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {depoimentos.map((depoimento, i) => (
          <motion.figure
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="rounded-xl border border-border bg-bless-nude/30 p-8"
          >
            <blockquote className="font-display text-lg text-bless-ink italic">
              &ldquo;{depoimento.texto}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-bless-ink/60">
              — {depoimento.autor}
              {depoimento.placeholder && (
                <span className="ml-2 rounded-full bg-bless-primaria/10 px-2 py-0.5 text-xs text-bless-primaria-dark">
                  em produção
                </span>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
