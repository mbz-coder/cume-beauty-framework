import type { Metadata } from "next";
import { Manifesto } from "@sections/Manifesto";
import { CTASection } from "@sections/CTASection";
import { buildMetadata } from "@seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a Bless Hair & Care",
  description:
    "Conheça a Bless Hair & Care: estúdio de estética e cabelo em Pirituba, Zona Oeste de São Paulo, guiado por avaliação e resultado, nunca por promoção.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h1 className="font-display text-4xl text-brand-ink md:text-5xl">
          Beleza que cuida, <span className="text-brand-primaria">de verdade</span>
        </h1>
        <p className="mt-6 text-lg text-brand-ink/75">
          A Bless nasceu em Pirituba, Zona Oeste de São Paulo, pra ser o lugar onde sobrancelha,
          laser, pele e autoestima são tratados com a mesma seriedade: nada de procedimento
          padrão, nada de promessa vazia. Cada cliente começa pela avaliação — é ela que direciona
          o cuidado certo, sessão a sessão.
        </p>
      </section>

      <Manifesto />

      <CTASection
        titulo="Vem conhecer a Bless"
        sub="Agende sua avaliação e sinta na prática a diferença de um atendimento pensado pra você."
        origem="site-sobre"
      />
    </>
  );
}
