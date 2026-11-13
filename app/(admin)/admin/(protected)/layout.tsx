import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { consultations } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { AdminShell } from "./AdminShell"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session.isLoggedIn) redirect("/admin/login")

  let unreadCount = 0
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(consultations)
      .where(eq(consultations.isRead, false))
    unreadCount = result?.count ?? 0
  } catch (err) {
    console.error("Failed to fetch unread count:", err)
  }

  return <AdminShell unreadCount={unreadCount}>{children}</AdminShell>
}
