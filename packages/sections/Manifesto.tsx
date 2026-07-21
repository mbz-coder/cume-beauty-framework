"use client";

import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";

// Direção "quiet luxury" (2026-07-17): tela quase vazia, uma frase só —
// nada de grid de ícones/cards aqui. Muito espaço, poucas palavras.
export function Manifesto() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-[220px] text-center">
      <motion.p
        {...fadeUpViewport}
        className="max-w-2xl font-display text-3xl leading-snug font-medium text-brand-ink md:text-5xl"
      >
        Você merece gostar do reflexo que vê todos os dias.
      </motion.p>
      <motion.p
        {...fadeUpViewport}
        className="mt-6 max-w-sm text-sm text-brand-gray"
      >
        Estética, cabelo e autoestima — tratados com a mesma técnica, o mesmo cuidado.
      </motion.p>
    </section>
  );
}
