import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { ServicesGrid } from "./services-grid"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Services | Himalayan Legal Solutions",
  description:
    "Discover the legal services offered by Himalayan Legal Solutions — from corporate advisory to litigation.",
}

export default async function ServicesPage() {
  let items: any[] = []
  let fetchError = false

  try {
    items = await db
      .select({
        id: services.id,
        slug: services.slug,
        title: services.title,
        excerpt: services.excerpt,
        coverImage: services.coverImage,
      })
      .from(services)
      .where(eq(services.isPublished, true))
      .orderBy(desc(services.createdAt))
  } catch (error) {
    console.error("Failed to fetch services:", error)
    fetchError = true
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            Explore our range of legal services. We combine deep legal expertise
            with practical, business-focused advice to help you achieve your
            goals.
          </p>
        </div>

        {fetchError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-20 text-center">
            <h3 className="mb-2 text-xl font-bold text-red-800">
              Something went wrong
            </h3>
            <p className="max-w-md text-red-600">
              We couldn&apos;t load the services at this moment. Please try
              refreshing the page.
            </p>
          </div>
        ) : (
          <ServicesGrid services={items} />
        )}
      </div>
    </div>
  )
}
