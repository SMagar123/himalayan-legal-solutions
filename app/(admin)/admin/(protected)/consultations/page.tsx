import { db } from "@/lib/db"
import { consultations, services } from "@/lib/db/schema"
import { and, desc, eq, ilike, or, gte, sql } from "drizzle-orm"
import { ConsultationFilters } from "./filters"
import { ConsultationsTable } from "./consultations-table"

interface Props {
  searchParams: Promise<{
    q?: string
    status?: string
    serviceId?: string
    dateRange?: string
  }>
}

export default async function AdminConsultationsPage({ searchParams }: Props) {
  const sp = await searchParams
  const q = sp.q?.trim()
  const status = sp.status || "all"
  const serviceId = sp.serviceId || "all"
  const dateRange = sp.dateRange || "all"

  const conditions = []
  if (q) {
    conditions.push(
      or(
        ilike(consultations.firstName, `%${q}%`),
        ilike(consultations.lastName, `%${q}%`),
        ilike(consultations.email, `%${q}%`),
        ilike(consultations.company, `%${q}%`)
      )
    )
  }
  if (status === "unread") conditions.push(eq(consultations.isRead, false))
  if (status === "read") conditions.push(eq(consultations.isRead, true))
  if (serviceId !== "all")
    conditions.push(eq(consultations.serviceId, serviceId))
  if (dateRange !== "all") {
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90
    const since = new Date()
    since.setDate(since.getDate() - days)
    conditions.push(gte(consultations.createdAt, since))
  }

  const where = conditions.length ? and(...conditions) : undefined

  const rows = await db
    .select({
      id: consultations.id,
      firstName: consultations.firstName,
      lastName: consultations.lastName,
      email: consultations.email,
      phone: consultations.phone,
      company: consultations.company,
      message: consultations.message,
      otherSubject: consultations.otherSubject,
      isRead: consultations.isRead,
      status: consultations.status,
      createdAt: consultations.createdAt,
      serviceTitle: services.title,
    })
    .from(consultations)
    .leftJoin(services, eq(consultations.serviceId, services.id))
    .where(where)
    .orderBy(desc(consultations.createdAt))

  // Fetch services for filter dropdown
  const allServices = await db
    .select({ id: services.id, title: services.title })
    .from(services)
    .orderBy(services.title)

  const unreadCount = rows.filter((r) => !r.isRead).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
        <p className="mt-1 text-gray-500">
          {unreadCount} unread · {rows.length} total
        </p>
      </div>

      <ConsultationFilters services={allServices} />
      <ConsultationsTable rows={rows} />
    </div>
  )
}
