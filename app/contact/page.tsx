"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Phone, Mail } from "lucide-react"
import { contactPageData } from "@/lib/data/pages/contact-page-data"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Placeholder for your future Server Action
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement Server Action here
    // const formData = new FormData(e.currentTarget);
    // await submitContactForm(formData);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Form submitted successfully! (UI Demo only)")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="inline-block border-b-2 border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            {contactPageData.title}
          </h1>
        </motion.div>

        {/* Main Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left Column: Info Cards */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 lg:col-span-4"
          >
            {/* Get In Touch Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {contactPageData.infoCard.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                {contactPageData.infoCard.description}
              </p>

              <div className="flex flex-col gap-3">
                {/* Phone */}
                <a
                  href={`tel:${contactPageData.infoCard.phone1}`}
                  className="group flex items-center gap-3 text-sm text-gray-700 transition-colors hover:text-[#0E4A66]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-[#0E4A66]/10">
                    <Phone className="h-4 w-4 text-[#0E4A66]" />
                  </div>
                  <span>
                    {contactPageData.infoCard.phone1} /{" "}
                    {contactPageData.infoCard.phone2}
                  </span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactPageData.infoCard.email}`}
                  className="group flex items-center gap-3 text-sm text-gray-700 transition-colors hover:text-[#0E4A66]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-[#0E4A66]/10">
                    <Mail className="h-4 w-4 text-[#0E4A66]" />
                  </div>
                  <span>{contactPageData.infoCard.email}</span>
                </a>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {contactPageData.hoursCard.title}
              </h3>
              <div className="flex flex-col gap-3">
                {contactPageData.hoursCard.schedule.map((slot, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm text-gray-600">{slot.days}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Top Row: First & Last Name */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  name="firstName"
                  required
                  placeholder={contactPageData.form.firstNamePlaceholder}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50/50 placeholder:text-gray-500 focus-visible:ring-[#0E4A66]/20"
                />
                <Input
                  name="lastName"
                  required
                  placeholder={contactPageData.form.lastNamePlaceholder}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50/50 placeholder:text-gray-500 focus-visible:ring-[#0E4A66]/20"
                />
              </div>

              {/* Middle Row: Email & Phone */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder={contactPageData.form.emailPlaceholder}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50/50 placeholder:text-gray-500 focus-visible:ring-[#0E4A66]/20"
                />
                <Input
                  name="phone"
                  type="tel"
                  required
                  placeholder={contactPageData.form.phonePlaceholder}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50/50 placeholder:text-gray-500 focus-visible:ring-[#0E4A66]/20"
                />
              </div>

              {/* Message Label */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-base font-bold text-gray-900"
                >
                  {contactPageData.form.messageLabel}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  className="min-h-[250px] resize-none rounded-lg border-gray-200 bg-gray-50/50 p-4 placeholder:text-gray-500 focus-visible:ring-[#0E4A66]/20"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-md bg-[#0E4A66] px-8 font-semibold text-white transition-all duration-300 hover:bg-[#0a3a52]"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : contactPageData.form.submitButton}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
