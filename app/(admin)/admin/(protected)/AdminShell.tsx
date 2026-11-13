"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { AdminSidebar } from "./sidebar"

export function AdminShell({
  children,
  unreadCount,
}: {
  children: React.ReactNode
  unreadCount: number
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        unreadCount={unreadCount}
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
