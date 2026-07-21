export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// nome/telephone/address/url: o Content Repository ainda nao modela
// telefone/endereco/dominio do cliente (gap real, nao forcar) -- so `nome`
// (Cliente.nome, via repository.hero) ja pode vir do Repository hoje.
// Quando o Repository ganhar esses campos, so passar como parametro aqui.
export function localBusinessSchema(overrides?: { nome?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: overrides?.nome ?? "Bless Hair & Care",
    image: "https://blesshaircare.com.br/og-image.jpg",
    telephone: "+5511967466085",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pirituba, São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    url: "https://blesshaircare.com.br",
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
