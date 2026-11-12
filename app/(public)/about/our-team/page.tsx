"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { teamData } from "@/lib/data/team-data"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h1 className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            {teamData.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            A team of highly skilled legal professionals equipped to navigate
            complex cross-border commercial transactions and resolve
            sophisticated legal disputes.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamData.members.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group flex cursor-pointer flex-col items-center"
            >
              {/* Image Container */}
              <div className="relative mb-4 aspect-4/5 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="text-center">
                <h3 className="mb-1 text-lg font-bold text-gray-900 md:text-xl">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#0E4A66] md:text-base">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
