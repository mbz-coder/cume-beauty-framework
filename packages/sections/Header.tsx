"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@ui/button";
import { cn } from "@utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/especialistas/eliana", label: "Eliana" },
  { href: "/especialistas/jonathan", label: "Jonathan" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
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
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className={cn("font-display text-xl tracking-wide", transparent ? "text-white" : "text-bless-ink")}
        >
          Bless <span className={transparent ? "text-bless-gold-light" : "text-bless-primaria"}>Hair &amp; Care</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium tracking-widest uppercase transition-colors",
                transparent ? "text-white/80 hover:text-white" : "text-bless-ink/70 hover:text-bless-primaria"
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
            "hidden h-11 rounded-full px-7 text-sm font-medium md:inline-flex",
            transparent
              ? "border-white/50 bg-transparent text-white hover:bg-white/10"
              : "border-bless-ink/20 bg-transparent text-bless-ink hover:bg-bless-ink hover:text-white"
          )}
        >
          Agendar avaliação
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className={transparent ? "text-white md:hidden" : "text-bless-ink md:hidden"}
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
              className="py-2 text-sm font-medium text-bless-ink/80 hover:text-bless-primaria"
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
