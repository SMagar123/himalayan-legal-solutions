"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { NavItem as NavItemType } from "@/lib/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItemProps {
  item: NavItemType
  isScrolled: boolean
}

export function NavItem({ item, isScrolled }: NavItemProps) {
  const pathname = usePathname()
  const isActive =
    pathname === item.href ||
    item.submenu?.some((sub) => pathname.startsWith(sub.href))

  return (
    <div className="group relative">
      <Link
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
          isActive
            ? "bg-white text-primary shadow-sm"
            : "text-white/90 hover:bg-white/10 hover:text-white"
        )}
      >
        {item.title}
        {item.submenu && (
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        )}
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {item.submenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="invisible absolute top-full left-0 z-50 mt-2 w-64 rounded-xl border bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100"
          >
            {item.submenu.map((sub) => (
              <Link
                key={sub.title}
                href={sub.href}
                className="block rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
              >
                <div className="font-medium">{sub.title}</div>
                {sub.description && (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {sub.description}
                  </div>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
