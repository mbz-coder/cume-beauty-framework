export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Bless Hair & Care",
    image: "https://blesshaircare.com.br/og-image.jpg",
    telephone: "+5511967466085",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pirituba, São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    url: "https://blesshaircare.com.br",
  };
}
