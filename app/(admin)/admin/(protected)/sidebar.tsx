"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation" // ✅ Import usePathname
import { motion, AnimatePresence } from "motion/react"
import { logoutAction } from "@/app/(admin)/admin/login/actions"
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
  Settings,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Settings },
  { href: "/admin/practice-areas", label: "Practice Areas", icon: BookOpen },
  { href: "/admin/publications", label: "Publications", icon: FileText },
  {
    href: "/admin/consultations",
    label: "Consultations",
    icon: Mail,
    showBadge: true,
  },
]

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  unreadCount: number
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  unreadCount,
}: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-40 flex h-screen flex-col overflow-visible bg-primary text-primary-foreground shadow-xl"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-24 -right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-md transition-transform hover:scale-110"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div
        className={cn(
          "flex h-20 items-center overflow-hidden border-b border-white/10 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-start px-6"
        )}
      >
        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out",
            isCollapsed ? "h-8 w-8" : "h-15 w-40"
          )}
        >
          <Image
            src="/logo.png"
            alt="Himalayan Legal Solutions"
            fill
            sizes="(max-width: 768px) 40px, 160px"
            className="object-cover object-left"
          />
        </div>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const hasBadge = item.showBadge && unreadCount > 0

          // ✅ Check if current path matches the nav item
          // Using startsWith so nested routes like /admin/services/edit/123 also highlight "Services"
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                // ✅ Apply active styles
                isActive ? "bg-white/20 text-white" : "hover:bg-white/10",
                isCollapsed && "justify-center px-0"
              )}
              title={
                isCollapsed
                  ? `${item.label}${hasBadge ? ` (${unreadCount} new)` : ""}`
                  : undefined
              }
            >
              {/* Icon with optional dot in collapsed state */}
              <div className="relative shrink-0">
                <item.icon className="h-5 w-5" />
                {isCollapsed && hasBadge && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-primary" />
                )}
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex flex-1 items-center justify-between overflow-hidden"
                  >
                    <span>{item.label}</span>
                    {hasBadge && (
                      <span className="ml-2 inline-flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10",
            isCollapsed && "justify-center px-0"
          )}
          title={isCollapsed ? "View Site" : undefined}
        >
          <Home className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                View Site
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap text-red-300 transition-colors hover:bg-red-500/20",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </div>
    </motion.aside>
  )
}
