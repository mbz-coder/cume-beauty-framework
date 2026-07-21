// Config do site que nao e identidade de marca (contato/redes/spacing).
// Cores e tipografia moraram aqui antes -- movidas pra brandTheme.ts (ver
// getBrandTheme()) porque isso E identidade de marca, e o Website Builder
// deve consumir marca, nao decidi-la (CUME Brand & Content Engine).
export const siteConfig = {
  spacing: {
    sectionY: { desktop: "128px", mobile: "64px" },
    containerMax: "1400px",
  },
  whatsapp: "5511967466085",
  instagram: "sobrancelhasbless",
} as const;
