import type { Metadata } from "next";
import { ContatoFork } from "@sections/ContatoFork";
import { buildMetadata } from "@seo/metadata";
import { buscarConteudoRepository, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Agende sua avaliação na Bless Hair & Care, em Pirituba, Zona Oeste de São Paulo, ou fale direto pelo WhatsApp.",
  path: "/contato",
});

// Contact/SiteConfig (2026-07-23) -- item 3 da fila. Fallback local espelha
// o hardcode anterior exatamente -- so entra em cena se o Repository cair.
const contatoFallback = {
  whatsappPrincipal: "5511967466085",
  mensagemWhatsappPadrao: "Oi Eliana! Vim pela página e quero agendar uma avaliação.",
  instagram: "sobrancelhasbless",
  endereco: "Pirituba, Zona Oeste de São Paulo — a poucos minutos de Lapa, Perdizes, Vila Leopoldina e Pinheiros.",
};

export default async function ContatoPage() {
  const repository = await buscarConteudoRepository(resolverSlugFromEnv());
  const contato = {
    whatsappPrincipal: repository?.hero.whatsappPrincipal ?? contatoFallback.whatsappPrincipal,
    mensagemWhatsappPadrao: repository?.hero.mensagemWhatsappPadrao ?? contatoFallback.mensagemWhatsappPadrao,
    instagram: repository?.hero.instagram ?? contatoFallback.instagram,
    endereco: repository?.hero.endereco ?? contatoFallback.endereco,
  };
  const waLink = `https://wa.me/${contato.whatsappPrincipal}?text=${encodeURIComponent(
    contato.mensagemWhatsappPadrao
  )}`;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl text-brand-ink md:text-5xl">
            Vamos agendar sua avaliação
          </h1>
          <p className="mt-6 text-lg text-brand-ink/75">
            Preencha o formulário ou fale direto com a equipe da Bless pelo WhatsApp.
          </p>

          <dl className="mt-10 space-y-6 text-brand-ink">
            <div>
              <dt className="text-sm font-semibold text-brand-primaria-dark">WhatsApp</dt>
              <dd className="mt-1">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primaria">
                  Falar agora
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand-primaria-dark">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={`https://instagram.com/${contato.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primaria"
                >
                  @{contato.instagram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand-primaria-dark">Endereço</dt>
              <dd className="mt-1">{contato.endereco}</dd>
            </div>
          </dl>
        </div>

        <ContatoFork whatsappPrincipal={contato.whatsappPrincipal} />
      </div>
    </section>
  );
}
