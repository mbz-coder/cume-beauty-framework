"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@ui/button";
import { cn } from "@utils/cn";

// Um link só pros dois especialistas (âncora na seção "Especialistas" da
// Home) — não lista Eliana/Jonathan separado na navegação, mesma lógica de
// "uma narrativa, não dois departamentos" aplicada na seção em si.
const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#especialistas", label: "Especialistas" },
  { href: "/contato", label: "Contato" },
];

interface HeaderProps {
  marca: { nome: string };
}

export function Header({ marca }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Navbar transparente sobre o vídeo do hero (só na Home, antes de rolar) —
  // "sem menu branco" era o pedido explícito na direção "quiet luxury".
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        transparent ? "border-transparent bg-transparent" : "border-b border-border bg-background/95 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className={cn("font-display text-lg tracking-wide", transparent ? "text-white" : "text-brand-ink")}
        >
          {marca.nome}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-colors",
                transparent ? "text-white/80 hover:text-white" : "text-brand-ink/70 hover:text-brand-primaria"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contato"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hidden h-9 rounded-full px-6 text-[0.7rem] font-medium tracking-[0.1em] md:inline-flex",
            transparent
              ? "border-white/40 bg-transparent text-white hover:bg-white/10"
              : "border-brand-ink/15 bg-transparent text-brand-ink hover:bg-brand-ink hover:text-white"
          )}
        >
          Agendar avaliação
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className={transparent ? "text-white md:hidden" : "text-brand-ink md:hidden"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-medium text-brand-ink/80 hover:text-brand-primaria"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
