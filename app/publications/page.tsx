"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { publicationsPageData } from "@/lib/data/pages/publications-page-data"
import { containerVariants, itemVariants } from "@/lib/animations"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 8

export default function PublicationsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  // Simulate API Pagination Logic
  const totalPages = Math.ceil(
    publicationsPageData.allPublications.length / ITEMS_PER_PAGE
  )
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = publicationsPageData.allPublications.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white lg:pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h1 className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            {publicationsPageData.title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            Explore our collection of legal publications, research, and insights
            covering Nepalese laws, regulatory developments, and contemporary
            legal issues. Stay informed through thoughtful analysis and
            practical guidance on matters shaping the legal and business
            landscape.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {currentItems.map((pub) => (
              <motion.div key={pub.id} variants={itemVariants}>
                <Link
                  href={`/publications/${pub.slug}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  {/* Image */}
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* 
                    Gradient Overlay 
                    Always visible at the bottom for text readability.
                    Deepens on hover. 
                  */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content Container (Bottom Area) */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                    {/* Title & Excerpt (Always visible) */}
                    <div className="mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                      <h3 className="mb-2 text-lg leading-tight font-bold text-white">
                        {pub.title}
                      </h3>

                      {pub.excerpt && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-white/80">
                          {pub.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Learn More Button (Hidden by default, slides up on hover) */}
                    {/* We use grid-rows trick to smoothly animate height from 0 to auto */}
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
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
