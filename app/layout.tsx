import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { resolverSlugFromEnv } from "@mbz-coder/cume-content-sdk";
import { getBrandTheme } from "@theme/brandTheme";
import { Header } from "@sections/Header";
import { Footer } from "@sections/Footer";
import "./globals.css";

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
  const brandTheme = await getBrandTheme(resolverSlugFromEnv());

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
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
