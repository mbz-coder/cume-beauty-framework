"use client";

import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";

interface Beneficio {
  icone: string;
  titulo: string;
  texto: string;
}

interface ServicesGridProps {
  titulo: string;
  beneficios: Beneficio[];
}

export function ServicesGrid({ titulo, beneficios }: ServicesGridProps) {
  return (
    <section className="border-b border-border bg-brand-nude/20">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <motion.h2
          {...fadeUpViewport}
          className="text-center font-display text-3xl text-brand-ink md:text-4xl"
        >
          {titulo}
        </motion.h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((beneficio, i) => (
            <motion.div
              key={beneficio.titulo}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="rounded-xl border border-border bg-background p-6"
            >
              <span className="text-3xl" aria-hidden>
                {beneficio.icone}
              </span>
              <h3 className="mt-4 font-display text-lg text-brand-ink">{beneficio.titulo}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{beneficio.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
