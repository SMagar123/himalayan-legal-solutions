"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Mail, Phone, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { markInquiryReadAction } from "./actions"

interface Row {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  isRead: boolean
  createdAt: string | Date
}

export function InquiriesTable({ rows }: { rows: Row[] }) {
  const router = useRouter()
  const [openRow, setOpenRow] = useState<Row | null>(null)
  const [, startTransition] = useTransition()

  const handleOpen = (row: Row) => {
    setOpenRow(row)

    // Mark as read on the server if not already
    if (!row.isRead) {
      startTransition(async () => {
        await markInquiryReadAction(row.id)
        // Refresh the server component tree (updates the sidebar badge)
        router.refresh()
      })
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No inquiries match your search.
                  </td>
                </tr>
              )}

              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.isRead
                      ? "hover:bg-gray-50"
                      : "bg-primary/[0.03] hover:bg-primary/[0.06]"
                  }
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {row.firstName} {row.lastName}
                    </div>
                    {!row.isRead && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600">{row.email}</div>
                    <div className="text-xs text-gray-600">{row.phone}</div>
                  </td>
                  <td className="max-w-[300px] px-4 py-3">
                    <p className="line-clamp-1 text-xs text-gray-700">
                      {row.message}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDistanceToNow(new Date(row.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpen(row)}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!openRow} onOpenChange={(o) => !o && setOpenRow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {openRow ? `${openRow.firstName} ${openRow.lastName}` : ""}
            </DialogTitle>
            <DialogDescription>
              {openRow && new Date(openRow.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {openRow && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a
                  href={`mailto:${openRow.email}`}
                  className="flex items-center gap-2 text-gray-700 hover:underline"
                >
                  <Mail className="h-4 w-4" /> {openRow.email}
                </a>
                <a
                  href={`tel:${openRow.phone}`}
                  className="flex items-center gap-2 text-gray-700 hover:underline"
                >
                  <Phone className="h-4 w-4" /> {openRow.phone}
                </a>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap text-gray-800">
                {openRow.message}
              </div>
              <div className="flex justify-end">
                <a href={`mailto:${openRow.email}`}>
                  <Button size="sm">Reply by email</Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
