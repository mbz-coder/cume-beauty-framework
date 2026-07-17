"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@ui/button";
import { cn } from "@utils/cn";
import { fadeUp } from "@theme/motion";

interface HeroProps {
  headline: string[];
  ctaPrincipal: string;
  ctaPrincipalHref: string;
  // Modo editorial "quiet luxury" — badge/sub/segundo CTA somem, sobra só
  // título centralizado + um botão. Sem isso, cai no hero antigo (nude, sem
  // vídeo) — mantido só de fallback, nenhuma página usa hoje.
  badge?: string;
  sub?: string;
  ctaSecundario?: string;
  ctaSecundarioHref?: string;
  headlineHighlightIndex?: number;
  // Placeholder até o vídeo cinematográfico definitivo (IA a partir das fotos)
  // ficar pronto — troca por videoSrc (mp4 próprio) quando existir.
  youtubeId?: string;
}

export function Hero({
  headline,
  ctaPrincipal,
  ctaPrincipalHref,
  badge,
  sub,
  ctaSecundario,
  ctaSecundarioHref,
  headlineHighlightIndex,
  youtubeId,
}: HeroProps) {
  const hasVideo = Boolean(youtubeId);

  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center overflow-hidden",
        hasVideo ? "-mt-20" : "border-b border-border bg-bless-nude"
      )}
    >
      {hasVideo && (
        <>
          {/* Placeholder de referência até o vídeo cinematográfico próprio (IA
              a partir das fotos) ficar pronto. autoplay+mute+loop pra tocar
              sozinho, devagar, como pano de fundo — Chrome só permite autoplay
              se vier mudo. Controles do YouTube ficam visíveis. */}
          <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
            <iframe
              className="absolute top-1/2 left-1/2 h-[130vh] w-[177.8vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&playsinline=1`}
              title="Bless Hair & Care — vídeo institucional (referência)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black/35" aria-hidden />
        </>
      )}

      <div className="mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          {badge && (
            <span
              className={cn(
                "inline-block text-xs font-medium tracking-[0.2em] uppercase",
                hasVideo ? "text-white/70" : "text-bless-gray"
              )}
            >
              {badge}
            </span>
          )}

          <h1
            className={cn(
              "font-display text-4xl leading-[1.15] font-medium md:text-6xl",
              badge && "mt-6",
              hasVideo ? "text-white" : "text-bless-ink"
            )}
          >
            {headline.map((line, i) => (
              <span
                key={i}
                className={i === headlineHighlightIndex ? "text-bless-gold-light" : undefined}
              >
                {line}
                {i < headline.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          {sub && (
            <p className={cn("mx-auto mt-6 max-w-md text-base", hasVideo ? "text-white/80" : "text-bless-gray")}>
              {sub}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ctaPrincipalHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-[52px] rounded-full px-10 text-sm font-medium tracking-wide",
                hasVideo
                  ? "border-white/80 bg-transparent text-white hover:border-white hover:bg-white hover:text-bless-ink"
                  : "border-bless-ink/30 bg-transparent text-bless-ink hover:border-bless-ink hover:bg-bless-ink hover:text-white"
              )}
            >
              {ctaPrincipal}
            </Link>
            {ctaSecundario && ctaSecundarioHref && (
              <Link
                href={ctaSecundarioHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-xs font-medium tracking-widest uppercase underline-offset-4 hover:underline",
                  hasVideo ? "text-white/80" : "text-bless-gray"
                )}
              >
                {ctaSecundario}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
