"use server"

import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { publications } from "@/lib/db/schema"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function savePublicationAction(
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
    await db.insert(publications).values({
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

  revalidatePath("/admin/publications")
  revalidatePath("/publications")

  // ✅ Return success instead of redirecting
  return { success: true }
}

export async function updatePublicationAction(
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

  if (!id) return { error: "Missing publication ID." }
  if (!title || !slug) return { error: "Title and Slug are required." }

  try {
    await db
      .update(publications)
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
      .where(eq(publications.id, id))
  } catch (error: any) {
    if (error.code === "23505") {
      return { error: "Slug already exists. Please choose another." }
    }
    console.error("Update error:", error)
    return { error: "Failed to update. Please try again." }
  }

  revalidatePath("/admin/publications")
  revalidatePath(`/publications/${slug}`)

  // ✅ Return success instead of redirecting
  return { success: true }
}
