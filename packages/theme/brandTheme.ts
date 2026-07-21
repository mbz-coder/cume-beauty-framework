// Seam pro CUME Brand & Content Engine (em desenvolvimento em paralelo,
// 2026-07-21) -- o Website Builder deve CONSUMIR marca, nunca decidir como
// uma marca funciona. Hoje getBrandTheme() retorna valores fixos (a
// identidade da Bless); quando o Brand Engine estiver pronto, so a
// implementacao desta funcao muda (passa a ler BrandIdentity via
// cume-content-sdk) -- nenhum consumidor (Header, Hero, etc.) precisa mudar,
// porque todos dependem do formato de BrandTheme, nao de onde ele vem.
//
// Nao implementa CSS custom properties nem theming dinamico ainda --
// decisao deliberada pra nao desenhar esse mecanismo duas vezes antes do
// Brand Engine definir o formato real de BrandIdentity.
export interface BrandTheme {
  identity: {
    logo?: string;
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
    };
    typography: {
      display?: string;
      body?: string;
    };
    voice?: {
      tom?: string;
    };
  };
}

export function getBrandTheme(): BrandTheme {
  return {
    identity: {
      colors: {
        primary: "#B8935F",
        secondary: "#F3E5D8",
        accent: "#8A6D3B",
      },
      typography: {
        display: "var(--font-playfair)",
        body: "var(--font-jost)",
      },
    },
  };
}
