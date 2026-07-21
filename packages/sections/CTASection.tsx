import { LeadForm } from "@forms/LeadForm";
import type { PROCEDIMENTOS } from "@forms/procedimentos";

interface CTASectionProps {
  titulo: string;
  sub: string;
  origem: string;
  procedimentoPreSelecionado?: (typeof PROCEDIMENTOS)[number];
}

export function CTASection({ titulo, sub, origem, procedimentoPreSelecionado }: CTASectionProps) {
  return (
    <section id="agendar" className="bg-brand-black">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-2 md:py-[200px]">
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-white md:text-4xl">{titulo}</h2>
          <p className="mt-4 max-w-md text-white/70">{sub}</p>
        </div>

        <div className="rounded-2xl bg-background p-8">
          <LeadForm origem={origem} procedimentoPreSelecionado={procedimentoPreSelecionado} />
        </div>
      </div>
    </section>
  );
}
