"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { containerVariants, itemVariants } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { submitConsultationAction } from "./actions"

interface ServiceOption {
  id: string
  title: string
}

const MESSAGE_MAX = 5000
const MESSAGE_MIN = 20

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-md bg-[#0E4A66] px-6 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-[#0a3a52]"
    >
      {pending ? "Sending..." : "Send Message"}
      <ArrowRight className="h-5 w-5" />
    </Button>
  )
}

export function ConsultationForm({ services }: { services: ServiceOption[] }) {
  const [state, formAction] = useActionState(submitConsultationAction, null)
  const [interest, setInterest] = useState<string>("")
  const [messageLength, setMessageLength] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // Success handler
  useEffect(() => {
    if (state?.success) {
      toast.success("Thank you! Your consultation request has been submitted.")
      formRef.current?.reset()
      setInterest("")
      setMessageLength(0) // Reset counter
      topRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [state])

  // Error handler
  useEffect(() => {
    if (state?.error) {
      toast.error("Submission failed", {
        description: state.error || "Please check the form for errors.",
      })
      topRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [state])

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const firstInvalid = e.currentTarget.querySelector(
      ":invalid"
    ) as HTMLElement
    if (firstInvalid) {
      firstInvalid.focus()
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" })
      toast.error("Please fill in all required fields.")
    }
  }

  // Determine counter color state
  const remaining = MESSAGE_MAX - messageLength
  const isNearLimit = remaining <= 500
  const isAtLimit = remaining <= 0
  const isTooShort = messageLength > 0 && messageLength < MESSAGE_MIN

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <div ref={topRef} />

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="inline-block border-b-2 border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            Free Consultation
          </h1>
        </motion.div>

        {/* Success Banner */}
        {state?.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Thank you!</p>
              <p className="text-sm text-green-700">
                We&apos;ve received your consultation request and will be in
                touch shortly.
              </p>
            </div>
          </motion.div>
        )}

        {/* Global Error Banner */}
        {state?.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">Something went wrong</p>
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          </motion.div>
        )}

        <motion.form
          ref={formRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          action={formAction}
          onInvalid={handleInvalid}
          className="flex flex-col gap-10"
        >
          {/* --- Section 1: Personal Information --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  First Name *
                </Label>
                <Input
                  name="firstName"
                  required
                  className="h-12 rounded-lg"
                  aria-invalid={!!state?.fieldErrors?.firstName}
                />
                {state?.fieldErrors?.firstName && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  Last Name *
                </Label>
                <Input
                  name="lastName"
                  required
                  className="h-12 rounded-lg"
                  aria-invalid={!!state?.fieldErrors?.lastName}
                />
                {state?.fieldErrors?.lastName && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.lastName[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  Email Address *
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-12 rounded-lg"
                  aria-invalid={!!state?.fieldErrors?.email}
                />
                {state?.fieldErrors?.email && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.email[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-base font-bold text-gray-900">
                  Phone Number *
                </Label>
                <Input
                  name="phone"
                  type="tel"
                  required
                  className="h-12 rounded-lg"
                  aria-invalid={!!state?.fieldErrors?.phone}
                />
                {state?.fieldErrors?.phone && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.phone[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2 md:w-1/2 md:pr-3">
                <Label className="text-base font-bold text-gray-900">
                  Company / Organization
                </Label>
                <Input name="company" className="h-12 rounded-lg" />
              </div>
            </div>
          </motion.div>

          <div className="h-px w-full bg-gray-300" />

          {/* --- Section 2: Interests --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black">
              I&apos;m Interested In *
            </h2>

            <RadioGroup
              name="serviceId"
              value={interest === "OTHER" ? "" : interest}
              onValueChange={setInterest}
              className="flex flex-col gap-4"
            >
              {services.map((service) => (
                <div key={service.id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={service.id}
                    id={service.id}
                    className="h-6 w-6 border-gray-400 text-[#0E4A66] focus-visible:ring-[#0E4A66]"
                  />
                  <Label
                    htmlFor={service.id}
                    className="cursor-pointer text-base font-medium text-black"
                  >
                    {service.title}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="OTHER"
                  id="OTHER"
                  className="h-6 w-6 border-gray-400 text-[#0E4A66] focus-visible:ring-[#0E4A66]"
                />
                <Label
                  htmlFor="OTHER"
                  className="cursor-pointer text-base font-medium text-black"
                >
                  Other (please specify)
                </Label>
              </div>
            </RadioGroup>

            {interest === "OTHER" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-9"
              >
                <Input
                  name="otherSubject"
                  placeholder="Please tell us what your matter is about..."
                  required
                  className="h-12 rounded-lg"
                />
              </motion.div>
            )}
          </motion.div>

          <div className="h-px w-full bg-gray-300" />

          {/* --- Section 3: Message with character counter --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">Your Message *</h2>
              <span
                className={cn(
                  "text-sm font-medium tabular-nums transition-colors",
                  isAtLimit
                    ? "text-red-600"
                    : isNearLimit
                      ? "text-amber-600"
                      : "text-gray-500"
                )}
              >
                {messageLength.toLocaleString()} /{" "}
                {MESSAGE_MAX.toLocaleString()}
              </span>
            </div>
            <Textarea
              name="message"
              required
              placeholder="Write your message here..."
              maxLength={MESSAGE_MAX}
              onChange={(e) => setMessageLength(e.target.value.length)}
              className={cn(
                "min-h-62.5 resize-y rounded-lg p-4",
                isAtLimit && "border-red-300 focus-visible:ring-red-200"
              )}
              aria-invalid={!!state?.fieldErrors?.message}
            />
            {/* Hint row: min-length warning, or near-limit warning */}
            {isTooShort && !state?.fieldErrors?.message && (
              <p className="text-sm text-amber-600">
                {MESSAGE_MIN - messageLength} more characters needed (min{" "}
                {MESSAGE_MIN}).
              </p>
            )}
            {isNearLimit && !isAtLimit && (
              <p className="text-sm text-amber-600">
                {remaining.toLocaleString()} characters remaining.
              </p>
            )}
            {isAtLimit && (
              <p className="text-sm text-red-600">
                Character limit reached. Please trim your message.
              </p>
            )}
            {state?.fieldErrors?.message && (
              <p className="text-sm text-red-500">
                {state.fieldErrors.message[0]}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex justify-end pt-4">
            <SubmitButton />
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}
