import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Entrar | Admin Cays" };

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const params = await searchParams;
  const next = first(params.next) ?? "";

  return (
    <div className="flex min-h-svh items-center justify-center bg-graphite px-6">
      <div className="w-full max-w-sm border border-ivory/15 p-8 md:p-10">
        <p className="text-xs font-medium tracking-[0.25em] text-ivory/50 uppercase">Cays Turismo</p>
        <h1 className="mt-2 font-serif text-2xl text-ivory">Painel administrativo</h1>
        <p className="mt-2 text-sm text-ivory/60">Acesso restrito à equipe Cays.</p>

        <LoginForm next={next} />
      </div>
    </div>
  );
}
