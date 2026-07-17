import type { Variants } from "framer-motion";

// Direção "quiet luxury" (2026-07-17): fade + blur leve + scale sutil,
// mais lento que o padrão anterior — nada girando, nada voando.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const fadeUpViewport = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: fadeUp,
} as const;

// Fotografia editorial entrando com leve zoom-out (scale 1.05 → 1).
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export const scaleInViewport = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
  variants: scaleIn,
} as const;
