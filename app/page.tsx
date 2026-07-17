import type { Metadata } from "next";
import { Hero } from "@sections/Hero";
import { SpecialistsTeaser } from "@sections/SpecialistsTeaser";
import { Manifesto } from "@sections/Manifesto";
import { ServicesGrid } from "@sections/ServicesGrid";
import { Testimonials } from "@sections/Testimonials";
import { FAQSection } from "@sections/FAQSection";
import { CTASection } from "@sections/CTASection";
import { JsonLd, localBusinessSchema } from "@seo/JsonLd";
import { buildMetadata } from "@seo/metadata";
import { blessTheme } from "@theme/tokens";

export const metadata: Metadata = buildMetadata({
  title: "Bless Hair & Care | Beleza que cuida — Pirituba, Zona Oeste SP",
  description:
    "Sobrancelha, laser, pele e autoestima — tudo com avaliação antes de qualquer procedimento. Nada aqui é padrão.",
  path: "/",
});

const WA_MENSAGEM = encodeURIComponent("Oi Eliana! Vim pela página e quero agendar uma avaliação.");

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <Hero
        badge="Beleza · Estética · Cabelo"
        headline={["Onde estética, cabelo e", "autoestima se encontram."]}
        headlineHighlightIndex={1}
        sub="Sobrancelha, laser, pele, corte e coloração — cada especialista com sua própria assinatura, dentro da mesma casa."
        ctaPrincipal="Agendar avaliação"
        ctaPrincipalHref="/contato"
        ctaSecundario="Falar direto no WhatsApp"
        ctaSecundarioHref={`https://wa.me/${blessTheme.whatsapp}?text=${WA_MENSAGEM}`}
        youtubeId="Hf6abfL1la4"
      />

      <SpecialistsTeaser />

      <Manifesto />

      <ServicesGrid
        titulo="Por que a Bless"
        beneficios={[
          {
            icone: "🎯",
            titulo: "Personalização total",
            texto:
              "Toda cliente nova começa pela avaliação — o que direciona o protocolo certo, não o que você acha que precisa.",
          },
          {
            icone: "⚡",
            titulo: "Resultado desde a 1ª sessão",
            texto: "Potência máxima segura desde o início — sem enrolar sessão pra justificar pacote.",
          },
          {
            icone: "🏅",
            titulo: "Sem promoção, nunca",
            texto: "A Bless não compete por preço, compete por resultado. Isso afasta o cliente errado.",
          },
          {
            icone: "📍",
            titulo: "Perto de você",
            texto: "Pirituba, a poucos minutos de Lapa, Perdizes, Vila Leopoldina e Pinheiros.",
          },
        ]}
      />

      <Testimonials
        depoimentos={[
          { texto: "Trecho placeholder — trocar por depoimento real da Eliana.", autor: "Cliente Bless — nome a confirmar", placeholder: true },
          { texto: "Trecho placeholder — trocar por depoimento real da Eliana.", autor: "Cliente Bless — nome a confirmar", placeholder: true },
        ]}
      />

      <FAQSection
        faq={[
          {
            pergunta: "Preciso saber exatamente o que quero antes de agendar?",
            resposta: "Não. A avaliação existe justamente pra isso — você chega com a dúvida, sai com o protocolo certo.",
          },
          {
            pergunta: "Vocês fazem promoção ou desconto?",
            resposta: "Não trabalhamos com desconto. Quando faz sentido dar algo a mais, é brinde ou upgrade — nunca abaixamos o valor do serviço.",
          },
          {
            pergunta: "Como funciona o primeiro atendimento?",
            resposta: "Começa sempre por uma avaliação — entendemos sua pele, sua rotina e seu objetivo antes de indicar qualquer procedimento.",
          },
        ]}
      />

      <CTASection
        titulo="Agende sua avaliação"
        sub="Conta pra gente o que você procura — a equipe da Bless confirma o horário pelo WhatsApp."
        origem="site-home"
      />
    </>
  );
}
