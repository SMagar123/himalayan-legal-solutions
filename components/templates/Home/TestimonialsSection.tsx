"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight } from "lucide-react"
import { testimonialsData } from "@/lib/data/testimonials-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { containerVariants, itemVariants } from "@/lib/animations"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % testimonialsData.testimonials.length
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const activeTestimonial = testimonialsData.testimonials[activeIndex]
  const nextIndex1 = (activeIndex + 1) % testimonialsData.testimonials.length
  const nextIndex2 = (activeIndex + 2) % testimonialsData.testimonials.length
  const sideTestimonials = [
    testimonialsData.testimonials[nextIndex1],
    testimonialsData.testimonials[nextIndex2],
  ]

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start lg:col-span-4"
          >
            <Badge className="mb-6 rounded-md border-none bg-primary px-4 py-5 text-sm font-semibold text-white hover:bg-primary lg:text-base">
              {testimonialsData.badge}
            </Badge>

            <h2 className="mb-12 text-3xl leading-[1.2] font-bold text-primary md:text-4xl lg:text-[2.75rem]">
              {testimonialsData.title}
            </h2>

            <Link href={testimonialsData.buttonLink}>
              <Button
                size="lg"
                className="group cursor-pointer rounded-lg bg-primary px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:bg-[#0a3a52]"
              >
                {testimonialsData.buttonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-112.5 overflow-hidden rounded-3xl shadow-xl md:h-137.5 lg:col-span-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-end"
              >
                <Image
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/40 to-transparent" />

                <div className="relative z-10 p-8">
                  <p className="mb-6 text-base leading-relaxed text-white/90">
                    &quot;{activeTestimonial.text}&quot;
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {activeTestimonial.name}
                    </span>
                    <StarRating rating={activeTestimonial.rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 lg:col-span-4"
          >
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {sideTestimonials.map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative h-55 overflow-hidden rounded-2xl shadow-lg md:h-65"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/50 to-transparent" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-6">
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/90">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-white">
                          {testimonial.name}
                        </span>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center rounded-2xl bg-primary p-6 text-white shadow-md">
              <span className="text-xl font-bold">
                Average rating: {testimonialsData.averageRating}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
