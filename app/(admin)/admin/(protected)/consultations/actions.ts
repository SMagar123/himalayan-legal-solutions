"use server"

import { db } from "@/lib/db"
import { consultations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function markConsultationReadAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  try {
    await db
      .update(consultations)
      .set({ isRead: true, status: "read" })
      .where(eq(consultations.id, id))
  } catch (e) {
    console.error(e)
    return { error: "Failed to mark as read" }
  }

  revalidatePath("/admin", "layout")
  revalidatePath("/admin/consultations")
  return { success: true }
}

export async function getConsultationDetailAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  const row = await db.query.consultations.findFirst({
    where: eq(consultations.id, id),
  })
  if (!row) return { error: "Not found" }
  if (!row.isRead) {
    await db
      .update(consultations)
      .set({ isRead: true, status: "read" })
      .where(eq(consultations.id, id))
    revalidatePath("/admin", "layout")
    revalidatePath("/admin/consultations")
  }

  return { success: true, row }
}
