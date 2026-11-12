import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { env } from "@/lib/env"

export interface SessionData {
  userId?: string
  email?: string
  name?: string
  role?: string
  isLoggedIn: boolean
}

export const sessionOptions = {
  password: env.SESSION_SECRET,
  cookieName: "himalayan_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )

  // Ensure default state
  if (session.isLoggedIn === undefined) {
    session.isLoggedIn = false
  }

  return session
}
