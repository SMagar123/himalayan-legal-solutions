"use client"

import { navItems } from "@/lib/data/navigation"
import { NavItem } from "./NavItem"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

interface DesktopNavProps {
  isScrolled: boolean
}

export function DesktopNav({ isScrolled }: DesktopNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden items-center gap-1 lg:flex"
    >
      {navItems.map((item) => (
        <NavItem key={item.title} item={item} isScrolled={isScrolled} />
      ))}
    </motion.div>
  )
}
