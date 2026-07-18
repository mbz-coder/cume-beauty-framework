"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleInViewport } from "@theme/motion";

// Pausa puramente visual entre seções — sem título, sem texto, sem CTA.
// Pedido explícito do Moabe (revisão 2026-07-18): "foto ocupando praticamente
// a tela inteira, sem texto, só imagem, depois continua" — é isso que quebra
// o ritmo previsível de "seção → seção → seção" e dá sensação de revista, não
// de site. Usar com moderação — o efeito depende de ser raro na página.
export function EditorialPause({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div {...scaleInViewport} className="relative h-screen w-full overflow-hidden">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </motion.div>
  );
}
