"use client";

import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";

const PILARES = [
  {
    titulo: "Sem desconto, nunca",
    texto:
      "A Bless não compete por preço, compete por resultado. Quando faz sentido dar algo a mais, é brinde ou upgrade — nunca abaixamos o valor do serviço.",
  },
  {
    titulo: "Toda cliente começa pela avaliação",
    texto:
      "Nada de procedimento vendido sem avaliação prévia. É a avaliação que direciona o protocolo certo pra você, não o que a gente acha que você precisa.",
  },
  {
    titulo: "Escassez só quando é real",
    texto:
      "Quando dizemos que a agenda é limitada, é porque o equipamento ou o horário são de verdade — nunca um gatilho artificial de vendas.",
  },
];

export function Manifesto() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <motion.div {...fadeUpViewport} className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-bless-ink md:text-4xl">
            Naturalidade, técnica e cuidado — sem promessa vazia
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {PILARES.map((pilar, i) => (
            <motion.div
              key={pilar.titulo}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="text-center md:text-left"
            >
              <h3 className="font-display text-xl text-bless-primaria-dark">{pilar.titulo}</h3>
              <p className="mt-3 text-bless-ink/75">{pilar.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
