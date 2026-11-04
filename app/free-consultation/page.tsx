"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { consultationData } from "@/lib/data/pages/consultation-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function FreeConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement Server Action here
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Consultation request submitted! (UI Demo)")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="inline-block border-b-2 border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            {consultationData.title}
          </h1>
        </motion.div>

        {/* Form Container */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="flex flex-col gap-10"
        >
          {/* --- Section 1: Personal Information --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black">
              {consultationData.personalInfo.sectionTitle}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  {consultationData.personalInfo.fields.firstName.label}
                </Label>
                <Input
                  name="firstName"
                  placeholder={
                    consultationData.personalInfo.fields.firstName.placeholder
                  }
                  className="h-12 rounded-lg border-gray-300 bg-white text-base placeholder:text-gray-300"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  {consultationData.personalInfo.fields.lastName.label}
                </Label>
                <Input
                  name="lastName"
                  placeholder={
                    consultationData.personalInfo.fields.lastName.placeholder
                  }
                  className="h-12 rounded-lg border-gray-300 bg-white text-base placeholder:text-gray-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  {consultationData.personalInfo.fields.email.label}
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder={
                    consultationData.personalInfo.fields.email.placeholder
                  }
                  className="h-12 rounded-lg border-gray-300 bg-white text-base placeholder:text-gray-300"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  {consultationData.personalInfo.fields.phone.label}
                </Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder={
                    consultationData.personalInfo.fields.phone.placeholder
                  }
                  className="h-12 rounded-lg border-gray-300 bg-white text-base placeholder:text-gray-300"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2 md:col-span-2 md:w-1/2 md:pr-3">
                <Label className="text-base font-bold text-gray-900">
                  {consultationData.personalInfo.fields.company.label}
                </Label>
                <Input
                  name="company"
                  placeholder={
                    consultationData.personalInfo.fields.company.placeholder
                  }
                  className="h-12 rounded-lg border-gray-300 bg-white text-base placeholder:text-gray-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gray-300" />

          {/* --- Section 2: Interests --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black">
              {consultationData.interests.sectionTitle}
            </h2>

            <RadioGroup name="interest" className="flex flex-col gap-4">
              {consultationData.interests.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="h-6 w-6 border-gray-400 text-[#0E4A66] focus-visible:ring-[#0E4A66]"
                  />
                  <Label
                    htmlFor={option.id}
                    className="cursor-pointer text-base font-medium text-black"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gray-300" />

          {/* --- Section 3: Message --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black">
              {consultationData.message.sectionTitle}
            </h2>
            <Textarea
              name="message"
              placeholder={consultationData.message.placeholder}
              className="min-h-[250px] resize-y rounded-lg border-gray-300 bg-white p-4 text-base placeholder:text-gray-300"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-md bg-[#0E4A66] px-6 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-[#0a3a52]"
            >
              {isSubmitting ? "Sending..." : consultationData.submitButton}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}
