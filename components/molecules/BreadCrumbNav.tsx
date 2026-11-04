"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft, ChevronRight, House } from "lucide-react"
import { motion } from "motion/react"
const ROUTE_LABELS: Record<string, string> = {
  publications: "Publications",
  services: "Services",
  "practice-areas": "Practice Areas",
  contact: "Contact Us",
  about: "About Us",
  team: "Our Team",
  careers: "Careers",
}

const NON_CLICKABLE_ROUTES: string[] = []

const formatSegmentLabel = (segment: string): string => {
  if (ROUTE_LABELS[segment.toLowerCase()]) {
    return ROUTE_LABELS[segment.toLowerCase()]
  }
  // Fallback: capitalize and replace dashes
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show on the homepage
  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  const crumbs = segments.map((segment, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/")
    return {
      label: formatSegmentLabel(segment),
      path,
      isClickable:
        !NON_CLICKABLE_ROUTES.includes(path) &&
        !NON_CLICKABLE_ROUTES.includes(segment),
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mb-6 flex items-center gap-3 px-4 pt-24 md:px-8"
    >
      {/* Back Button */}
      <button
        className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 sm:flex"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="flex flex-wrap items-center gap-2">
        {/* Home Link */}
        <button
          onClick={() => router.push("/")}
          className="flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-gray-500 transition-colors outline-none hover:text-primary"
        >
          <House size={14} />
          <span className="text-sm font-semibold sm:text-base">Home</span>
        </button>

        {/* Dynamic Crumbs */}
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1

          return (
            <div key={crumb.path} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-gray-400" />

              {isLast || !crumb.isClickable ? (
                <span className="text-sm font-semibold text-primary sm:text-base">
                  {crumb.label}
                </span>
              ) : (
                <button
                  className="cursor-pointer text-sm font-semibold text-gray-500 transition-colors hover:text-primary sm:text-base"
                  onClick={() => router.push(crumb.path)}
                >
                  {crumb.label}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
