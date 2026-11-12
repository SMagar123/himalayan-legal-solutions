"use server"

import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function deletePublicationAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  try {
    await db.delete(publications).where(eq(publications.id, id))
    revalidatePath("/admin/publications")
    revalidatePath("/publications")
    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { error: "Failed to delete publication." }
  }
}
