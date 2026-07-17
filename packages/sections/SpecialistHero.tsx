"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@ui/button";
import { cn } from "@utils/cn";
import { fadeUpViewport } from "@theme/motion";

interface SpecialistHeroProps {
  variant: "conversion" | "authority";
  nome: string;
  papel: string;
  bio: string;
  imagemAlt: string;
  imagemSrc?: string;
  ctaHref: string;
}

// PRD seção 3: Eliana (conversion) e Hair Stylist (authority) têm papéis de
// negócio diferentes — a diferença precisa ser estrutural, não só de copy.
export function SpecialistHero({ variant, nome, papel, bio, imagemAlt, imagemSrc, ctaHref }: SpecialistHeroProps) {
  const isConversion = variant === "conversion";

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <motion.div {...fadeUpViewport} className="grid items-center gap-12 md:grid-cols-2">
        {imagemSrc ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bless-nude">
            <Image
              src={imagemSrc}
              alt={imagemAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div
            role="img"
            aria-label={imagemAlt}
            className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-bless-nude text-bless-primaria-dark/50"
          >
            <span className="font-display text-sm">Foto de {nome} — em produção</span>
          </div>
        )}

        <div>
          <span className="text-xs font-medium tracking-wide text-bless-primaria-dark uppercase">
            {papel}
          </span>
          <h1 className="mt-3 font-display text-4xl text-bless-ink md:text-5xl">{nome}</h1>
          <p className="mt-6 text-lg text-bless-ink/75">{bio}</p>

          <div className="mt-8">
            {isConversion ? (
              <Link
                href={ctaHref}
                className={cn(buttonVariants({ size: "lg" }), "bg-bless-primaria px-8 hover:bg-bless-primaria-dark")}
              >
                Agendar avaliação
              </Link>
            ) : (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8")}
              >
                Conhecer o trabalho
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
