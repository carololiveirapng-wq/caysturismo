import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/lib/cms";
import { getNap } from "@/lib/nap";

/**
 * Dados da empresa em HTML visível e clicável (nome, endereço, telefone,
 * WhatsApp, e-mail). Só mostra o que está preenchido em Configurações
 * Globais — nada é inventado aqui (nem horário, nem "atendimento presencial").
 */
export function ContactNap({ settings }: { settings: SiteSettings }) {
  const nap = getNap(settings);
  const hasAddress = nap.street || nap.cityLine;
  if (!hasAddress && !nap.phone && !nap.whatsapp && !nap.email) return null;

  const label = "text-xs font-medium tracking-[0.2em] text-stone uppercase";
  const link = "text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-magenta-dark";

  return (
    <section aria-labelledby="dados-da-empresa" className="border-t border-ink/10 bg-ivory py-14 md:py-16">
      <Container>
        <h2 id="dados-da-empresa" className="font-serif text-2xl text-ink md:text-3xl">
          Cays Turismo em Brasília
        </h2>
        <address className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 text-[15px] leading-relaxed text-ink not-italic sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className={label}>Empresa</p>
            <p className="mt-2 font-medium">{nap.tradeName}</p>
            <p className="text-stone">{nap.legalName}</p>
            {nap.cnpj && <p className="text-stone">CNPJ {nap.cnpj}</p>}
          </div>
          {hasAddress && (
            <div>
              <p className={label}>Endereço</p>
              {nap.street && <p className="mt-2">{nap.street}</p>}
              {nap.cityLine && <p>{nap.cityLine}</p>}
            </div>
          )}
          {(nap.phone || nap.whatsapp) && (
            <div>
              <p className={label}>Telefone e WhatsApp</p>
              {nap.phone && nap.phoneHref && (
                <p className="mt-2">
                  <span className="text-stone">Telefone: </span>
                  <a href={nap.phoneHref} className={link}>
                    {nap.phone}
                  </a>
                </p>
              )}
              {nap.whatsapp && nap.whatsappHref && (
                <p>
                  <span className="text-stone">WhatsApp: </span>
                  <a href={nap.whatsappHref} target="_blank" rel="noreferrer" className={link}>
                    {nap.whatsapp}
                  </a>
                </p>
              )}
            </div>
          )}
          {nap.email && (
            <div>
              <p className={label}>E-mail</p>
              <p className="mt-2">
                <a href={`mailto:${nap.email}`} className={link}>
                  {nap.email}
                </a>
              </p>
            </div>
          )}
        </address>
      </Container>
    </section>
  );
}
