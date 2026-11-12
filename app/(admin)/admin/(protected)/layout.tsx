import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminShell } from "./AdminShell"
import "./layout.css"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session.isLoggedIn) {
    redirect("/admin/login")
  }

  return <AdminShell>{children}</AdminShell>
}
