import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("himalayan_admin_session")

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
}
