import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Mesmo padrao do sitev2 (Auditoria Arquitetural 360, Fase 1 P0 — rate
// limiting ausente em /api/lead). Se as env vars nao estiverem
// configuradas (Upstash ainda nao provisionado pra este projeto), retorna
// null e o caller segue sem bloquear -- rate limiting e defesa extra, nao
// deve derrubar a gravacao do lead.

let _redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(name: string, limit: number, window: `${number} ${"s" | "m"}`): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  const key = `${name}:${limit}:${window}`;
  let rl = limiters.get(key);
  if (!rl) {
    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, window),
      prefix: `cume:ratelimit:${name}`,
    });
    limiters.set(key, rl);
  }
  return rl;
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Retorna { success: true } se o Upstash nao estiver configurado
// (fail-open -- nao bloqueia trafego legitimo por falta de config).
export async function checkRateLimit(
  name: string,
  ip: string,
  limit: number,
  window: `${number} ${"s" | "m"}`
): Promise<{ success: boolean }> {
  const rl = getLimiter(name, limit, window);
  if (!rl) return { success: true };
  try {
    const { success } = await rl.limit(ip);
    return { success };
  } catch {
    // Upstash fora do ar / erro de rede -- fail-open, nao bloqueia o site.
    return { success: true };
  }
}
