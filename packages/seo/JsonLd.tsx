export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// SEO (2026-07-23), item 4 da fila -- telephone/address/url agora vem do
// Content Repository (Cliente.whatsappPrincipal/cidade/estado,
// ClienteInfraestrutura.dominioPrincipal), com fallback pro dado real da
// Bless (dominio fallback corrigido -- "blesshairecare", nao
// "blesshaircare", confirmado como o real em producao).
const DOMINIO_FALLBACK = "blesshairecare.com.br";

export function localBusinessSchema(overrides?: {
  nome?: string;
  whatsappPrincipal?: string;
  cidade?: string;
  estado?: string;
  dominio?: string;
}) {
  const dominio = overrides?.dominio ?? DOMINIO_FALLBACK;
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: overrides?.nome ?? "Bless Hair & Care",
    image: `https://${dominio}/og-image.jpg`,
    telephone: `+${overrides?.whatsappPrincipal ?? "5511967466085"}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: overrides?.cidade ?? "São Paulo",
      addressRegion: overrides?.estado ?? "SP",
      addressCountry: "BR",
    },
    url: `https://${dominio}`,
  };
}

// SEO automatico (2026-07-21) -- gerado a partir do Faq real do Content
// Repository (mesmo dado que ja alimenta o FAQSection), sem nenhum campo
// especifico de cliente/nicho.
export function faqPageSchema(faq: { pergunta: string; resposta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}

// SEO automatico (2026-07-21) -- um Service por Servico ativo do Content
// Repository, usando seoTitle/seoDescription quando presentes (evolucao do
// schema Servico) e caindo pra nome/descricao quando ainda nao preenchidos.
export function serviceListSchema(
  servicos: {
    nome: string;
    descricao: string | null;
    descricaoCurta?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  }[]
) {
  return servicos.map((servico) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: servico.seoTitle ?? servico.nome,
    description: servico.seoDescription ?? servico.descricaoCurta ?? servico.descricao ?? undefined,
  }));
}
