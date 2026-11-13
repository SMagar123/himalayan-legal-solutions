"use server"

import { db } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function markInquiryReadAction(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) return { error: "Unauthorized" }

  try {
    await db
      .update(contactInquiries)
      .set({ isRead: true })
      .where(eq(contactInquiries.id, id))
  } catch (err) {
    console.error(err)
    return { error: "Failed to mark as read" }
  }

  revalidatePath("/admin", "layout")
  revalidatePath("/admin/inquiries")
  return { success: true }
}
