import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminUser } from "@/lib/admin/auth";

export const metadata = { title: "Configurações do painel | Admin Cays" };

const linkClass =
  "inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30";

export default async function AdminConfiguracoesPage() {
  const user = await getAdminUser();

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Configurações do painel"
        description="Ajustes deste painel comercial. O conteúdo público do site fica em outro lugar, descrito abaixo."
      />

      <section className="flex max-w-2xl flex-col gap-3 border border-ink/10 bg-ivory p-6">
        <h2 className="font-serif text-lg text-ink">Conta atual</h2>
        <p className="text-sm text-ink">{user?.email ?? "Não identificada"}</p>
        <p className="text-xs text-stone">Para trocar de conta, saia pelo botão Sair no topo da página e entre com outro e-mail.</p>
      </section>

      <section className="flex max-w-2xl flex-col gap-3 border border-ink/10 bg-ivory p-6">
        <h2 className="font-serif text-lg text-ink">Conteúdo do site</h2>
        <p className="text-sm text-stone">
          O conteúdo público da Cays (destinos, experiências, viagens, curadoria, equipe, depoimentos, WhatsApp, CNPJ,
          Instagram) é gerenciado em um editor separado, o Sanity Studio. Mudanças feitas lá aparecem no site.
        </p>
        <div>
          <Link href="/studio" target="_blank" rel="noreferrer" className={linkClass}>
            Abrir editor de conteúdo
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
