"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="font-display text-xl text-bless-ink">
          Bless <span className="text-bless-primaria">Hair &amp; Care</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bless-ink/80 transition-colors hover:text-bless-primaria"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contato"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden bg-bless-primaria hover:bg-bless-primaria-dark md:inline-flex"
          )}
        >
          Agendar avaliação
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="text-bless-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
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
