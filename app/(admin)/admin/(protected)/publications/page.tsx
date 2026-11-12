// app/(admin)/admin/(protected)/publications/page.tsx

import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import { Plus, Edit, ExternalLink } from "lucide-react"
import { DeletePublicationButton } from "./DeleteButton"

export default async function AdminPublicationsPage() {
  const allPublications = await db
    .select()
    .from(publications)
    .orderBy(desc(publications.createdAt))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publications</h1>
          <p className="mt-1 text-gray-500">
            Manage your articles, insights, and legal updates.
          </p>
        </div>
        <Link href="/admin/publications/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> New Publication
          </Button>
        </Link>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4">Publication</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allPublications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No publications found. Click &quot;New Publication&quot; to
                    create one.
                  </td>
                </tr>
              ) : (
                allPublications.map((pub) => (
                  <tr
                    key={pub.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {pub.coverImage ? (
                            <Image
                              src={pub.coverImage}
                              alt={pub.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="line-clamp-1 max-w-[300px] font-semibold text-gray-900">
                            {pub.title}
                          </span>
                          <span className="font-mono text-xs text-gray-400">
                            /{pub.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          pub.isPublished
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {pub.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(pub.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/publications/${pub.slug}`}
                          target="_blank"
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary"
                          title="View Live"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/publications/edit/${pub.id}`}
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeletePublicationButton
                          id={pub.id}
                          title={pub.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
