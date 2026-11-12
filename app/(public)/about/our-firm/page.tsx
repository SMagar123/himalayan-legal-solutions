"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ourFirmData } from "@/lib/data/pages/our-firm-data"
import { containerVariants, itemVariants } from "@/lib/animations"
import { CheckCircle2 } from "lucide-react"
import { FaqsSection } from "@/components/templates/Home/FAQSection"

export default function OurFirmPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white pb-16">
      {/* Page Title */}
      <div className="container mx-auto mb-16 px-4 text-center md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl"
        >
          {ourFirmData.title}
        </motion.h1>
      </div>

      <div className="container mx-auto flex flex-col gap-32 px-4 md:px-8">
        {/* --- Section 1: Intro --- */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* Left: Text Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start pt-10 lg:pt-0"
          >
            <h2 className="mb-6 text-2xl leading-tight font-bold text-gray-900 md:text-3xl">
              {ourFirmData.intro.heading}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
              {ourFirmData.intro.description}
            </p>

            <ul className="flex flex-col gap-4">
              {ourFirmData.intro.listItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0E4A66]" />
                  <span className="text-sm font-medium text-gray-800 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Image with Badges */}
          <motion.div
            variants={itemVariants}
            className="relative h-100 w-full md:h-125"
          >
            {/* Main Image */}
            <div className="absolute inset-0 mt-8 ml-8 overflow-hidden rounded-2xl lg:mt-12 lg:ml-12">
              <Image
                src={ourFirmData.intro.image}
                alt="About our firm"
                fill
                className="object-cover"
              />
            </div>

            {/* Top Left Badge */}
            <div className="absolute top-0 left-0 z-10 w-24 rounded-xl bg-[#0E4A66] p-4 text-center text-white shadow-lg md:w-32">
              <p className="text-xs leading-tight font-medium md:text-sm">
                {ourFirmData.intro.badge.text}
              </p>
            </div>

            {/* Bottom Right Badge */}
            <div className="absolute right-4 bottom-4 z-10 flex flex-col items-center justify-center rounded-xl bg-black p-4 text-center text-white shadow-lg">
              <span className="text-2xl font-bold md:text-3xl">
                {ourFirmData.intro.badge.stat}
              </span>
              <span className="text-[10px] tracking-wider text-gray-300 uppercase md:text-xs">
                {ourFirmData.intro.badge.statLabel}
              </span>
            </div>
          </motion.div>
        </motion.section>

        {/* --- Section 2: Middle Showcase --- */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex min-h-[500px] flex-col items-center justify-center"
        >
          {/* Left Angled Image */}
          <motion.div
            variants={itemVariants}
            className="absolute top-0 left-0 z-0 aspect-square w-48 rotate-[-6deg] overflow-hidden rounded-2xl shadow-xl md:w-64 lg:w-80"
          >
            <Image
              src={ourFirmData.showcase.leftImage}
              alt="Left showcase"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Angled Image */}
          <motion.div
            variants={itemVariants}
            className="absolute right-0 bottom-0 z-0 aspect-square w-48 rotate-[6deg] overflow-hidden rounded-2xl shadow-xl md:w-64 lg:w-80"
          >
            <Image
              src={ourFirmData.showcase.rightImage}
              alt="Right showcase"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Center Text */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 max-w-2xl rounded-3xl bg-white/80 p-8 text-center backdrop-blur-sm"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              {ourFirmData.showcase.heading}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              {ourFirmData.showcase.description}
            </p>
          </motion.div>
        </motion.section>

        {/* --- Section 3: Bottom Features --- */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Left: Image Grid (Takes 5 cols) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 lg:col-span-5"
          >
            {ourFirmData.bottom.images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-sm"
              >
                <Image
                  src={img}
                  alt={`Feature image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>

          {/* Right: Text (Takes 7 cols) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start lg:col-span-7"
          >
            <h2 className="mb-6 text-2xl leading-tight font-bold text-gray-900 md:text-3xl lg:text-4xl">
              {ourFirmData.bottom.heading}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              {ourFirmData.bottom.description}
            </p>
          </motion.div>
        </motion.section>
      </div>
      <FaqsSection />
    </div>
  )
}
