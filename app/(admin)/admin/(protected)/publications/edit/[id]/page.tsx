import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { EditPublicationEditor } from "./edit-editor"

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pub = await db.query.publications.findFirst({
    where: eq(publications.id, id),
  })

  if (!pub) notFound()

  // Pass only the necessary primitives - this guarantees serialization works
  return (
    <EditPublicationEditor
      id={pub.id}
      title={pub.title}
      slug={pub.slug}
      excerpt={pub.excerpt || ""}
      content={pub.content || "[]"}
      coverImage={pub.coverImage || ""}
      seoTitle={pub.seoTitle || ""}
      seoDescription={pub.seoDescription || ""}
    />
  )
}
