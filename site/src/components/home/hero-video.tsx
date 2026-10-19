import Image from "next/image";
import type { DemoImage } from "@/types";

/**
 * Fundo do hero em modo "vídeo". Sem JS: a imagem de capa é a camada base
 * (sempre renderizada), o <video> fica por cima só a partir de md — no
 * celular ele nem baixa (`hidden md:block`), pra não gastar dados/bateria
 * com autoplay. `motion-reduce:hidden` tira o vídeo também de quem pediu
 * menos movimento no SO, caindo pra capa estática do mesmo jeito.
 */
export function HeroVideo({ src, poster }: { src: string; poster: DemoImage }) {
  return (
    <>
      <Image src={poster.src} alt={poster.alt} fill priority sizes="100vw" className="object-cover" />
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster.src}
        className="absolute inset-0 hidden size-full object-cover motion-reduce:hidden md:block"
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
