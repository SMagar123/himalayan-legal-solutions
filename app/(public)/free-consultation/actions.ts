"use server"

import { db } from "@/lib/db"
import { consultations } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  company: z.string().optional(),
  serviceId: z.string().optional(),
  otherSubject: z.string().optional(),
  message: z
    .string()
    .min(20, "Please provide a bit more detail (at least 20 characters)")
    .max(5000, "Message cannot exceed 5,000 characters"),
})

export async function submitConsultationAction(
  prevState: any,
  formData: FormData
) {
  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") || undefined,
    serviceId: formData.get("serviceId") || undefined,
    otherSubject: formData.get("otherSubject") || undefined,
    message: formData.get("message"),
  })

  if (!parsed.success) {
    // Return the specific field errors
    return {
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data

  // Enforce exactly one of serviceId or otherSubject
  if (data.serviceId && data.otherSubject) {
    return { error: "Please choose either a service or 'Other', not both." }
  }
  if (!data.serviceId && !data.otherSubject) {
    return { error: "Please select a service or specify 'Other'." }
  }

  try {
    await db.insert(consultations).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      serviceId: data.serviceId,
      otherSubject: data.otherSubject,
      message: data.message,
      status: "new",
      isRead: false,
    })
  } catch (err) {
    console.error("Consultation insert failed:", err)
    return { error: "Something went wrong. Please try again." }
  }

  revalidatePath("/admin", "layout")

  return { success: true }
}
