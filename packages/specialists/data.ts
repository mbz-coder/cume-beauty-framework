import type { Specialist } from "@specialists/types";

// Config-driven pra permitir adicionar uma nova especialidade (manicure, lash
// designer etc.) sem reestruturar o site — só uma entrada nova aqui, mais a
// página em app/especialistas/[slug]/page.tsx renderiza sozinha.
export const SPECIALISTS: Record<string, Specialist> = {
  eliana: {
    slug: "eliana",
    nome: "Eliana Paz",
    papel: "Especialista em Estética Avançada",
    areaLabel: "Micropigmentação, laser, sobrancelhas e estética facial",
    descricaoCurta: "Micropigmentação, laser e tratamentos faciais para valorizar sua beleza com naturalidade e tecnologia.",
    variant: "conversion",
    // Corrigido 2026-07-17: a identidade da Eliana é bege/dourado quente,
    // igual o resto da Bless (conferido nas artes reais dela) — não é uma
    // sub-marca vinho separada como o doc de marca original sugeria.
    brandTheme: "gold",
    bio: "Há anos cuidando da autoestima de clientes na Zona Oeste de São Paulo, a Eliana acredita em resultado com técnica — não em promessa vazia. Toda cliente nova começa pela avaliação, pra garantir que o protocolo indicado é o certo pra pele e o objetivo dela.",
    imagemAlt: "Eliana Paz, especialista em estética avançada",
    imagemSrc: "/images/especialistas/eliana/sobreelianadapaz.jpg",
    imagemHomeAlt: "Eliana atendendo uma cliente",
    imagemHomeSrc: "/images/especialistas/eliana/elianadapazhome.png",
    imagemHomePosition: "50% 15%",
    procedimentos: [
      {
        icone: "✨",
        titulo: "Design de Sobrancelha",
        texto: "Design personalizado pro seu formato de rosto.",
        imagemSrc: "/images/tratamentos/eliana-sobrancelha.jpg",
        imagemAlt: "Eliana fazendo design de sobrancelha em uma cliente",
      },
      { icone: "💉", titulo: "Micropigmentação", texto: "Técnica avaliada caso a caso, sem padrão fixo." },
      {
        icone: "⚡",
        titulo: "Laser / Bless Day",
        texto: "Potência máxima segura desde a primeira sessão.",
        imagemSrc: "/images/tratamentos/eliana-laser.jpg",
        imagemAlt: "Eliana aplicando laser em uma cliente, com óculos de proteção",
      },
      {
        icone: "🌿",
        titulo: "Lavieen / Protocolo Pele Nova",
        texto: "Protocolo de renovação de pele sob avaliação.",
        imagemSrc: "/images/tratamentos/eliana-lavieen.jpg",
        imagemAlt: "Eliana aplicando protocolo facial em uma cliente",
      },
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
    descricaoCurta:
      "Transformações autorais, coloração e cortes personalizados para mulheres que buscam sofisticação e identidade.",
    variant: "authority",
    brandTheme: "gold",
    bio: "Agenda reduzida. Cada atendimento é realizado exclusivamente com horário marcado, permitindo dedicação total a cada transformação. Isso transmite exclusividade — não escassez.",
    imagemAlt: "Jonathan, hair stylist da Bless",
    imagemSrc: "/images/especialistas/jonathan/jhonsobre.png",
    imagemHomeAlt: "Jonathan finalizando um corte",
    imagemHomeSrc: "/images/especialistas/jonathan/jonathan-retrato.jpg",
    imagemHomePosition: "50% 12%",
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

// Jonathan primeiro (esquerda — foto de maior impacto, "fashion"), Eliana
// depois (direita — acolhedora, conduz pro agendamento). Ordem de leitura
// esquerda→direita é proposital, não é a ordem de definição do objeto acima.
const TEASER_ORDER = ["jonathan", "eliana"];

export function getPublishedSpecialists(): Specialist[] {
  return TEASER_ORDER.map((slug) => SPECIALISTS[slug]).filter((s) => s?.published);
}

export function getSpecialist(slug: string): Specialist | undefined {
  const specialist = SPECIALISTS[slug];
  return specialist?.published ? specialist : undefined;
}
