"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { heroData } from "@/lib/data/hero-data"
import { itemVariants } from "@/lib/animations"
import { HeroFeatures } from "./HeroFeatures"

// Smooth slide-up and blur animation for the toggling word
const wordVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -40,
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroContent() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % heroData.titleHighlights.length
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 container mx-auto flex h-full flex-col justify-center px-4 pt-32 pb-12 md:px-8">
      <div className="mx-auto flex w-full max-w-full flex-col items-start">
        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-start"
        >
          <h1 className="w-full tracking-tight text-white">
            <span className="block font-sans text-5xl leading-[0.9] md:text-7xl lg:text-[6.5rem]">
              {heroData.titleTop}
            </span>

            {/* Highlight Stack: "OUR" on top, Animated Word below */}
            <div className="mt-2 flex w-full flex-row flex-wrap items-start gap-2 text-5xl leading-[0.8] md:mt-4 md:text-8xl lg:-ml-1 lg:text-[8rem]">
              <span className="mt-1 block">OUR</span>

              <div className="relative mt-1 w-full md:mt-3">
                <span className="pointer-events-none invisible block opacity-0">
                  COMMITMENT
                </span>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    variants={wordVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-0 left-0 block"
                  >
                    {heroData.titleHighlights[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex w-full justify-start md:mt-12"
        >
          <p className="max-w-4xl text-base leading-relaxed text-white/80 md:text-lg lg:text-xl">
            {heroData.description}
          </p>
        </motion.div>
        <HeroFeatures />
      </div>
    </div>
  )
}
