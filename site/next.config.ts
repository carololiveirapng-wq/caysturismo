import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
