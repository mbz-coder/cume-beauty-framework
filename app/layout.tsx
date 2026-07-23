import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { buscarConteudoRepository, resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";
import { getBrandTheme } from "@theme/brandTheme";
import { Header } from "@sections/Header";
import { Footer } from "@sections/Footer";
import "./globals.css";

// Header/Footer universal (2026-07-23) -- fallback local, mesma regra de
// dominio do FAQ/Servicos: usado so enquanto o Content Repository nao tiver
// esses campos cadastrados pra este cliente. Espelha o hardcode anterior
// exatamente (nome/tagline/mensagem de WhatsApp), zero mudanca visual pra
// quem ja tem Repository populado (Bless ja tem, ver seed 2026-07-23).
const marcaFallback = {
  nome: "Bless Hair & Care",
  tagline:
    "Beleza que cuida. Sobrancelha, laser, pele e autoestima — sempre com avaliação antes de qualquer procedimento.",
  whatsappPrincipal: "5511967466085",
  mensagemWhatsappPadrao: "Oi Eliana! Vim pelo site e quero agendar uma avaliação.",
  instagram: "sobrancelhasbless",
  endereco: "Pirituba, Zona Oeste de São Paulo",
};

// Direção "quiet luxury" (2026-07-17) + polish editorial (2026-07-18): trocado
// Cormorant Garamond → Fraunces no título — mesma família "serifada elegante",
// mas com mais caráter/personalidade (itálico mais expressivo, ótimo pra
// citações). Continua mapeado na var --font-cormorant de propósito, pra não
// mexer no resto do tema (globals.css/Tailwind). Inter segue no corpo/botões.
// Nada de Montserrat/Poppins/Roboto/Lato: essas gritam "template de salão".
const cormorant = Fraunces({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blesshaircare.com.br"),
  title: {
    default: "Bless Hair & Care | Beleza que cuida — Pirituba, Zona Oeste SP",
    template: "%s | Bless Hair & Care",
  },
  description:
    "Sobrancelha, laser, pele e autoestima — tudo com avaliação antes de qualquer procedimento. Atendimento em Pirituba, Zona Oeste de São Paulo.",
};

// CUME Brand & Content Engine, Fase 0.5 (2026-07-21) -- paleta institucional
// deixa de ser so o :root fixo de globals.css e passa a poder ser
// sobrescrita por BrandIdentity real. resolverSlugFromEnv() e o mesmo
// mecanismo multi-tenant ja usado por buscarConteudoRepository em
// app/page.tsx: este deploy representa UM cliente (slug fixo via env var
// CUME_CLIENTE_SLUG), nunca um literal no codigo -- um cliente novo e so um
// deploy novo com env var propria, zero mudanca aqui. Falha/API fora do
// ar/BrandIdentity ainda nao aprovada -> getBrandTheme cai no fallback
// hardcoded da Bless, e o <style> abaixo so reforca os MESMOS valores que
// globals.css ja tem -- nunca quebra o site.
//
// So --brand-primaria/--brand-nude sao sobrescritos: sao os unicos campos
// de BrandTheme.colors com 1:1 direto pras CSS vars existentes.
// --brand-primaria-dark/--brand-gold-light continuam fixos (nao temos uma
// variacao "escura" calculada vinda do Brand Analyst ainda) -- tipografia
// idem, ver comentario em packages/theme/brandTheme.ts.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const slug = resolverSlugFromEnv();
  const [brandTheme, repository] = await Promise.all([getBrandTheme(slug), buscarConteudoRepository(slug)]);
  // Campos escalares (nao lista) -- a regra de "dominio exclusivo" de
  // escolherOuFallback e so pra arrays (FAQ/Servicos/etc.); aqui e so
  // presenca-ou-fallback simples por campo.
  const marca = {
    nome: repository?.hero.nome ?? marcaFallback.nome,
    tagline: repository?.hero.tagline ?? marcaFallback.tagline,
    whatsappPrincipal: repository?.hero.whatsappPrincipal ?? marcaFallback.whatsappPrincipal,
    mensagemWhatsappPadrao: repository?.hero.mensagemWhatsappPadrao ?? marcaFallback.mensagemWhatsappPadrao,
    instagram: repository?.hero.instagram ?? marcaFallback.instagram,
    endereco: repository?.hero.endereco ?? marcaFallback.endereco,
  };

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--brand-primaria:${brandTheme.colors.primary};--brand-nude:${brandTheme.colors.secondary};}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header marca={marca} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer marca={marca} />
      </body>
    </html>
  );
}
