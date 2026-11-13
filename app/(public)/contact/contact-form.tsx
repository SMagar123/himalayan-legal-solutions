"use client"

import { useState, useEffect, useRef } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { contactPageData } from "@/lib/data/pages/contact-page-data"
import { submitContactAction } from "./actions"

const MESSAGE_MAX = 5000
const MESSAGE_MIN = 10

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 rounded-md bg-[#0E4A66] px-8 font-semibold text-white transition-all duration-300 hover:bg-[#0a3a52]"
    >
      {pending ? "Submitting..." : contactPageData.form.submitButton}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, null)
  const [messageLength, setMessageLength] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state?.success) {
      toast.success("Thank you! Your message has been received.")
      formRef.current?.reset()
      setMessageLength(0)
      topRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [state])

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

  const remaining = MESSAGE_MAX - messageLength
  const isNearLimit = remaining <= 500
  const isAtLimit = remaining <= 0
  const isTooShort = messageLength > 0 && messageLength < MESSAGE_MIN

  return (
    <>
      <div ref={topRef} />

      {state?.success && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Thank you!</p>
            <p className="text-sm text-green-700">
              Your message has been received. We&apos;ll get back to you
              shortly.
            </p>
          </div>
        </div>
      )}

      {state?.error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">Something went wrong</p>
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        action={formAction}
        onInvalid={handleInvalid}
        className="flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            name="firstName"
            required
            placeholder="First Name *"
            className="h-12 rounded-lg border-gray-200 bg-gray-50/50"
            aria-invalid={!!state?.fieldErrors?.firstName}
          />
          <Input
            name="lastName"
            required
            placeholder="Last Name *"
            className="h-12 rounded-lg border-gray-200 bg-gray-50/50"
            aria-invalid={!!state?.fieldErrors?.lastName}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            name="email"
            type="email"
            required
            placeholder="Email Address *"
            className="h-12 rounded-lg border-gray-200 bg-gray-50/50"
            aria-invalid={!!state?.fieldErrors?.email}
          />
          <Input
            name="phone"
            type="tel"
            required
            placeholder="Phone Number *"
            className="h-12 rounded-lg border-gray-200 bg-gray-50/50"
            aria-invalid={!!state?.fieldErrors?.phone}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="message"
              className="text-base font-bold text-gray-900"
            >
              How can we help? *
            </label>
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
              {messageLength.toLocaleString()} / {MESSAGE_MAX.toLocaleString()}
            </span>
          </div>
          <Textarea
            id="message"
            name="message"
            required
            maxLength={MESSAGE_MAX}
            onChange={(e) => setMessageLength(e.target.value.length)}
            className={cn(
              "min-h-[250px] resize-none rounded-lg border-gray-200 bg-gray-50/50 p-4",
              isAtLimit && "border-red-300 focus-visible:ring-red-200"
            )}
            aria-invalid={!!state?.fieldErrors?.message}
          />
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
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
