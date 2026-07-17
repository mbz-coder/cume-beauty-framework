import type { Metadata } from "next";
import { Playfair_Display, Jost, Marck_Script } from "next/font/google";
import { Header } from "@sections/Header";
import { Footer } from "@sections/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Papel caligráfico do sistema de marca (Bless_Documentacao_de_Marca.pdf,
// seção 6) — frases de apelo emocional e assinatura. Uso pontual, nunca em
// títulos grandes ou corpo de texto.
const marckScript = Marck_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${jost.variable} ${marckScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
