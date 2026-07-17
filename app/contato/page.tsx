import type { Metadata } from "next";
import { LeadForm } from "@forms/LeadForm";
import { buildMetadata } from "@seo/metadata";
import { blessTheme } from "@theme/tokens";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Agende sua avaliação na Bless Hair & Care, em Pirituba, Zona Oeste de São Paulo, ou fale direto pelo WhatsApp.",
  path: "/contato",
});

export default function ContatoPage() {
  const waLink = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(
    "Oi Eliana! Vim pela página e quero agendar uma avaliação."
  )}`;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl text-bless-ink md:text-5xl">
            Vamos agendar sua avaliação
          </h1>
          <p className="mt-6 text-lg text-bless-ink/75">
            Preencha o formulário ou fale direto com a equipe da Bless pelo WhatsApp.
          </p>

          <dl className="mt-10 space-y-6 text-bless-ink">
            <div>
              <dt className="text-sm font-semibold text-bless-primaria-dark">WhatsApp</dt>
              <dd className="mt-1">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-bless-primaria">
                  Falar agora
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-bless-primaria-dark">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={`https://instagram.com/${blessTheme.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bless-primaria"
                >
                  @{blessTheme.instagram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-bless-primaria-dark">Endereço</dt>
              <dd className="mt-1">Pirituba, Zona Oeste de São Paulo — a poucos minutos de Lapa, Perdizes, Vila Leopoldina e Pinheiros.</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-bless-nude/20 p-8">
          <LeadForm origem="site-contato" />
        </div>
      </div>
    </section>
  );
}
