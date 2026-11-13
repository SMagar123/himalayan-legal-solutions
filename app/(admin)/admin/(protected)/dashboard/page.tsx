import Link from "next/link"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  publications,
  practiceAreas,
  services,
  consultations,
  contactInquiries,
} from "@/lib/db/schema"
import { desc, eq, sql } from "drizzle-orm"
import { formatDistanceToNow } from "date-fns"
import {
  BookOpen,
  FileText,
  Settings,
  Mail,
  MessageSquare,
  ArrowRight,
  Plus,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const session = await getSession()

  // Run all counts in parallel — one round-trip
  const [
    pubCount,
    areaCount,
    serviceCount,
    consultCount,
    unreadConsults,
    inquiryCount,
    unreadInquiries,
  ] = await Promise.all([
    db.select({ c: sql<number>`count(*)::int` }).from(publications),
    db.select({ c: sql<number>`count(*)::int` }).from(practiceAreas),
    db.select({ c: sql<number>`count(*)::int` }).from(services),
    db.select({ c: sql<number>`count(*)::int` }).from(consultations),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(consultations)
      .where(eq(consultations.isRead, false)),
    db.select({ c: sql<number>`count(*)::int` }).from(contactInquiries),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(contactInquiries)
      .where(eq(contactInquiries.isRead, false)),
  ])

  // Recent 5 consultations + 5 inquiries for the "Recent activity" panel
  const [recentConsults, recentInquiries] = await Promise.all([
    db
      .select({
        id: consultations.id,
        firstName: consultations.firstName,
        lastName: consultations.lastName,
        email: consultations.email,
        isRead: consultations.isRead,
        createdAt: consultations.createdAt,
      })
      .from(consultations)
      .orderBy(desc(consultations.createdAt))
      .limit(5),
    db
      .select({
        id: contactInquiries.id,
        firstName: contactInquiries.firstName,
        lastName: contactInquiries.lastName,
        email: contactInquiries.email,
        isRead: contactInquiries.isRead,
        createdAt: contactInquiries.createdAt,
      })
      .from(contactInquiries)
      .orderBy(desc(contactInquiries.createdAt))
      .limit(5),
  ])

  const stats = [
    {
      label: "Publications",
      value: pubCount[0].c,
      icon: FileText,
      href: "/admin/publications",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Practice Areas",
      value: areaCount[0].c,
      icon: BookOpen,
      href: "/admin/practice-areas",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Services",
      value: serviceCount[0].c,
      icon: Settings,
      href: "/admin/services",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Consultations",
      value: consultCount[0].c,
      unread: unreadConsults[0].c,
      icon: Mail,
      href: "/admin/consultations",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Inquiries",
      value: inquiryCount[0].c,
      unread: unreadInquiries[0].c,
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold text-[#0E4A66]">{session.name}</span>{" "}
          👋
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              {stat.unread && stat.unread > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {stat.unread > 99 ? "99+" : stat.unread} new
                </span>
              )}
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
              {stat.label}
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {stat.value.toLocaleString()}
            </p>
            <ArrowRight className="absolute right-4 bottom-4 h-4 w-4 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Quick actions + Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/admin/publications/create">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" /> New Publication
              </Button>
            </Link>
            <Link href="/admin/practice-areas/create">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" /> New Practice Area
              </Button>
            </Link>
            <Link href="/admin/services/create">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" /> New Service
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <Link
              href="/admin/consultations"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>

          {recentConsults.length === 0 && recentInquiries.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No recent activity yet. New consultations and inquiries will show
              up here.
            </p>
          ) : (
            <div className="divide-y">
              {/* Consultations */}
              {recentConsults.map((c) => (
                <Link
                  key={c.id}
                  href="/admin/consultations"
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50">
                    <Mail className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {c.firstName} {c.lastName}
                      {!c.isRead && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                          NEW
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      Consultation · {c.email}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(c.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </Link>
              ))}

              {/* Inquiries */}
              {recentInquiries.map((i) => (
                <Link
                  key={i.id}
                  href="/admin/inquiries"
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <MessageSquare className="h-4 w-4 text-rose-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {i.firstName} {i.lastName}
                      {!i.isRead && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                          NEW
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      Inquiry · {i.email}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(i.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
