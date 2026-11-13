"use server"

import { db } from "@/lib/db"
import { practiceAreas } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function savePracticeAreaAction(
  prevState: any,
  formData: FormData
) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const coverImage = formData.get("coverImage") as string
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string

  if (!title || !slug) return { error: "Title and Slug are required." }
  if (!content) return { error: "Content cannot be empty." }

  try {
    await db.insert(practiceAreas).values({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      isPublished: true,
    })
  } catch (error: any) {
    if (error.code === "23505") {
      return { error: "Slug already exists. Please choose another." }
    }
    console.error(error)
    return { error: "Failed to save. Please try again." }
  }

  revalidatePath("/admin/practice-areas")
  revalidatePath("/practice-area")
  return { success: true }
}

export async function updatePracticeAreaAction(
  prevState: any,
  formData: FormData
) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const coverImage = formData.get("coverImage") as string
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string

  if (!id) return { error: "Missing practice area ID." }
  if (!title || !slug) return { error: "Title and Slug are required." }

  try {
    await db
      .update(practiceAreas)
      .set({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        updatedAt: new Date(),
      })
      .where(eq(practiceAreas.id, id))
  } catch (error: any) {
    if (error.code === "23505") {
      return { error: "Slug already exists. Please choose another." }
    }
    console.error("Update error:", error)
    return { error: "Failed to update. Please try again." }
  }

  revalidatePath("/admin/practice-areas")
  revalidatePath(`/practice-area/${slug}`)
  return { success: true }
}

export async function deletePracticeAreaAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  try {
    await db.delete(practiceAreas).where(eq(practiceAreas.id, id))
    revalidatePath("/admin/practice-areas")
    revalidatePath("/practice-area")
    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { error: "Failed to delete practice area." }
  }
}
