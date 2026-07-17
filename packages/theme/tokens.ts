// Tokens herdados de cume-lp-system/config/clientes/bless.ts — não reinventar.
// Cores e tipografia refletidas também em CSS custom properties (app/globals.css).
export const blessTheme = {
  colors: {
    primaria: "#B8935F",
    primariaDark: "#8A6D3B",
    nude: "#F3E5D8",
    ink: "#2B2420",
  },
  fonts: {
    display: "var(--font-playfair)",
    body: "var(--font-jost)",
  },
  spacing: {
    sectionY: { desktop: "128px", mobile: "64px" },
    containerMax: "1400px",
  },
  whatsapp: "5511967466085",
  instagram: "sobrancelhasbless",
} as const;
