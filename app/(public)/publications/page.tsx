import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { motion } from "motion/react" // Keep for header animation
import { PublicationsGrid } from "./publications-grid"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Publications | Himalayan Legal Solutions",
  description:
    "Explore our collection of legal publications, research, and insights covering Nepalese laws, regulatory developments, and contemporary legal issues.",
}

export default async function PublicationsPage() {
  let allPublications: any[] = []
  let fetchError = false

  try {
    allPublications = await db
      .select({
        id: publications.id,
        slug: publications.slug,
        title: publications.title,
        excerpt: publications.excerpt,
        coverImage: publications.coverImage,
      })
      .from(publications)
      .where(eq(publications.isPublished, true))
      .orderBy(desc(publications.createdAt))
  } catch (error) {
    console.error("Failed to fetch publications:", error)
    fetchError = true
  }

  return (
    <div className="min-h-screen bg-white lg:pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title & Description */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            Publications
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            Explore our collection of legal publications, research, and insights
            covering Nepalese laws, regulatory developments, and contemporary
            legal issues. Stay informed through thoughtful analysis and
            practical guidance on matters shaping the legal and business
            landscape.
          </p>
        </div>

        {/* Error State */}
        {fetchError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-20 text-center">
            <h3 className="mb-2 text-xl font-bold text-red-800">
              Something went wrong
            </h3>
            <p className="max-w-md text-red-600">
              We couldn&apos;t load the publications at this moment. Please try
              refreshing the page.
            </p>
          </div>
        ) : (
          <PublicationsGrid publications={allPublications} />
        )}
      </div>
    </div>
  )
}
