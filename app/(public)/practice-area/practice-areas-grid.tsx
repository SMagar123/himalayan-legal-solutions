"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, BookOpen } from "lucide-react"
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

interface PracticeArea {
  id: string
  slug: string
  title: string
  excerpt: string | null
  coverImage: string | null
}

export function PracticeAreasGrid({ areas }: { areas: PracticeArea[] }) {
  const [currentPage, setCurrentPage] = useState(1)

  if (areas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-4 py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          No practice areas yet
        </h3>
        <p className="max-w-md text-gray-500">
          We haven&apos;t added any practice areas yet. Please check back soon.
        </p>
      </div>
    )
  }

  const totalPages = Math.ceil(areas.length / ITEMS_PER_PAGE)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = areas.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const top = document.getElementById("practice-grid-top")
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div id="practice-grid-top">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {currentItems.map((area) => (
            <motion.div key={area.id} variants={itemVariants}>
              <Link
                href={`/practice-area/${area.slug}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                {area.coverImage ? (
                  <Image
                    src={area.coverImage}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0E4A66]/5">
                    <BookOpen className="h-16 w-16 text-[#0E4A66]/20" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                  <div className="mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-bold text-white">
                      {area.title}
                    </h3>
                    {area.excerpt && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-white/80">
                        {area.excerpt}
                      </p>
                    )}
                  </div>

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
  )
}
