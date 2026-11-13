import { db } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { and, desc, eq, ilike, or } from "drizzle-orm"
import { InquiriesFilters } from "./filters"
import { InquiriesTable } from "./inquiries-table"

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function AdminInquiriesPage({ searchParams }: Props) {
  const sp = await searchParams
  const q = sp.q?.trim()

  const conditions = []
  if (q) {
    conditions.push(
      or(
        ilike(contactInquiries.firstName, `%${q}%`),
        ilike(contactInquiries.lastName, `%${q}%`),
        ilike(contactInquiries.email, `%${q}%`)
      )
    )
  }

  const rows = await db
    .select()
    .from(contactInquiries)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(contactInquiries.createdAt))

  const unreadCount = rows.filter((r) => !r.isRead).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="mt-1 text-gray-500">
          {unreadCount} unread · {rows.length} total
        </p>
      </div>
      <InquiriesFilters />
      <InquiriesTable rows={rows} />
    </div>
  )
}
