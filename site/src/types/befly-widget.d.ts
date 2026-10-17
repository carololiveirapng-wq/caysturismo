/**
 * Tipagem do custom element <befly-widget> (motor de busca Oner Travel /
 * BeFly, carregado via script externo só em /reservar-online). Só existem
 * esses dois atributos documentados pelo fornecedor — não é um componente
 * React, então não há mais props pra tipar.
 */
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "befly-widget": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        language?: string;
        "new-tab"?: string;
      };
    }
  }
}
