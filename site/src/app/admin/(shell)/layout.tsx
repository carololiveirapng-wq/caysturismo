import type { ReactNode } from "react";
import { requireAdminUser } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminShellLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminUser();

  return <AdminShell userEmail={user.email}>{children}</AdminShell>;
}
