import type { Metadata } from "next";
import { Hero } from "@sections/Hero";
import { SpecialistsTeaser } from "@sections/SpecialistsTeaser";
import { EspacoSection } from "@sections/EspacoSection";
import { Manifesto } from "@sections/Manifesto";
import { Testimonials } from "@sections/Testimonials";
import { FAQSection } from "@sections/FAQSection";
import { CTASection } from "@sections/CTASection";
import { JsonLd, localBusinessSchema } from "@seo/JsonLd";
import { buildMetadata } from "@seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Bless Hair & Care | Beleza que cuida — Pirituba, Zona Oeste SP",
  description:
    "Sobrancelha, laser, pele e autoestima — tudo com avaliação antes de qualquer procedimento. Nada aqui é padrão.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <Hero
        badge="Bless"
        headline={["Beleza que inspira confiança."]}
        sub="Tecnologia, cuidado e especialistas para transformar sua autoestima."
        ctaPrincipal="Agendar avaliação"
        ctaPrincipalHref="/contato"
        youtubeId="Hf6abfL1la4"
      />

      <Manifesto />

      <SpecialistsTeaser />

      <EspacoSection />

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
