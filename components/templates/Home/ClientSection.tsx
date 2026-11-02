"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { clientsData } from "@/lib/data/clients-data"
import { Badge } from "@/components/ui/badge"
import { containerVariants, itemVariants } from "@/lib/animations"
import { AutoCarousel } from "@/components/molecules/AutoCarousel" // Adjust path if needed

export function ClientsSection() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto flex max-w-full flex-col items-center">
          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 flex flex-col items-center text-center"
          >
            <Badge className="mb-4 rounded-md border-none bg-primary px-6 py-5 text-sm font-semibold text-white hover:bg-primary lg:text-lg">
              {clientsData.badge}
            </Badge>
            <h2 className="max-w-3xl font-sans text-3xl leading-[1.2] font-bold text-foreground md:text-4xl lg:text-[2.5rem]">
              {clientsData.title}
            </h2>
          </motion.div>

          {/* Carousel Section */}
          <motion.div variants={itemVariants} className="w-full">
            <AutoCarousel
              items={clientsData.clients}
              transition="marquee"
              autoPlay={true}
              marqueeSpeed={90}
              marqueeGap="4rem" // Spacing between logos
              showGradientMask={true}
              gradientWidth="10%"
              pauseOnHover={true}
              draggable={false}
              renderItem={(client) => (
                <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border transition-all duration-300 md:h-52 md:w-64 lg:h-64 lg:w-72">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover"
                  />
                </div>
              )}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
