"use server"

import { db } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
})

export async function submitContactAction(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return {
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await db.insert(contactInquiries).values({
      ...parsed.data,
      isRead: false,
    })
  } catch (err) {
    console.error("Contact insert failed:", err)
    return { error: "Something went wrong. Please try again." }
  }

  revalidatePath("/admin", "layout")
  return { success: true }
}
