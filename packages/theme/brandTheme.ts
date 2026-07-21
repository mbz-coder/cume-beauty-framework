import { buscarBrandIdentity } from "@mbz-coder/cume-content-sdk";

// Seam pro CUME Brand & Content Engine (em desenvolvimento em paralelo,
// 2026-07-21) -- o Website Builder deve CONSUMIR marca, nunca decidir como
// uma marca funciona. Hoje getBrandTheme() retorna valores fixos (a
// identidade da Bless); quando o Brand Engine estiver pronto, so a
// implementacao desta funcao muda (passa a ler BrandIdentity via
// cume-content-sdk) -- nenhum consumidor (Header, Hero, etc.) precisa mudar,
// porque todos dependem do FORMATO de BrandTheme, nao de onde ele vem. Por
// isso a interface ja nasce no shape que o Brand Engine vai entregar, mesmo
// com varios campos fixos/opcionais hoje.
//
// Nao implementa CSS custom properties nem theming dinamico ainda --
// decisao deliberada pra nao desenhar esse mecanismo duas vezes antes do
// Brand Engine definir o formato real de BrandIdentity.
export interface BrandTheme {
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  typography: {
    display?: string;
    body?: string;
  };
  logo?: string;
  favicon?: string;
  borderRadius?: string;
  spacing?: {
    sectionY: { desktop: string; mobile: string };
    containerMax: string;
  };
  voice?: {
    tom?: string;
  };
}

const BLESS_FALLBACK: BrandTheme = {
  colors: {
    primary: "#B8935F",
    secondary: "#F3E5D8",
    accent: "#8A6D3B",
  },
  typography: {
    display: "var(--font-playfair)",
    body: "var(--font-jost)",
  },
  borderRadius: "0.125rem",
  spacing: {
    sectionY: { desktop: "128px", mobile: "64px" },
    containerMax: "1400px",
  },
};

// Primeira implementacao real (CUME Brand & Content Engine, Fase 0.5,
// 2026-07-21) — consome buscarBrandIdentity(slug) do cume-content-sdk,
// que so retorna BrandIdentity com status=APROVADO (gate de aprovacao no
// Brand Analyst). Falha de rede/API fora do ar/ainda nao aprovado -> null
// -> cai pro fallback hardcoded da Bless inteiro, nunca quebra a pagina
// (mesmo contrato de todo consumidor do cume-content-sdk).
//
// favicon/borderRadius/spacing continuam hardcoded de proposito: sao
// tokens de design-system/layout, nao algo que o Brand Analyst consegue
// diagnosticar a partir de logo/fotos — por isso BrandTheme ja declara
// eles como opcionais.
export async function getBrandTheme(slug: string = "bless"): Promise<BrandTheme> {
  const brand = await buscarBrandIdentity(slug);
  if (!brand) return BLESS_FALLBACK;

  return {
    colors: {
      primary: brand.paletaPrimaria[0] ?? BLESS_FALLBACK.colors.primary,
      secondary: brand.paletaSecundaria[0] ?? BLESS_FALLBACK.colors.secondary,
      accent: brand.paletaPrimaria[1] ?? brand.paletaSecundaria[1] ?? BLESS_FALLBACK.colors.accent,
    },
    typography: {
      display: brand.tipografiaTitulo ?? BLESS_FALLBACK.typography.display,
      body: brand.tipografiaTexto ?? BLESS_FALLBACK.typography.body,
    },
    logo: brand.logoUrl ?? undefined,
    borderRadius: BLESS_FALLBACK.borderRadius,
    spacing: BLESS_FALLBACK.spacing,
    voice: {
      tom: brand.tomVoz?.adjetivos?.join(", "),
    },
  };
}
