"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@ui/button";
import { cn } from "@utils/cn";
import { fadeUp } from "@theme/motion";

interface HeroProps {
  badge: string;
  headline: string[];
  headlineHighlightIndex: number;
  sub: string;
  ctaPrincipal: string;
  ctaPrincipalHref: string;
  ctaSecundario: string;
  ctaSecundarioHref: string;
  // Placeholder até o vídeo cinematográfico definitivo (IA a partir das fotos)
  // ficar pronto — troca por videoSrc (mp4 próprio) quando existir.
  youtubeId?: string;
}

export function Hero({
  badge,
  headline,
  headlineHighlightIndex,
  sub,
  ctaPrincipal,
  ctaPrincipalHref,
  ctaSecundario,
  ctaSecundarioHref,
  youtubeId,
}: HeroProps) {
  const hasVideo = Boolean(youtubeId);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border",
        hasVideo ? "flex min-h-screen items-center" : "bg-bless-nude/30"
      )}
    >
      {hasVideo && (
        <>
          {/* Placeholder de referência até o vídeo cinematográfico próprio (IA
              a partir das fotos) ficar pronto. autoplay+mute+loop pra tocar
              sozinho como vídeo de fundo — Chrome só permite autoplay se vier
              mudo; controles do YouTube ficam visíveis (usuário pode ativar
              som/pausar), diferente de um autoplay totalmente disfarçado. */}
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
          <div className="absolute inset-0 -z-10 bg-black/30" aria-hidden />
        </>
      )}

      <div className="mx-auto w-full max-w-[1400px] px-6 py-32 md:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className={cn(
              "inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase",
              hasVideo
                ? "border-white/30 bg-white/10 text-white backdrop-blur"
                : "border-bless-primaria/30 bg-background text-bless-primaria-dark"
            )}
          >
            {badge}
          </span>

          <h1
            className={cn(
              "mt-6 font-display text-4xl leading-tight md:text-6xl",
              hasVideo ? "text-white" : "text-bless-ink"
            )}
          >
            {headline.map((line, i) => (
              <span key={i} className={i === headlineHighlightIndex ? "text-bless-primaria" : undefined}>
                {line}
                {i < headline.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className={cn("mx-auto mt-6 max-w-xl text-lg", hasVideo ? "text-white/85" : "text-bless-ink/75")}>
            {sub}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ctaPrincipalHref}
              className={cn(buttonVariants({ size: "lg" }), "bg-bless-primaria px-8 hover:bg-bless-primaria-dark")}
            >
              {ctaPrincipal}
            </Link>
            <Link
              href={ctaSecundarioHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8",
                hasVideo && "border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {ctaSecundario}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
