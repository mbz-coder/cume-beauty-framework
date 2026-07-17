import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecialistHero } from "@sections/SpecialistHero";
import { ServicesGrid } from "@sections/ServicesGrid";
import { FAQSection } from "@sections/FAQSection";
import { CTASection } from "@sections/CTASection";
import { buildMetadata } from "@seo/metadata";
import { blessTheme } from "@theme/tokens";
import { getPublishedSpecialists, getSpecialist } from "@specialists/data";

export function generateStaticParams() {
  return getPublishedSpecialists().map((specialist) => ({ slug: specialist.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const specialist = getSpecialist(slug);
  if (!specialist) return {};

  return buildMetadata({
    title: `${specialist.nome} — ${specialist.papel} | Bless Hair & Care`,
    description: specialist.bio,
    path: `/especialistas/${specialist.slug}`,
  });
}

export default async function SpecialistPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const specialist = getSpecialist(slug);
  if (!specialist) notFound();

  const waHref = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(specialist.waMensagemPadrao)}`;

  // Página assume 100% a paleta do especialista (dourado ou vinho, nunca
  // misturado) — header/footer ficam fora desta div, sempre dourado institucional.
  return (
    <div className={specialist.brandTheme === "wine" ? "theme-sobrancelhas" : undefined}>
      <SpecialistHero
        variant={specialist.variant}
        nome={specialist.nome}
        papel={specialist.papel}
        bio={specialist.bio}
        imagemAlt={specialist.imagemAlt}
        imagemSrc={specialist.imagemSrc}
        ctaHref={specialist.variant === "conversion" ? "#agendar" : waHref}
      />

      {specialist.procedimentos.length > 0 && (
        <ServicesGrid
          titulo={`Procedimentos com ${specialist.nome}`}
          beneficios={specialist.procedimentos}
        />
      )}

      {specialist.faq.length > 0 && <FAQSection faq={specialist.faq} />}

      {specialist.variant === "conversion" ? (
        <CTASection
          titulo={specialist.ctaPagina}
          sub="Conta pra gente o que você procura — a equipe da Bless confirma o horário pelo WhatsApp."
          origem={specialist.origem}
          procedimentoPreSelecionado={specialist.procedimentoPreSelecionado}
        />
      ) : (
        <section className="bg-bless-ink">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
            <h2 className="font-display text-3xl text-white md:text-4xl">{specialist.ctaPagina}</h2>
            <p className="mt-4 text-white/70">
              Atendimento exclusivamente com horário marcado — fale direto pelo WhatsApp.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-md bg-bless-primaria px-8 py-3 font-medium text-white hover:bg-bless-primaria-dark"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
