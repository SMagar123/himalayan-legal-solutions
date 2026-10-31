"use client"

import { motion } from "motion/react"
import { containerVariants } from "@/lib/animations"
import { HeroContent } from "./HeroContents"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#0a101d]">
      {/* Background Image Setup */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Gradient Overlays for readability (Matching reference image) */}
      {/* 1. Dark gradient from left to right to make text pop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-foreground via-primary/90 to-primary/30" />
      {/* 2. Bottom gradient for the features section */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-80" />

      {/* Animated Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full w-full flex-grow"
      >
        <HeroContent />
      </motion.div>
    </section>
  )
}
