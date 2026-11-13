"use server"

import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function saveServiceAction(prevState: any, formData: FormData) {
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
    await db.insert(services).values({
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

  revalidatePath("/admin/services")
  revalidatePath("/services")
  return { success: true }
}

export async function updateServiceAction(prevState: any, formData: FormData) {
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

  if (!id) return { error: "Missing service ID." }
  if (!title || !slug) return { error: "Title and Slug are required." }

  try {
    await db
      .update(services)
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
      .where(eq(services.id, id))
  } catch (error: any) {
    if (error.code === "23505") {
      return { error: "Slug already exists. Please choose another." }
    }
    console.error("Update error:", error)
    return { error: "Failed to update. Please try again." }
  }

  revalidatePath("/admin/services")
  revalidatePath(`/services/${slug}`)
  return { success: true }
}

export async function deleteServiceAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  try {
    await db.delete(services).where(eq(services.id, id))
    revalidatePath("/admin/services")
    revalidatePath("/services")
    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { error: "Failed to delete service." }
  }
}
