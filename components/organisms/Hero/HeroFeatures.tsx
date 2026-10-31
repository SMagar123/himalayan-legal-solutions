"use client"

import { motion } from "motion/react"
import { heroData } from "@/lib/data/hero-data"
import { itemVariants, lineVariants } from "@/lib/animations"

export function HeroFeatures() {
  return (
    <div className="mt-16 grid w-full grid-cols-1 gap-8 md:mt-24 md:grid-cols-3">
      {heroData.features.map((feature, index) => (
        <motion.div
          key={feature.id}
          variants={itemVariants}
          className="flex flex-col gap-3"
        >
          {/* Title */}
          <div className="flex items-baseline gap-2 text-white/90">
            <span className="text-sm tracking-widest uppercase opacity-70 md:text-base">
              {feature.id}.
            </span>
            <span className="text-xl tracking-wide md:text-2xl">
              {feature.title}
            </span>
          </div>

          {/* Sub-description */}
          <span className="text-sm text-white/60 md:text-base">
            {feature.description}
          </span>

          {/* Animated Line */}
          <motion.div
            variants={lineVariants}
            className="mt-2 h-[1px] w-full origin-left bg-white/30"
          />
        </motion.div>
      ))}
    </div>
  )
}
