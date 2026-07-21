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
    <section className="mx-auto max-w-[1000px] px-6 py-40 md:py-[220px]">
      <motion.h2 {...fadeUpViewport} className="text-center font-display text-3xl text-brand-ink md:text-4xl">
        Histórias que começaram com uma dúvida
      </motion.h2>

      <div className="mt-20 flex flex-col gap-20 md:gap-24">
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
            className={`text-center ${i % 2 === 1 ? "md:pl-16" : "md:pr-16"}`}
          >
            <blockquote className="font-display text-2xl leading-snug text-brand-ink italic md:text-3xl">
              &ldquo;{depoimento.texto}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-brand-gray">
              — {depoimento.autor}
              {depoimento.placeholder && (
                <span className="ml-2 rounded-full bg-brand-primaria/10 px-2 py-0.5 text-xs text-brand-primaria-dark">
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
