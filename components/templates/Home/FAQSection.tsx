"use client"

import { motion } from "motion/react"
import { faqsData } from "@/lib/data/faqs-data"
import { Badge } from "@/components/ui/badge"
import { containerVariants, itemVariants } from "@/lib/animations"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqsSection() {
  // Split the FAQs into two halves for the 2-column layout
  const midPoint = Math.ceil(faqsData.faqs.length / 2)
  const leftColumnFaqs = faqsData.faqs.slice(0, midPoint)
  const rightColumnFaqs = faqsData.faqs.slice(midPoint)

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 flex flex-col items-center text-center"
          >
            <Badge className="mb-4 rounded-md border-none bg-primary px-6 py-5 text-sm font-semibold text-white hover:bg-primary lg:text-lg">
              {faqsData.badge}
            </Badge>
            <h2 className="max-w-3xl font-sans text-3xl leading-[1.2] font-bold text-foreground md:text-4xl lg:text-[2.75rem]">
              {faqsData.title}
            </h2>
          </motion.div>

          {/* Accordion Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2"
          >
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {leftColumnFaqs.map((faq) => (
                <FaqItem key={faq.id} faq={faq} />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {rightColumnFaqs.map((faq) => (
                <FaqItem key={faq.id} faq={faq} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Reusable FAQ Item
function FaqItem({ faq }: { faq: any }) {
  return (
    <motion.div variants={itemVariants} className="w-full">
      <Accordion className="w-full">
        <AccordionItem
          value={faq.id}
          className="overflow-hidden rounded-3xl px-6 transition-colors duration-300 data-[state=open]:bg-gray-50/50 md:px-8"
        >
          {/* Default Shadcn AccordionTrigger (Chevron included automatically) */}
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            <span className="text-lg leading-snug font-bold text-foreground">
              {faq.question}
            </span>
          </AccordionTrigger>

          <AccordionContent className="pt-0 pb-6">
            {/* Inner divider line */}
            <div className="mb-4 h-px w-full bg-gray-200" />
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}
