"use client";

import { motion } from "framer-motion";
import { fadeUpViewport } from "@theme/motion";

interface ManifestoProps {
  manifesto: string;
  manifestoSub: string;
}

// Direção "quiet luxury" (2026-07-17): tela quase vazia, uma frase só —
// nada de grid de ícones/cards aqui. Muito espaço, poucas palavras.
export function Manifesto({ manifesto, manifestoSub }: ManifestoProps) {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-[220px] text-center">
      <motion.p
        {...fadeUpViewport}
        className="max-w-2xl font-display text-3xl leading-snug font-medium text-brand-ink md:text-5xl"
      >
        {manifesto}
      </motion.p>
      <motion.p
        {...fadeUpViewport}
        className="mt-6 max-w-sm text-sm text-brand-gray"
      >
        {manifestoSub}
      </motion.p>
    </section>
  );
}
