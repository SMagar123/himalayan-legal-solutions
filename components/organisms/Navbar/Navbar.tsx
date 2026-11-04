"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { NavLogo } from "./NavbarLogo"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { Button } from "@/components/ui/button"
import { FileEdit } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Lenis / Scroll listener to trigger navbar bg change
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  // Check if current page is the homepage
  const isHomePage = pathname === "/"

  // Determine background based on scroll AND pathname
  // If it's the homepage and not scrolled, be transparent.
  // Otherwise, use the solid primary color.
  const isTransparent = isHomePage && !isScrolled

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-in-out",
        isTransparent
          ? "bg-transparent py-6"
          : "bg-primary/95 py-3 shadow-lg backdrop-blur-md"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <NavLogo />

        {/* Center: Desktop Navigation */}
        <DesktopNav isScrolled={isScrolled} />

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block"
          >
            <Link
              href="/free-consultation"
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-1.5 font-semibold transition-all duration-300",
                isScrolled
                  ? "bg-white text-primary shadow-md hover:bg-gray-100"
                  : "bg-white text-primary shadow-lg hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
              )}
            >
              <FileEdit className="h-4 w-4" />
              Free Consultation
            </Link>
          </motion.div>

          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}
