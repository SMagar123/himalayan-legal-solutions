"use client"

import { motion } from "motion/react"
import { Phone, Clock, Mail } from "lucide-react"
import { aboutData } from "@/lib/data/about-data"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCounter } from "@/components/molecules/AnimatedCounter"
import { itemVariants, containerVariants } from "@/lib/animations"
import Image from "next/image"

const IconMap = {
  Phone: Phone,
  Clock: Clock,
  Mail: Mail,
}

export function AboutSection() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto flex max-w-full flex-col gap-16"
        >
          {/* Top Section: Image & Content */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Image with Glassmorphism Card */}
            <motion.div
              variants={itemVariants}
              className="relative h-100 w-full overflow-hidden rounded-3xl shadow-2xl md:h-125"
            >
              <Image
                src={aboutData.image}
                alt="About Us"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute right-4 bottom-4 left-4 flex flex-col items-start gap-6 rounded-2xl border border-white/20 bg-black/40 p-6 backdrop-blur-md md:right-8 md:bottom-8 md:left-8 md:flex-row md:items-center md:p-8">
                <div className="flex shrink-0 flex-col">
                  <span className="font-serif text-5xl leading-none text-white md:text-6xl">
                    <AnimatedCounter end={aboutData.stats.value} suffix="+" />
                  </span>
                  <span className="mt-1 text-sm font-medium text-white/90 md:text-base">
                    {aboutData.stats.label}
                  </span>
                </div>
                <div className="hidden h-16 w-px bg-white/20 md:block" />
                <p className="text-xs leading-relaxed text-white/80 md:text-sm">
                  {aboutData.stats.description}
                </p>
              </div>
            </motion.div>

            {/* Right: Content & Tabs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start"
            >
              <Badge
                variant="outline"
                className="mb-4 rounded-md border-primary px-6 py-5 text-sm font-semibold text-primary lg:text-lg"
              >
                {aboutData.badge}
              </Badge>

              <h2 className="mb-8 font-sans text-3xl leading-[1.2] font-bold text-gray-900 md:text-4xl lg:text-[2.75rem]">
                {aboutData.title}
              </h2>

              <Tabs defaultValue={aboutData.tabs[0].id} className="w-full">
                <TabsList className="mb-3 flex h-auto w-full scrollbar-none justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 pb-2 [-ms-overflow-style:none] md:gap-4 [&::-webkit-scrollbar]:hidden">
                  {aboutData.tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="shrink-0 rounded-full border-transparent px-6 py-3 text-base font-medium whitespace-nowrap text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:text-lg data-active:bg-primary! data-active:text-white! data-active:shadow-md"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* 
                  Fix: Added min-h-[180px] to this container.
                  This reserves the space so the page doesn't jump 
                  when switching between short and long descriptions.
                */}
                <div className="relative min-h-45">
                  {aboutData.tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="mt-0">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm leading-relaxed text-gray-600 md:text-base"
                      >
                        {tab.content}
                      </motion.p>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </motion.div>
          </div>

          {/* Bottom Section: Contact Info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 md:grid-cols-3"
          >
            {aboutData.contactInfo.map((info) => {
              const Icon = IconMap[info.icon as keyof typeof IconMap]
              return (
                <div key={info.id} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {info.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {info.subtitle}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
