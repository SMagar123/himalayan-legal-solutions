"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { practiceAreasPageData } from "@/lib/data/pages/practice-areas-page-data"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 8

export default function PracticeAreasPage() {
  // Track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  // Get the items to display based on visibleCount
  const currentItems = practiceAreasPageData.allPracticeAreas.slice(
    0,
    visibleCount
  )

  // Check if there are more items to load
  const hasMore = visibleCount < practiceAreasPageData.allPracticeAreas.length

  const handleLoadMore = () => {
    setIsLoading(true)

    // Simulate network request (remove this setTimeout when connecting to real API)
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-white pb-10 lg:pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h1 className="inline-block border-b-4 border-[#0E4A66] pb-2 text-4xl font-bold text-[#0E4A66] md:text-5xl">
            {practiceAreasPageData.title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            {practiceAreasPageData.description}
          </p>
        </motion.div>

        {/* Practice Areas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence>
            {currentItems.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout // Smoothly animates position when new items are added
              >
                <Link
                  href={`/practice-area/${area.slug}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  {/* Image */}
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content Container */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                    <div className="mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                      <h3 className="mb-2 text-lg leading-tight font-bold text-white">
                        {area.title}
                      </h3>
                      {area.excerpt && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-white/80">
                          {area.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Learn More Button */}
                    <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="pt-3 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-1 rounded-md bg-white px-4 py-2 text-sm font-bold text-[#0E4A66] transition-colors hover:bg-gray-100">
                            Learn More
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="min-w-[200px] rounded-full bg-[#0E4A66] px-8 py-6 font-semibold text-white transition-all duration-300 hover:bg-[#0a3a52]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Practice Areas"
              )}
            </Button>
          </div>
        )}

        {/* Optional: Show message when all items are loaded */}
        {!hasMore && visibleCount > ITEMS_PER_PAGE && (
          <div className="mt-8 text-center font-medium text-gray-500">
            Explore more of our legal expertise across these practice areas.
          </div>
        )}
      </div>
    </div>
  )
}
