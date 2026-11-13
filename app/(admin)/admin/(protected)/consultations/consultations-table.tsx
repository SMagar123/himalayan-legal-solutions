"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  ExternalLink,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getConsultationDetailAction } from "./actions"

interface Row {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string | null
  otherSubject: string | null
  isRead: boolean
  status: string
  createdAt: string | Date
  serviceTitle: string | null
}

export function ConsultationsTable({ rows }: { rows: Row[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [detail, setDetail] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleOpen = async (id: string) => {
    setOpenId(id)
    setLoading(true)
    const res = await getConsultationDetailAction(id)
    setLoading(false)
    if (res.success) setDetail(res.row)
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
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No consultations match your filters.
                  </td>
                </tr>
              )}

              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.isRead
                      ? "hover:bg-gray-50"
                      : "bg-primary/3 hover:bg-primary/6"
                  }
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {row.firstName} {row.lastName}
                    </div>
                    {row.company && (
                      <div className="text-xs text-gray-500">{row.company}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600">{row.email}</div>
                    <div className="text-xs text-gray-600">{row.phone}</div>
                  </td>
                  <td className="max-w-55 px-4 py-3">
                    <div className="line-clamp-1 text-xs text-gray-700">
                      {row.serviceTitle
                        ? `Service: ${row.serviceTitle}`
                        : row.otherSubject || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {!row.isRead ? (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        New
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Read</span>
                    )}
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
                      onClick={() => handleOpen(row.id)}
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

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {detail ? `${detail.firstName} ${detail.lastName}` : "Loading..."}
            </DialogTitle>
            <DialogDescription>
              {detail?.company && <span>{detail.company} · </span>}
              {detail && new Date(detail.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {loading && <p className="text-sm text-gray-500">Loading...</p>}

          {detail && !loading && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a
                  href={`mailto:${detail.email}`}
                  className="flex items-center gap-2 text-gray-700 hover:underline"
                >
                  <Mail className="h-4 w-4" /> {detail.email}
                </a>
                <a
                  href={`tel:${detail.phone}`}
                  className="flex items-center gap-2 text-gray-700 hover:underline"
                >
                  <Phone className="h-4 w-4" /> {detail.phone}
                </a>
                {detail.company && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building2 className="h-4 w-4" /> {detail.company}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  {new Date(detail.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MessageSquare className="h-4 w-4" />
                  {detail.serviceTitle
                    ? `Service: ${detail.serviceTitle}`
                    : detail.otherSubject || "General inquiry"}
                </div>
                <p className="text-sm whitespace-pre-wrap text-gray-800">
                  {detail.message}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <a href={`mailto:${detail.email}`}>
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
