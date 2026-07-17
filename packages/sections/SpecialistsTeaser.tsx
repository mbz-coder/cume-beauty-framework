"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";
import { getPublishedSpecialists } from "@specialists/data";

// PRD (2026-07-16, redefinição de posicionamento): Bless é marca guarda-chuva
// de duas especialidades — a apresentação é simétrica (os dois aparecem aqui
// com o mesmo peso), mesmo que o investimento em mídia paga não seja (só a
// Eliana roda campanha; o Hair Stylist constrói autoridade, não captação).
export function SpecialistsTeaser() {
  const specialists = getPublishedSpecialists();
  if (specialists.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <motion.h2 {...fadeUpViewport} className="text-center font-display text-3xl text-bless-ink md:text-4xl">
          Conheça nossos especialistas
        </motion.h2>

        <div
          className={`mx-auto mt-16 grid max-w-4xl gap-8 ${
            specialists.length === 1 ? "grid-cols-1 justify-items-center" : "md:grid-cols-2"
          }`}
        >
          {specialists.map((specialist, i) => (
            <motion.div
              key={specialist.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="w-full max-w-sm rounded-2xl border border-border bg-bless-nude/20 p-8 text-center"
            >
              <span className="text-xs font-medium tracking-wide text-bless-primaria-dark uppercase">
                {specialist.papel}
              </span>
              <h3 className="mt-2 font-display text-2xl text-bless-ink">{specialist.nome}</h3>
              <p className="mt-3 text-sm text-bless-ink/70">{specialist.areaLabel}</p>

              <Link
                href={`/especialistas/${specialist.slug}`}
                className="mt-6 inline-block text-sm font-medium text-bless-primaria hover:text-bless-primaria-dark hover:underline"
              >
                {specialist.variant === "conversion" ? "Agendar estética" : "Conhecer o trabalho"} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
