"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import {
  Building2,
  Scale,
  Users,
  Gavel,
  Shield,
  Briefcase,
  RefreshCw,
  FileText,
  Copyright,
  ArrowUpRight,
} from "lucide-react"
import { servicesData } from "@/lib/data/services-data"
import { Badge } from "@/components/ui/badge"
import { containerVariants, itemVariants } from "@/lib/animations"
import { cn } from "@/lib/utils"

const IconMap = {
  Building2,
  Scale,
  Users,
  Gavel,
  Shield,
  Briefcase,
  RefreshCw,
  FileText,
  Copyright,
}

export function ServicesSection() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 flex flex-col items-center text-center"
          >
            <Badge className="mb-4 rounded-md border-none bg-primary px-6 py-5 text-sm font-semibold text-white hover:bg-primary lg:text-lg">
              {servicesData.badge}
            </Badge>
            <h2 className="max-w-2xl font-sans text-3xl leading-[1.2] font-bold text-primary md:text-4xl lg:text-[2.5rem]">
              {servicesData.title}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {servicesData.services.map((service, index) => {
              const Icon =
                service.mediaType === "icon"
                  ? IconMap[service.iconName as keyof typeof IconMap] || Scale
                  : null

              if (index === 4) {
                return (
                  <div key="cta-and-service" className="contents">
                    <motion.div
                      variants={itemVariants}
                      className="order-last h-full lg:order-0"
                    >
                      <Link
                        href={servicesData.moreServices.link}
                        className="group flex h-full min-h-72 flex-col items-center justify-center rounded-3xl bg-primary p-8 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <IconMap.Scale
                          className="mb-4 h-12 w-12 text-white/50 transition-colors duration-300 group-hover:text-white"
                          strokeWidth={1.5}
                        />
                        <span className="text-center text-xl leading-tight font-bold text-white">
                          {servicesData.moreServices.title}
                        </span>
                      </Link>
                    </motion.div>
                    <ServiceCard service={service} Icon={Icon} />
                  </div>
                )
              }
              return (
                <ServiceCard key={service.id} service={service} Icon={Icon} />
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, Icon }: { service: any; Icon: any }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        href={service.href || "#"}
        className={cn(
          "group relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300",
          "hover:-translate-y-1 hover:border-chart-1 hover:shadow-xl"
        )}
      >
        <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-primary transition-colors group-hover:text-white" />
        </div>

        <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden">
          {service.mediaType === "image" && service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            Icon && (
              <div className="flex h-full w-full items-center justify-center">
                <Icon
                  className="h-16 w-16 text-primary transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>
            )
          )}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <h3 className="text-lg leading-snug font-semibold text-primary transition-colors group-hover:text-primary/80">
            {service.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
