"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { navItems } from "@/lib/data/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full overflow-hidden border-t border-white/10 bg-primary/95 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-white/90 hover:text-white"
                  >
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <div className="mt-2 space-y-2 border-l border-white/20 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-white/70 hover:text-white"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button className="mt-4 w-full bg-white text-primary hover:bg-white/90">
                Free Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
