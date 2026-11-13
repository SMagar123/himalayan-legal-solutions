import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { EditServiceEditor } from "./edit-editor"

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = await db.query.services.findFirst({
    where: eq(services.id, id),
  })

  if (!service) notFound()

  return (
    <EditServiceEditor
      id={service.id}
      title={service.title}
      slug={service.slug}
      excerpt={service.excerpt || ""}
      content={service.content || "[]"}
      coverImage={service.coverImage || ""}
      seoTitle={service.seoTitle || ""}
      seoDescription={service.seoDescription || ""}
    />
  )
}
