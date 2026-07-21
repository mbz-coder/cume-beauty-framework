import type { Metadata } from "next";
import { Hero } from "@sections/Hero";
import { SpecialistsTeaser } from "@sections/SpecialistsTeaser";
import { TreatmentsSection, type EspecialidadeExibida } from "@sections/TreatmentsSection";
import { getPublishedSpecialists } from "@specialists/data";
import { ResultadosSection } from "@sections/ResultadosSection";
import { EspacoSection } from "@sections/EspacoSection";
import { Manifesto } from "@sections/Manifesto";
import { EditorialPause } from "@sections/EditorialPause";
import { Testimonials } from "@sections/Testimonials";
import { FAQSection } from "@sections/FAQSection";
import { CTASection } from "@sections/CTASection";
import { JsonLd, localBusinessSchema } from "@seo/JsonLd";
import { buildMetadata } from "@seo/metadata";
import { buscarConteudoRepository, escolherOuFallback, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";

export const metadata: Metadata = buildMetadata({
  title: "Bless Hair & Care | Beleza que cuida — Pirituba, Zona Oeste SP",
  description:
    "Sobrancelha, laser, pele e autoestima — tudo com avaliação antes de qualquer procedimento. Nada aqui é padrão.",
  path: "/",
});

// FAQ hardcoded aqui é o fallback local — usado só enquanto o Content
// Repository não tiver FAQ cadastrado pra este cliente (ver
// lib/content/contentProvider.ts). Hoje o Repository já tem FAQ real da
// Bless em produção, então na prática esse array só entra em cena se a
// API do Content Repository cair.
const faqFallback = [
  {
    pergunta: "Preciso saber exatamente o que quero antes de agendar?",
    resposta: "Não. A avaliação existe justamente pra isso — você chega com a dúvida, sai com o protocolo certo.",
  },
  {
    pergunta: "Vocês fazem promoção ou desconto?",
    resposta: "Não trabalhamos com desconto. Quando faz sentido dar algo a mais, é brinde ou upgrade — nunca abaixamos o valor do serviço.",
  },
  {
    pergunta: "Como funciona o primeiro atendimento?",
    resposta: "Começa sempre por uma avaliação — entendemos sua pele, sua rotina e seu objetivo antes de indicar qualquer procedimento.",
  },
];

// Fallback local pra "Nossas especialidades" — usado só enquanto o Content
// Repository não tiver Servico cadastrado pra este cliente (mesma regra de
// dominio do FAQ acima). Deriva de packages/specialists/data.ts, igual o
// comportamento anterior a esta mudança.
function especialidadesFallback(): EspecialidadeExibida[] {
  return getPublishedSpecialists().flatMap((specialist) =>
    specialist.procedimentos.map((procedimento) => ({
      titulo: procedimento.titulo,
      texto: procedimento.texto,
      imagemSrc: procedimento.imagemSrc,
      imagemAlt: procedimento.imagemAlt,
      especialista: specialist.nome,
    }))
  );
}

export default async function HomePage() {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  const faq = escolherOuFallback(
    repository?.faq
      .slice()
      .sort((a, b) => a.ordem - b.ordem)
      .map((f) => ({ pergunta: f.pergunta, resposta: f.resposta })),
    faqFallback
  );
  const especialidades = escolherOuFallback(
    repository?.servicos
      .filter((servico) => servico.ativo)
      .slice()
      .sort((a, b) => a.ordem - b.ordem)
      .map((servico) => ({
        titulo: servico.nome,
        texto: servico.descricaoCurta ?? servico.descricao ?? "",
        imagemSrc: servico.midias[0]?.url,
        imagemAlt: servico.nome,
        especialista: servico.profissionais[0]?.nome ?? "Equipe Bless",
      })),
    especialidadesFallback()
  );

  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <Hero
        badge="Bless"
        headline={["A beleza que respeita quem você é."]}
        sub="Cada detalhe pensado para valorizar sua essência — muito além de um procedimento."
        ctaPrincipal="Agendar avaliação"
        ctaPrincipalHref="/contato"
        youtubeId="Hf6abfL1la4"
      />

      <Manifesto />

      <EditorialPause
        src="/images/lifestyle/pausa-editorial.jpg"
        alt="Atendimento na Bless Hair & Care"
      />

      <SpecialistsTeaser />

      <TreatmentsSection especialidades={especialidades} />

      <ResultadosSection />

      <EspacoSection />

      <Testimonials
        depoimentos={[
          { texto: "Trecho placeholder — trocar por depoimento real da Eliana.", autor: "Cliente Bless — nome a confirmar", placeholder: true },
          { texto: "Trecho placeholder — trocar por depoimento real da Eliana.", autor: "Cliente Bless — nome a confirmar", placeholder: true },
        ]}
      />

      <FAQSection faq={faq} />

      <CTASection
        titulo="Agende sua avaliação"
        sub="Conta pra gente o que você procura — a equipe da Bless confirma o horário pelo WhatsApp."
        origem="site-home"
      />
    </>
  );
}
