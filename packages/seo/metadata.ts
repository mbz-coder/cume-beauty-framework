import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  // SEO (2026-07-23), item 4 da fila -- dominio/siteName agora vem do
  // Content Repository (ClienteInfraestrutura.dominioPrincipal/Cliente.nome)
  // com fallback pro dominio real da Bless (fallback anterior tinha um
  // typo -- "blesshaircare", sem o "e" -- corrigido aqui pra
  // "blesshairecare", confirmado como o dominio real em producao).
  dominio?: string;
  siteName?: string;
}

const DOMINIO_FALLBACK = "blesshairecare.com.br";
const SITE_NAME_FALLBACK = "Bless Hair & Care";

export function buildMetadata({ title, description, path, dominio, siteName }: BuildMetadataInput): Metadata {
  const url = `https://${dominio ?? DOMINIO_FALLBACK}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteName ?? SITE_NAME_FALLBACK,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
