import { motion } from "motion/react"
import { Phone, Mail } from "lucide-react"
import { contactPageData } from "@/lib/data/pages/contact-page-data"
import { ContactForm } from "./contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-16 text-center">
          <h1 className="inline-block border-b-2 border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            {contactPageData.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {contactPageData.infoCard.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                {contactPageData.infoCard.description}
              </p>

              <div className="flex flex-col gap-3">
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
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
