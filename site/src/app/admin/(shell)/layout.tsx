import type { ReactNode } from "react";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminCounts } from "@/lib/admin/leads-queries";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminShellLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminUser();

  const counts = await getAdminCounts().then(
    (c) => ({ newLeads: c.newLeads, returnsAttention: c.followUpsToday + c.overdueFollowUps }),
    () => null,
  );

  return (
    <AdminShell userEmail={user.email} counts={counts}>
      {children}
    </AdminShell>
  );
}
