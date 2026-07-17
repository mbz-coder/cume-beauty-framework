import Link from "next/link";
import { blessTheme } from "@theme/tokens";

// Preto reservado pra footer/CTA/algumas divisões (2026-07-17) — só 3 blocos
// escuros no site inteiro (Hero, CTA, Footer), o resto respira claro.
export function Footer() {
  const waLink = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(
    "Oi Eliana! Vim pelo site e quero agendar uma avaliação."
  )}`;

  return (
    <footer className="bg-bless-black">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-white">
              Bless <span className="text-bless-gold-light">Hair &amp; Care</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Beleza que cuida. Sobrancelha, laser, pele e autoestima — sempre com avaliação
              antes de qualquer procedimento.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Navegação</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-bless-gold-light">Início</Link>
              <Link href="/sobre" className="hover:text-bless-gold-light">Sobre</Link>
              <Link href="/#especialistas" className="hover:text-bless-gold-light">Especialistas</Link>
              <Link href="/contato" className="hover:text-bless-gold-light">Contato</Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contato</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-bless-gold-light">
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/${blessTheme.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bless-gold-light"
              >
                @{blessTheme.instagram}
              </a>
              <p>Pirituba, Zona Oeste de São Paulo</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-white/40">
          © {new Date().getFullYear()} Bless Hair & Care. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
