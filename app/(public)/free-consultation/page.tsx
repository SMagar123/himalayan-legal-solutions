import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { ConsultationForm } from "./consultation-form"

export const dynamic = "force-dynamic"

export default async function FreeConsultationPage() {
  // Fetch published services for the dropdown/radio group
  const publishedServices = await db
    .select({ id: services.id, title: services.title })
    .from(services)
    .where(eq(services.isPublished, true))
    .orderBy(desc(services.createdAt))

  return <ConsultationForm services={publishedServices} />
}
