import { db } from "@/lib/db"
import { practiceAreas } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { EditPracticeAreaEditor } from "./EditEditor"

export default async function EditPracticeAreaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const area = await db.query.practiceAreas.findFirst({
    where: eq(practiceAreas.id, id),
  })

  if (!area) notFound()

  return (
    <EditPracticeAreaEditor
      id={area.id}
      title={area.title}
      slug={area.slug}
      excerpt={area.excerpt || ""}
      content={area.content || "[]"}
      coverImage={area.coverImage || ""}
      seoTitle={area.seoTitle || ""}
      seoDescription={area.seoDescription || ""}
    />
  )
}
