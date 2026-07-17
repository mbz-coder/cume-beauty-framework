import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@sections/Header";
import { Footer } from "@sections/Footer";
import "./globals.css";

// Direção "quiet luxury" (2026-07-17) — Cormorant Garamond (título) + Inter
// (texto/botões, substituiu Manrope na rodada de refinamento). Nada de
// Montserrat/Poppins/Roboto/Lato: essas gritam "template de salão".
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
