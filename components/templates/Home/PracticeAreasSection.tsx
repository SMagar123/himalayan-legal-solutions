"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Scale, Shield, Copyright, Gavel } from "lucide-react"
import { practiceAreasData } from "@/lib/data/practice-areas-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { containerVariants, itemVariants } from "@/lib/animations"

// Map string icon names to actual Lucide components
const IconMap = {
  Scale: Scale,
  Shield: Shield,
  Copyright: Copyright,
  Gavel: Gavel,
}

export function PracticeAreasSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white">
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Content & CTA */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-start justify-start pt-4 lg:col-span-5"
            >
              <Badge className="mb-6 rounded-md border-none bg-secondary px-5 py-5 text-sm font-semibold text-white hover:bg-secondary lg:text-lg">
                {practiceAreasData.badge}
              </Badge>

              <h2 className="mb-10 text-3xl leading-[1.2] font-bold tracking-tight md:text-4xl lg:text-5xl">
                {practiceAreasData.title}
              </h2>

              <Link
                href={practiceAreasData.buttonLink}
                className="mt-auto pt-8"
              >
                <Button
                  size="lg"
                  className="rounded-md bg-white px-8 py-6 text-base font-bold text-primary transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                >
                  {practiceAreasData.buttonText}
                </Button>
              </Link>
            </motion.div>

            {/* Right Column: Grid of Practice Areas */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-7"
            >
              {practiceAreasData.areas.map((area) => {
                // Determine if it's an icon or image
                const isIcon = area.type === "icon"
                const Icon = isIcon
                  ? IconMap[area.iconName as keyof typeof IconMap] || Scale
                  : null

                return (
                  <motion.div
                    key={area.id}
                    variants={itemVariants}
                    className="group flex cursor-pointer flex-col gap-5 sm:flex-row"
                  >
                    <div className="shrink-0">
                      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-tertiary/30 transition-colors duration-300 group-hover:bg-tertiary/50">
                        {isIcon && Icon ? (
                          <Icon
                            className="h-8 w-8 text-white"
                            strokeWidth={1.5}
                          />
                        ) : (
                          <Image
                            src={area.imageUrl!}
                            alt={area.title}
                            fill
                            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                            sizes="64px"
                          />
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-white/90">
                        {area.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/70">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
