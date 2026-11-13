import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { consultations, contactInquiries } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { AdminShell } from "./AdminShell"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session.isLoggedIn) redirect("/admin/login")

  const [consultRes] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(consultations)
    .where(eq(consultations.isRead, false))

  const [inquiriesRes] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(contactInquiries)
    .where(eq(contactInquiries.isRead, false))

  return (
    <AdminShell
      unreadCounts={{
        consultations: consultRes?.count ?? 0,
        inquiries: inquiriesRes?.count ?? 0,
      }}
    >
      {children}
    </AdminShell>
  )
}
