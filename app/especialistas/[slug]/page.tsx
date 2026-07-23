import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecialistHero } from "@sections/SpecialistHero";
import { ServicesGrid } from "@sections/ServicesGrid";
import { FAQSection } from "@sections/FAQSection";
import { CTASection } from "@sections/CTASection";
import { buildMetadata } from "@seo/metadata";
import { buscarConteudoRepository, buscarProfissionalPorSlug, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";
import { getPublishedSpecialists, getSpecialist } from "@specialists/data";
import type { SpecialistBrandTheme, SpecialistVariant } from "@specialists/types";

// Website Engine, Profissional como entidade de conteudo propria
// (2026-07-22, ver docs/AUDITORIA_WEBSITE_ENGINE_2026-07-22.md em
// cume-os-app) — Content Repository e a fonte PRIMARIA agora
// (buscarProfissionalPorSlug); specialists/data.ts vira FALLBACK, mesmo
// padrao de FAQ/Servicos na Home (Repository ganha, mas queda de rede/API
// fora do ar/profissional ainda nao migrado nunca quebra a pagina).
//
// generateStaticParams continua usando o fallback local — nao existe
// endpoint publico de "listar profissionais por cliente" ainda, entao um
// profissional que exista SO no Repository renderiza sob demanda
// (dynamicParams do Next, default true), nao no build.
//
// variant/brandTheme ficam FORA do Content Repository de proposito
// (decisao de apresentacao, nao conteudo) — mapa local minimo por slug ate
// o Website Engine ter um conceito real de Section/Template Configuration.
const APRESENTACAO: Record<string, { variant: SpecialistVariant; brandTheme: SpecialistBrandTheme }> = {
  eliana: { variant: "conversion", brandTheme: "gold" },
  jonathan: { variant: "authority", brandTheme: "gold" },
};

interface ProfissionalView {
  nome: string;
  papel: string;
  bio: string;
  imagemSrc?: string;
  imagemAlt: string;
  variant: SpecialistVariant;
  brandTheme: SpecialistBrandTheme;
  procedimentos: { icone: string; titulo: string; texto: string }[];
  faq: { pergunta: string; resposta: string }[];
  ctaPagina: string;
  origem: string;
  waMensagemPadrao: string;
  seoTitle?: string;
  seoDescription?: string;
}

async function montarView(slug: string): Promise<ProfissionalView | null> {
  const apresentacao = APRESENTACAO[slug] ?? { variant: "conversion" as const, brandTheme: "gold" as const };

  const doRepository = await buscarProfissionalPorSlug(resolverSlugFromEnv(), slug);
  if (doRepository) {
    return {
      nome: doRepository.nome,
      papel: doRepository.cargo ?? "",
      bio: doRepository.bio ?? "",
      imagemSrc: doRepository.foto ?? undefined,
      imagemAlt: doRepository.fotoAlt ?? doRepository.nome,
      ...apresentacao,
      // icone generico — Servico nao modela icone/emoji (decisao deliberada,
      // ver auditoria: evitar campo especifico-de-Beauty no Content Repository).
      procedimentos: doRepository.servicos.map((s) => ({
        icone: "✓",
        titulo: s.nome,
        texto: s.descricaoCurta ?? s.descricao ?? "",
      })),
      faq: doRepository.faqs.map((f) => ({ pergunta: f.pergunta, resposta: f.resposta })),
      ctaPagina: doRepository.ctaTitulo ?? `Fale com ${doRepository.nome}`,
      origem: `site-especialista-${slug}`,
      waMensagemPadrao: doRepository.waMensagemPadrao ?? `Oi! Vim pela página de ${doRepository.nome} e queria saber mais.`,
      seoTitle: doRepository.seoTitle ?? undefined,
      seoDescription: doRepository.seoDescription ?? undefined,
    };
  }

  const fallback = getSpecialist(slug);
  if (!fallback) return null;
  return {
    nome: fallback.nome,
    papel: fallback.papel,
    bio: fallback.bio,
    imagemSrc: fallback.imagemSrc,
    imagemAlt: fallback.imagemAlt,
    variant: fallback.variant,
    brandTheme: fallback.brandTheme,
    procedimentos: fallback.procedimentos,
    faq: fallback.faq,
    ctaPagina: fallback.ctaPagina,
    origem: fallback.origem,
    waMensagemPadrao: fallback.waMensagemPadrao,
  };
}

export function generateStaticParams() {
  return getPublishedSpecialists().map((specialist) => ({ slug: specialist.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const [view, repository] = await Promise.all([montarView(slug), buscarConteudoRepository(resolverSlugFromEnv())]);
  if (!view) return {};

  return buildMetadata({
    title: view.seoTitle ?? `${view.nome} — ${view.papel} | Bless Hair & Care`,
    description: view.seoDescription ?? view.bio,
    path: `/especialistas/${slug}`,
    dominio: repository?.dominioPrincipal ?? undefined,
    siteName: repository?.hero.nome,
  });
}

const WHATSAPP_FALLBACK = "5511967466085";

export default async function SpecialistPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const [view, repository] = await Promise.all([montarView(slug), buscarConteudoRepository(resolverSlugFromEnv())]);
  if (!view) notFound();

  const whatsappPrincipal = repository?.hero.whatsappPrincipal ?? WHATSAPP_FALLBACK;
  const waHref = `https://wa.me/${whatsappPrincipal}?text=${encodeURIComponent(view.waMensagemPadrao)}`;

  // Página assume 100% a paleta do especialista (dourado ou vinho, nunca
  // misturado) — header/footer ficam fora desta div, sempre dourado institucional.
  return (
    <div className={view.brandTheme === "wine" ? "theme-sobrancelhas" : undefined}>
      <SpecialistHero
        variant={view.variant}
        nome={view.nome}
        papel={view.papel}
        bio={view.bio}
        imagemAlt={view.imagemAlt}
        imagemSrc={view.imagemSrc}
        ctaHref={view.variant === "conversion" ? "#agendar" : waHref}
      />

      {view.procedimentos.length > 0 && (
        <ServicesGrid titulo="Nossas especialidades" beneficios={view.procedimentos} />
      )}

      {view.faq.length > 0 && <FAQSection faq={view.faq} />}

      {view.variant === "conversion" ? (
        <CTASection
          titulo={view.ctaPagina}
          sub="Conta pra gente o que você procura — a equipe da Bless confirma o horário pelo WhatsApp."
          origem={view.origem}
        />
      ) : (
        <section className="bg-brand-ink">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
            <h2 className="font-display text-3xl text-white md:text-4xl">{view.ctaPagina}</h2>
            <p className="mt-4 text-white/70">
              Atendimento exclusivamente com horário marcado — fale direto pelo WhatsApp.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-md bg-brand-primaria px-8 py-3 font-medium text-white hover:bg-brand-primaria-dark"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
