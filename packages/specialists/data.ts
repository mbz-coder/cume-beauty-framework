import type { Specialist } from "@specialists/types";

// Config-driven pra permitir adicionar uma nova especialidade (manicure, lash
// designer etc.) sem reestruturar o site — só uma entrada nova aqui, mais a
// página em app/especialistas/[slug]/page.tsx renderiza sozinha.
export const SPECIALISTS: Record<string, Specialist> = {
  eliana: {
    slug: "eliana",
    nome: "Eliana Paz",
    papel: "Especialista em estética facial e corporal",
    areaLabel: "Micropigmentação, laser, sobrancelhas e estética facial",
    variant: "conversion",
    brandTheme: "wine",
    bio: "Há anos cuidando da autoestima de clientes na Zona Oeste de São Paulo, a Eliana acredita em resultado com técnica — não em promessa vazia. Toda cliente nova começa pela avaliação, pra garantir que o protocolo indicado é o certo pra pele e o objetivo dela.",
    imagemAlt: "Eliana atendendo uma cliente",
    imagemSrc: "/images/especialistas/eliana/eliana-retrato.jpg",
    procedimentos: [
      { icone: "✨", titulo: "Design de Sobrancelha", texto: "Design personalizado pro seu formato de rosto." },
      { icone: "💉", titulo: "Micropigmentação", texto: "Técnica avaliada caso a caso, sem padrão fixo." },
      { icone: "⚡", titulo: "Laser / Bless Day", texto: "Potência máxima segura desde a primeira sessão." },
      { icone: "🌿", titulo: "Lavieen / Protocolo Pele Nova", texto: "Protocolo de renovação de pele sob avaliação." },
    ],
    faq: [
      {
        pergunta: "Preciso saber exatamente o que quero antes de agendar com a Eliana?",
        resposta: "Não. A avaliação existe justamente pra isso — você chega com a dúvida, sai com o protocolo certo.",
      },
      {
        pergunta: "Como funciona o primeiro atendimento?",
        resposta: "Começa sempre por uma avaliação — a Eliana entende sua pele, sua rotina e seu objetivo antes de indicar qualquer procedimento.",
      },
    ],
    ctaTeaser: "Agendar estética",
    ctaPagina: "Agende sua avaliação com a Eliana",
    origem: "site-especialista-eliana",
    waMensagemPadrao: "Oi Eliana! Vim pela página e quero agendar uma avaliação.",
    published: true,
  },

  jonathan: {
    slug: "jonathan",
    nome: "Jonathan",
    papel: "Hair Stylist",
    areaLabel: "Especialista em Loiros, Coloração, Corte e Tratamentos",
    variant: "authority",
    brandTheme: "gold",
    bio: "Com agenda consolidada ao longo dos anos, o Jonathan atende um número limitado de clientes pra manter a qualidade e o atendimento personalizado. Atendimento exclusivamente com horário marcado — as vagas são limitadas pela alta procura, não pela falta de espaço.",
    imagemAlt: "Jonathan finalizando um corte",
    imagemSrc: "/images/especialistas/jonathan/jonathan-retrato.jpg",
    procedimentos: [
      { icone: "🌟", titulo: "Loiros", texto: "Especialista em loiros — técnica autoral pra cada tom." },
      { icone: "🎨", titulo: "Coloração", texto: "Coloração e mechas com técnica autoral." },
      { icone: "✂️", titulo: "Corte", texto: "Cortes e transformações sob medida." },
      { icone: "💆", titulo: "Tratamentos", texto: "Cuidado que sustenta o resultado do corte e da cor." },
    ],
    faq: [
      {
        pergunta: "Como faço pra agendar com o Jonathan?",
        resposta: "Atendimento exclusivamente com horário marcado — a agenda é limitada pela alta procura. Fale com a gente pelo WhatsApp pra confirmar disponibilidade.",
      },
    ],
    ctaTeaser: "Conhecer o trabalho",
    ctaPagina: "Fale sobre seu próximo corte com o Jonathan",
    origem: "site-especialista-jonathan",
    waMensagemPadrao: "Oi! Vim pela página do Jonathan na Bless e queria saber mais.",
    published: true,
  },
};

export function getPublishedSpecialists(): Specialist[] {
  return Object.values(SPECIALISTS).filter((s) => s.published);
}

export function getSpecialist(slug: string): Specialist | undefined {
  const specialist = SPECIALISTS[slug];
  return specialist?.published ? specialist : undefined;
}
