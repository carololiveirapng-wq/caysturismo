import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // URLs do site antigo (WordPress) com equivalente real no novo site. Só
  // passam a valer quando o domínio oficial apontar para cá. Páginas sem
  // equivalente não são redirecionadas para a Home — ficam de fora de
  // propósito. Posts de spam do domínio antigo não entram aqui.
  async redirects() {
    const legacy: [string, string][] = [
      ["/a-cays-turismo", "/sobre"],
      ["/contato", "/contato"],
      ["/viaje-conosco", "/contato"],
      ["/depoimentos", "/sobre"],
      ["/blog", "/curadoria"],
      ["/category/historias-reais", "/curadoria"],
      ["/category/news", "/curadoria"],
      ["/category/our-blog", "/curadoria"],
      ["/category/post", "/curadoria"],
      ["/2019/04/03/o-casamento-de-ana-paula-e-giancarlo-em-punta-cana", "/experiencias/destination-wedding"],
      ["/2019/06/27/a-experiencia-do-casal-patricia-e-fabio-pelos-emirados-arabes", "/experiencias/lua-de-mel"],
    ];
    return legacy
      .filter(([from, to]) => from !== to)
      .map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
  // O Studio do Sanity (via `sanity`/`@sanity/vision`) usa `swr`, cujo mapa de
  // "exports" tem uma condição `react-server` que quebra a resolução de
  // módulos do Turbopack quando o pacote entra no grafo de um Server
  // Component (mesmo só sendo usado client-side). Tratá-los como externos
  // de servidor evita que o Turbopack tente resolver essa condição.
  serverExternalPackages: ["sanity", "@sanity/vision", "@sanity/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Imagens do Sanity (quando o CMS estiver populado) são servidas
        // daqui — sem isto, next/image recusaria a URL em produção assim
        // que o primeiro conteúdo real fosse cadastrado.
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
