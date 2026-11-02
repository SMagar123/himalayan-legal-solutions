"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { contactData } from "@/lib/data/contact-data"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left Side: Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-100 min-h-125 w-full overflow-hidden rounded-3xl shadow-lg lg:h-auto"
          >
            <Image
              src={contactData.image}
              alt="Contact Us"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Optional: Add a subtle dark overlay if the image is too bright */}
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* Right Side: Form Container */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12 lg:p-16"
          >
            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                {contactData.title}
              </h2>
              <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600 md:text-base">
                {contactData.subtitle}
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Top Row: First & Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="firstName"
                    className="text-base font-bold text-gray-900"
                  >
                    {contactData.form.firstName}
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your full name"
                    className="h-12 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="lastName"
                    className="text-base font-bold text-gray-900"
                  >
                    {contactData.form.lastName}
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Your Email Address"
                    className="h-12 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              {/* Middle Row: Phone & Email */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="phone"
                    className="text-base font-bold text-gray-900"
                  >
                    {contactData.form.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your full name"
                    className="h-12 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="text-base font-bold text-gray-900"
                  >
                    {contactData.form.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email Address"
                    className="h-12 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              {/* Bottom Row: Details (Textarea) */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="details"
                  className="text-base font-bold text-gray-900"
                >
                  {contactData.form.details}
                </Label>
                <Textarea
                  id="details"
                  placeholder="Write something....."
                  className="min-h-[140px] resize-none rounded-xl border-gray-200 bg-white py-3 placeholder:text-gray-400 focus-visible:ring-primary/20"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 h-14 w-full rounded-xl bg-primary text-lg font-bold text-white transition-all duration-300 hover:bg-primary/90"
              >
                {contactData.form.buttonText}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
