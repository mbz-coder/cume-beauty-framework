import type { Metadata } from "next";
import { Manifesto } from "@sections/Manifesto";
import { CTASection } from "@sections/CTASection";
import { buildMetadata } from "@seo/metadata";
import { buscarConteudoRepository, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";

export async function generateMetadata(): Promise<Metadata> {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  return buildMetadata({
    title: "Sobre a Bless Hair & Care",
    description:
      "Conheça a Bless Hair & Care: estúdio de estética e cabelo em Pirituba, Zona Oeste de São Paulo, guiado por avaliação e resultado, nunca por promoção.",
    path: "/sobre",
    dominio: repository?.dominioPrincipal ?? undefined,
    siteName: repository?.hero.nome,
  });
}

// Sobre/Manifesto (2026-07-23), item 5 da fila. Fallback local espelha o
// hardcode anterior exatamente. H1 fica fixo no template (decisao explicita
// do usuario) -- so o paragrafo narrativo e o Manifesto vem do Repository.
const sobreFallback = {
  manifesto: "Você merece gostar do reflexo que vê todos os dias.",
  manifestoSub: "Estética, cabelo e autoestima — tratados com a mesma técnica, o mesmo cuidado.",
  sobreTexto:
    "A Bless nasceu em Pirituba, Zona Oeste de São Paulo, pra ser o lugar onde sobrancelha, laser, pele e autoestima são tratados com a mesma seriedade: nada de procedimento padrão, nada de promessa vazia. Cada cliente começa pela avaliação — é ela que direciona o cuidado certo, sessão a sessão.",
};

export default async function SobrePage() {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  const sobre = {
    manifesto: repository?.hero.manifesto ?? sobreFallback.manifesto,
    manifestoSub: repository?.hero.manifestoSub ?? sobreFallback.manifestoSub,
    sobreTexto: repository?.hero.sobreTexto ?? sobreFallback.sobreTexto,
  };

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h1 className="font-display text-4xl text-brand-ink md:text-5xl">
          Beleza que cuida, <span className="text-brand-primaria">de verdade</span>
        </h1>
        <p className="mt-6 text-lg text-brand-ink/75">{sobre.sobreTexto}</p>
      </section>

      <Manifesto manifesto={sobre.manifesto} manifestoSub={sobre.manifestoSub} />

      <CTASection
        titulo="Vem conhecer a Bless"
        sub="Agende sua avaliação e sinta na prática a diferença de um atendimento pensado pra você."
        origem="site-sobre"
      />
    </>
  );
}
