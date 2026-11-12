"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import bcrypt from "bcrypt"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

// Updated signature: prevState is now the first arg
export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    if (!user) {
      return { error: "Invalid email or password." }
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return { error: "Invalid email or password." }
    }

    const session = await getSession()
    session.userId = user.id
    session.email = user.email
    session.name = user.name
    session.role = user.role
    session.isLoggedIn = true
    await session.save()
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Something went wrong. Please try again." }
  }

  redirect("/admin/dashboard")
}

export async function logoutAction() {
  const session = await getSession()
  session.destroy()
  redirect("/admin/login")
}
