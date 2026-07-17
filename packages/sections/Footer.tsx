import Link from "next/link";
import { blessTheme } from "@theme/tokens";

export function Footer() {
  const waLink = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(
    "Oi Eliana! Vim pelo site e quero agendar uma avaliação."
  )}`;

  return (
    <footer className="border-t border-border bg-bless-nude/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-bless-ink">
              Bless <span className="text-bless-primaria">Hair &amp; Care</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-bless-ink/70">
              Beleza que cuida. Sobrancelha, laser, pele e autoestima — sempre com avaliação
              antes de qualquer procedimento.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-bless-ink">Navegação</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-bless-ink/70">
              <Link href="/" className="hover:text-bless-primaria">Início</Link>
              <Link href="/sobre" className="hover:text-bless-primaria">Sobre</Link>
              <Link href="/especialistas/eliana" className="hover:text-bless-primaria">Eliana</Link>
              <Link href="/especialistas/jonathan" className="hover:text-bless-primaria">Jonathan</Link>
              <Link href="/contato" className="hover:text-bless-primaria">Contato</Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-bless-ink">Contato</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-bless-ink/70">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-bless-primaria">
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/${blessTheme.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bless-primaria"
              >
                @{blessTheme.instagram}
              </a>
              <p>Pirituba, Zona Oeste de São Paulo</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-bless-ink/50">
          © {new Date().getFullYear()} Bless Hair & Care. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
