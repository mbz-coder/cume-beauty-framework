import Link from "next/link";
import { blessTheme } from "@theme/tokens";

// Preto reservado pra footer/CTA/algumas divisões (2026-07-17) — só 3 blocos
// escuros no site inteiro (Hero, CTA, Footer), o resto respira claro.
export function Footer() {
  const waLink = `https://wa.me/${blessTheme.whatsapp}?text=${encodeURIComponent(
    "Oi Eliana! Vim pelo site e quero agendar uma avaliação."
  )}`;

  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Bless+Hair+%26+Care+Pirituba+S%C3%A3o+Paulo";

  return (
    <footer className="bg-bless-black">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-display text-2xl text-white">
              Bless <span className="text-bless-gold-light">Hair &amp; Care</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Beleza que cuida. Sobrancelha, laser, pele e autoestima — sempre com avaliação
              antes de qualquer procedimento.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">Navegação</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/" className="w-fit transition-colors hover:text-bless-gold-light">Início</Link>
              <Link href="/sobre" className="w-fit transition-colors hover:text-bless-gold-light">Sobre</Link>
              <Link href="/#especialistas" className="w-fit transition-colors hover:text-bless-gold-light">Especialistas</Link>
              <Link href="/contato" className="w-fit transition-colors hover:text-bless-gold-light">Contato</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">Contato</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-bless-gold-light">
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/${blessTheme.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors hover:text-bless-gold-light"
              >
                @{blessTheme.instagram}
              </a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-bless-gold-light">
                Pirituba, Zona Oeste de São Paulo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Bless Hair & Care. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/35">Powered by CUME</p>
        </div>
      </div>
    </footer>
  );
}
