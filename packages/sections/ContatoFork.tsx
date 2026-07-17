"use client";

import { useState } from "react";
import { LeadForm } from "@forms/LeadForm";
import { blessTheme } from "@theme/tokens";
import { SPECIALISTS } from "@specialists/data";

type Interesse = "estetica" | "cabelo";

// Pedido do Moabe (2026-07-17): a aba de agendamento pergunta o que a pessoa
// procura antes de decidir o caminho — estética cai no formulário/CRM de
// verdade (Eliana, motor de crescimento); cabelo é só WhatsApp direto com o
// Jonathan (ele não capta cliente novo ativamente, agenda já é concorrida).
// Hoje os dois usam o mesmo número — troca fácil quando existir um separado.
export function ContatoFork() {
  const [interesse, setInteresse] = useState<Interesse>("estetica");
  const jonathan = SPECIALISTS.jonathan;
  const waJonathan = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(jonathan.waMensagemPadrao)}`;

  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <p className="text-xs font-medium tracking-widest text-bless-gray uppercase">O que você procura?</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setInteresse("estetica")}
          className={`flex-1 border px-4 py-3 text-sm font-medium transition-colors ${
            interesse === "estetica"
              ? "border-bless-ink bg-bless-ink text-white"
              : "border-border text-bless-ink hover:border-bless-ink"
          }`}
        >
          Estética, com a Eliana
        </button>
        <button
          type="button"
          onClick={() => setInteresse("cabelo")}
          className={`flex-1 border px-4 py-3 text-sm font-medium transition-colors ${
            interesse === "cabelo"
              ? "border-bless-ink bg-bless-ink text-white"
              : "border-border text-bless-ink hover:border-bless-ink"
          }`}
        >
          Cabelo, com o Jonathan
        </button>
      </div>

      <div className="mt-8">
        {interesse === "estetica" ? (
          <LeadForm origem="site-contato" />
        ) : (
          <div className="text-center">
            <p className="text-sm text-bless-ink/75">
              {jonathan.bio}
            </p>
            <a
              href={waJonathan}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-bless-ink px-8 py-3 text-sm font-medium tracking-wide text-white uppercase hover:bg-bless-primaria-dark"
            >
              Falar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
