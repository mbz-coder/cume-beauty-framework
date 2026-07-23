import Link from "next/link";

interface FooterProps {
  marca: {
    nome: string;
    tagline: string;
    whatsappPrincipal: string;
    mensagemWhatsappPadrao: string;
    instagram: string;
    endereco: string;
  };
}

// Apresentacao, nao conteudo (2026-07-23, decisao explicita do usuario):
// Cliente.endereco guarda a forma mais completa (fonte unica pra Footer e
// /contato); o Footer decide exibir so os 2 primeiros segmentos separados
// por virgula (bairro + cidade), sem precisar de um segundo campo tipo
// enderecoResumido no Content Repository. Regra generica (nao especifica
// da Bless) -- qualquer endereco "Bairro, Cidade, detalhe extra..." resume
// da mesma forma.
function enderecoResumido(endereco: string): string {
  const segmentos = endereco.split(",").map((s) => s.trim());
  return segmentos.slice(0, 2).join(", ");
}

// Preto reservado pra footer/CTA/algumas divisões (2026-07-17) — só 3 blocos
// escuros no site inteiro (Hero, CTA, Footer), o resto respira claro.
export function Footer({ marca }: FooterProps) {
  const waLink = `https://wa.me/${marca.whatsappPrincipal}?text=${encodeURIComponent(
    marca.mensagemWhatsappPadrao
  )}`;

  // mapsLink deriva de nome+endereco (ambos dinamicos agora) em vez de uma
  // query string fixa -- mesmo principio do resto do item 3.
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${marca.nome} ${marca.endereco}`
  )}`;

  return (
    <footer className="bg-brand-black">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-display text-2xl text-white">{marca.nome}</p>
            <p className="mt-4 max-w-xs text-sm text-white/50">{marca.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">Navegação</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/" className="w-fit transition-colors hover:text-brand-gold-light">Início</Link>
              <Link href="/sobre" className="w-fit transition-colors hover:text-brand-gold-light">Sobre</Link>
              <Link href="/#especialistas" className="w-fit transition-colors hover:text-brand-gold-light">Especialistas</Link>
              <Link href="/contato" className="w-fit transition-colors hover:text-brand-gold-light">Contato</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">Contato</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-brand-gold-light">
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/${marca.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors hover:text-brand-gold-light"
              >
                @{marca.instagram}
              </a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-brand-gold-light">
                {enderecoResumido(marca.endereco)}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {marca.nome}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/35">Powered by CUME</p>
        </div>
      </div>
    </footer>
  );
}
