import type { PortableTextBlock } from "@portabletext/types";

/**
 * Envolve um parágrafo simples em um único bloco de Portable Text normal —
 * usado pelos mocks locais, que não precisam de formatação rica (negrito,
 * links, listas); isso vem da autoria real no Sanity Studio. Mantém o shape
 * de `RichTextBlock.content` idêntico ao que a query GROQ devolve.
 */
export function pt(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "block-1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "span-1", text, marks: [] }],
    },
  ];
}
