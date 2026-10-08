import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewLeadForm } from "@/components/admin/new-lead-form";
import { getDestinations } from "@/lib/cms";

export const metadata = { title: "Novo lead | Admin Cays" };

export default async function AdminNewLeadPage() {
  const destinationList = await getDestinations();
  const destinations = destinationList.map((d) => ({ slug: d.slug, name: d.name }));

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Novo lead"
        description="Para quem chegou por WhatsApp, Instagram, indicação, ligação ou presencial — não precisa do formulário completo do site."
      />

      <div className="max-w-3xl border border-ink/10 bg-ivory p-6">
        <NewLeadForm destinations={destinations} />
      </div>
    </div>
  );
}
