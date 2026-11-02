"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { publicationsData } from "@/lib/data/publication-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { containerVariants, itemVariants } from "@/lib/animations"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Import type for API
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export function PublicationsSection() {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Wrap everything in Carousel so Context is available to Buttons */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12"
          >
            {/* Left: Title & Badge */}
            <div className="flex flex-col items-start lg:col-span-6">
              <Badge className="mb-4 rounded-md border-none bg-primary px-6 py-5 text-sm font-semibold text-white hover:bg-primary lg:text-lg">
                {publicationsData.badge}
              </Badge>
              <h2 className="max-w-lg font-sans text-3xl leading-[1.2] font-bold text-primary md:text-4xl lg:text-[2.75rem]">
                {publicationsData.title}
              </h2>
            </div>

            {/* Right: Description & Actions */}
            <div className="flex h-full flex-col items-start justify-between gap-8 lg:col-span-6 lg:items-end">
              <p className="max-w-xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-right">
                {publicationsData.description}
              </p>

              <div className="flex w-full items-center justify-between gap-4 lg:justify-end">
                {/* View All Button */}
                <Link href={publicationsData.viewAllLink}>
                  <Button
                    variant="outline"
                    className="group rounded-full border-primary px-6 text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    View All Publications
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>

                {/* Navigation Buttons (Desktop) */}
                <div className="hidden gap-2 lg:flex">
                  <CarouselPrevious className="static h-10 w-10 translate-y-0 border-primary text-primary transition-colors hover:bg-primary hover:text-white" />
                  <CarouselNext className="static h-10 w-10 translate-y-0 border-primary text-primary transition-colors hover:bg-primary hover:text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards Section */}
          <motion.div variants={itemVariants} className="relative w-full">
            <CarouselContent className="-ml-4 md:-ml-8">
              {publicationsData.publications.map((pub) => (
                <CarouselItem
                  key={pub.id}
                  className="pl-4 md:basis-1/2 md:pl-8 lg:basis-[45%]"
                >
                  <Link
                    href={pub.href}
                    className="group relative block h-[400px] w-full overflow-hidden rounded-3xl md:h-[550px]"
                  >
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Base Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Content Container */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-xl leading-tight font-bold text-white transition-transform duration-500 group-hover:-translate-y-2 md:text-3xl">
                          {pub.title}
                        </h3>

                        <div className="flex h-10 w-10 shrink-0 translate-y-4 transform items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:h-12 md:w-12">
                          <ArrowUpRight className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pt-4 text-sm leading-relaxed text-white/80 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 md:text-base">
                            {pub.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Mobile Navigation */}
            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static h-10 w-10 translate-y-0 border-primary text-primary" />
              <CarouselNext className="static h-10 w-10 translate-y-0 border-primary text-primary" />
            </div>
          </motion.div>
        </Carousel>
      </div>
    </section>
  )
}
