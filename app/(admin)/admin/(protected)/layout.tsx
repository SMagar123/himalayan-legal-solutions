import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { logoutAction } from "../login/actions"
import { LayoutDashboard, BookOpen, FileText, LogOut, Home } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session.isLoggedIn) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col bg-[#0E4A66] text-white shadow-xl">
        <div className="border-b border-white/10 p-6">
          <h2 className="text-xl font-bold tracking-wide">HLS Admin</h2>
          <p className="mt-1 text-xs text-white/60">Content Management</p>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-2 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link
            href="/admin/practice-areas"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <BookOpen className="h-5 w-5" /> Practice Areas
          </Link>
          <Link
            href="/admin/publications"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <FileText className="h-5 w-5" /> Publications
          </Link>
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <Home className="h-5 w-5" /> View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="ml-64 min-h-screen flex-1 p-8">{children}</main>
    </div>
  )
}
