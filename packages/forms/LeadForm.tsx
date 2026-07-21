"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import { leadFormSchema, type LeadFormValues } from "@forms/schema";
import { PROCEDIMENTOS } from "@forms/procedimentos";
import { useLeadTracking, getLeadTracking } from "@hooks/useLeadTracking";

interface LeadFormProps {
  origem: string;
  procedimentoPreSelecionado?: (typeof PROCEDIMENTOS)[number];
  ctaLabel?: string;
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  origem,
  procedimentoPreSelecionado,
  ctaLabel = "Agendar minha avaliação",
  className,
}: LeadFormProps) {
  useLeadTracking();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      procedimento: procedimentoPreSelecionado ?? PROCEDIMENTOS[0],
    },
  });

  async function onSubmit(values: LeadFormValues) {
    setStatus("loading");
    try {
      const tracking = getLeadTracking();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          origem,
          landing_page: `site${pathname}`,
          ...tracking,
        }),
      });
      if (!res.ok) throw new Error("Falha ao enviar");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <p className="font-display text-2xl text-brand-ink">Recebemos seu contato!</p>
        <p className="mt-2 text-brand-ink/80">
          A equipe da Bless entra em contato pelo WhatsApp em breve pra confirmar sua avaliação.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-brand-ink">
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-brand-ink focus:border-brand-primaria focus:outline-none"
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-sm text-destructive">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-brand-ink">
            WhatsApp (com DDD)
          </label>
          <input
            id="telefone"
            type="tel"
            placeholder="(11) 90000-0000"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-brand-ink focus:border-brand-primaria focus:outline-none"
            {...register("telefone")}
          />
          {errors.telefone && (
            <p className="mt-1 text-sm text-destructive">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="procedimento" className="block text-sm font-medium text-brand-ink">
            Procedimento de interesse
          </label>
          <select
            id="procedimento"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-brand-ink focus:border-brand-primaria focus:outline-none"
            {...register("procedimento")}
          >
            {PROCEDIMENTOS.map((proc) => (
              <option key={proc} value={proc}>
                {proc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-[52px] w-full rounded-full bg-brand-primaria text-sm font-medium hover:bg-brand-primaria-dark"
      >
        {isSubmitting ? "Enviando..." : ctaLabel}
      </Button>

      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">
          Não conseguimos enviar agora. Tenta de novo ou fala direto no WhatsApp.
        </p>
      )}
    </form>
  );
}
