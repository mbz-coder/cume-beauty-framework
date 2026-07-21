import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Proxy server-to-server pro /api/lead do cume-lp-system — evita CORS no
// browser e mantém o cume-lp-system intocado (PRD seção 1). O site nunca
// grava lead direto; só repassa pro motor que já existe.
export async function POST(req: NextRequest) {
  const lpSystemUrl = process.env.LP_SYSTEM_API_URL;
  if (!lpSystemUrl) {
    console.error("LP_SYSTEM_API_URL não configurada");
    return NextResponse.json({ error: "Lead API não configurada" }, { status: 500 });
  }

  // Auditoria Arquitetural 360, Fase 1 P0 — mesma protecao do endpoint
  // upstream, aqui tambem, pra nao depender so do rate limit do
  // cume-lp-system (defesa em profundidade, o proxy tem seu proprio IP
  // de origem visto pelo upstream).
  const ip = getClientIp(req);
  const { success } = await checkRateLimit("lead-proxy", ip, 10, "1 m");
  if (!success) {
    return NextResponse.json({ error: "Muitas tentativas — tente novamente em instantes." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const forwardedFor = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");

    const upstream = await fetch(`${lpSystemUrl}/api/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
        "user-agent": req.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({
        cliente_slug: "bless",
        ...body,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("Erro ao repassar lead pro cume-lp-system:", err);
    return NextResponse.json({ error: "Erro ao enviar lead" }, { status: 500 });
  }
}
