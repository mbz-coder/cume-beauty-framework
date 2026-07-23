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
import { JsonLd, localBusinessSchema, faqPageSchema, serviceListSchema } from "@seo/JsonLd";
import { buildMetadata } from "@seo/metadata";
import { buscarConteudoRepository, escolherOuFallback, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";

const metaFallback = {
  title: "Bless Hair & Care | Beleza que cuida — Pirituba, Zona Oeste SP",
  description:
    "Sobrancelha, laser, pele e autoestima — tudo com avaliação antes de qualquer procedimento. Nada aqui é padrão.",
};

// SEO automatico (2026-07-21) -- ConfiguracaoSeo (metaTituloPadrao/
// metaDescricaoPadrao) do Content Repository alimenta o <title>/<meta
// description> quando presente; cai pro fallback hardcoded quando o
// Repository nao tem SEO cadastrado ainda pra este cliente (mesma regra de
// dominio do FAQ/Servicos).
export async function generateMetadata(): Promise<Metadata> {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  return buildMetadata({
    title: repository?.seo?.metaTitulo ?? metaFallback.title,
    description: repository?.seo?.metaDescricao ?? metaFallback.description,
    path: "/",
    dominio: repository?.dominioPrincipal ?? undefined,
    siteName: repository?.hero.nome,
  });
}

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

const WHATSAPP_FALLBACK = "5511967466085";
const manifestoFallback = {
  manifesto: "Você merece gostar do reflexo que vê todos os dias.",
  manifestoSub: "Estética, cabelo e autoestima — tratados com a mesma técnica, o mesmo cuidado.",
};

// Resultados/Espaco (2026-07-23), item 6 da fila. Fallback local espelha o
// hardcode anterior exatamente -- so entra em cena se o Repository cair.
const fotosEspacoFallback = [
  { src: "/images/espaco/IMG_2068.PNG", alt: "Estação de atendimento da Bless, com poltronas e espelho" },
  { src: "/images/espaco/IMG_2069.PNG", alt: "Salão da Bless com lustres de cristal e paredes de tijolo aparente" },
  { src: "/images/espaco/WhatsApp Image 2026-07-16 at 18.02.58.jpeg", alt: "Detalhe do espaço da Bless Hair & Care" },
  { src: "/images/espaco/WhatsApp Image 2026-07-16 at 18.07.04.jpeg", alt: "Detalhe do espaço da Bless Hair & Care" },
  { src: "/images/espaco/IMG_2934.jpg", alt: "Balcão de atendimento da Bless Hair & Care" },
  { src: "/images/espaco/IMG_2935.jpg", alt: "Fachada e entrada da Bless Hair & Care" },
  { src: "/images/espaco/loja-de-roupa.jpg", alt: "Loja de roupa dentro da Bless Hair & Care" },
];

const resultadosFallback = [
  {
    tratamento: "Lavieen / Protocolo Pele Nova",
    antes: { src: "/images/resultados/pescoco-antes.jpg", alt: "Pescoço e colo antes do protocolo" },
    depois: { src: "/images/resultados/pescoco-depois.jpg", alt: "Pescoço e colo depois do protocolo" },
  },
  {
    tratamento: "Lavieen / Protocolo Pele Nova",
    antes: { src: "/images/resultados/rosto-antes.jpg", alt: "Rosto de perfil antes do protocolo" },
    depois: { src: "/images/resultados/rosto-depois.jpg", alt: "Rosto de frente depois do protocolo" },
  },
];

// Pareia Midia por categoria+tag: "espaco" e uma galeria solta (ordenada
// pela tag "ordem-N"); "resultado-antes"/"resultado-depois" formam pares
// pela tag compartilhada ("par-N"), com o nome do tratamento vindo do
// Servico ligado por servicoId.
function montarFotosEspaco(repository: Awaited<ReturnType<typeof buscarConteudoRepository>>) {
  return (repository?.midias ?? [])
    .filter((m) => m.categoria === "espaco")
    .slice()
    .sort((a, b) => (a.tags[0] ?? "").localeCompare(b.tags[0] ?? ""))
    .map((m) => ({ src: m.url, alt: m.altText ?? "" }));
}

function montarResultados(repository: Awaited<ReturnType<typeof buscarConteudoRepository>>) {
  const midias = repository?.midias ?? [];
  const antes = midias.filter((m) => m.categoria === "resultado-antes");
  const depois = midias.filter((m) => m.categoria === "resultado-depois");
  const nomeServico = new Map(repository?.servicos.map((s) => [s.id, s.nome]) ?? []);

  return antes
    .map((a) => {
      const par = a.tags[0];
      const d = depois.find((d) => d.tags[0] === par);
      if (!d) return null;
      return {
        tratamento: (a.servicoId && nomeServico.get(a.servicoId)) ?? "",
        antes: { src: a.url, alt: a.altText ?? "" },
        depois: { src: d.url, alt: d.altText ?? "" },
      };
    })
    .filter((par): par is NonNullable<typeof par> => par !== null);
}

export default async function HomePage() {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  const whatsappPrincipal = repository?.hero.whatsappPrincipal ?? WHATSAPP_FALLBACK;
  const manifesto = repository?.hero.manifesto ?? manifestoFallback.manifesto;
  const manifestoSub = repository?.hero.manifestoSub ?? manifestoFallback.manifestoSub;
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
  const fotosEspaco = escolherOuFallback(montarFotosEspaco(repository), fotosEspacoFallback);
  const resultados = escolherOuFallback(montarResultados(repository), resultadosFallback);

  return (
    <>
      <JsonLd
        data={localBusinessSchema({
          nome: repository?.hero.nome,
          whatsappPrincipal,
          cidade: repository?.hero.cidade ?? undefined,
          estado: repository?.hero.estado ?? undefined,
          dominio: repository?.dominioPrincipal ?? undefined,
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      {serviceListSchema(
        repository?.servicos.filter((servico) => servico.ativo) ?? especialidades.map((e) => ({ nome: e.titulo, descricao: e.texto }))
      ).map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      <Hero
        badge="Bless"
        headline={["A beleza que respeita quem você é."]}
        sub="Cada detalhe pensado para valorizar sua essência — muito além de um procedimento."
        ctaPrincipal="Agendar avaliação"
        ctaPrincipalHref="/contato"
        youtubeId="Hf6abfL1la4"
      />

      <Manifesto manifesto={manifesto} manifestoSub={manifestoSub} />

      <EditorialPause
        src="/images/lifestyle/pausa-editorial.jpg"
        alt="Atendimento na Bless Hair & Care"
      />

      <SpecialistsTeaser whatsappPrincipal={whatsappPrincipal} />

      <TreatmentsSection especialidades={especialidades} />

      <ResultadosSection resultados={resultados} />

      <EspacoSection fotos={fotosEspaco} />

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
