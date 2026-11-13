"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { AdminSidebar } from "./sidebar"

interface Props {
  children: React.ReactNode
  unreadCounts: { consultations: number; inquiries: number }
}

export function AdminShell({ children, unreadCounts }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        unreadCounts={unreadCounts}
      />
      <motion.main
        animate={{ marginLeft: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen flex-1 p-8"
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </motion.main>
    </div>
  )
}
