import type { PROCEDIMENTOS } from "@forms/procedimentos";

// PRD seção 3: Eliana e Hair Stylist têm papéis de negócio diferentes.
// "conversion" = motor de crescimento, mídia paga, formulário completo.
// "authority" = construção de marca/autoridade, sem captação ativa, sem formulário.
export type SpecialistVariant = "conversion" | "authority";

export interface SpecialistBeneficio {
  icone: string;
  titulo: string;
  texto: string;
}

export interface SpecialistFaqItem {
  pergunta: string;
  resposta: string;
}

// Bless_Documentacao_de_Marca.pdf: "gold" = paleta Bless Hair & Care
// (marca-mãe); "wine" = paleta Sobrancelhas Bless (sub-marca de Eliana).
// Próximos especialistas usam a paleta de expansão reservada (seção 4.1).
export type SpecialistBrandTheme = "gold" | "wine" | "expansao-1" | "expansao-2" | "expansao-3";

export interface Specialist {
  slug: string;
  nome: string;
  papel: string;
  areaLabel: string;
  variant: SpecialistVariant;
  brandTheme: SpecialistBrandTheme;
  bio: string;
  imagemAlt: string;
  imagemSrc?: string;
  procedimentos: SpecialistBeneficio[];
  faq: SpecialistFaqItem[];
  ctaTeaser: string;
  ctaPagina: string;
  origem: string;
  procedimentoPreSelecionado?: (typeof PROCEDIMENTOS)[number];
  waMensagemPadrao: string;
  // Enquanto o nome/autorização de imagem não forem confirmados (PRD item 8.1),
  // a entrada existe no código mas não aparece no site público.
  published: boolean;
}
