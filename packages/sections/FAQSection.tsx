import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

export function FAQSection({ faq }: { faq: FaqItem[] }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-32 md:py-40">
        <h2 className="text-center font-display text-3xl text-bless-ink md:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion className="mt-12">
          {faq.map((item, i) => (
            <AccordionItem key={item.pergunta} value={String(i)}>
              <AccordionTrigger className="font-display text-base text-bless-ink">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-bless-ink/70">{item.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
