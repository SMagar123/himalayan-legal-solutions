"use client"

import { useTransition } from "react"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { markConsultationReadAction } from "./actions"

export function MarkReadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const res = await markConsultationReadAction(id)
      if (res?.error) toast.error(res.error)
      else toast.success("Marked as read")
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
    >
      <Check className="mr-1 h-4 w-4" /> Mark read
    </Button>
  )
}
