"use client"

import { useState, useEffect } from "react" // <-- Added useEffect
import { motion, AnimatePresence } from "motion/react"
import { ArrowUp } from "lucide-react"
import { useLenis } from "lenis/react"
import { Button } from "@/components/ui/button"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    // Show button when page is scrolled down
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add event listener on mount
    window.addEventListener("scroll", toggleVisibility)

    // Clean up the listener on unmount
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, []) // <-- Empty dependency array ensures this only runs once on mount

  const scrollToTop = () => {
    if (lenis) {
      // If Lenis is active, use its smooth scroll
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      // Fallback for native smooth scrolling
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-8 bottom-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-secondary text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="size-4 h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
