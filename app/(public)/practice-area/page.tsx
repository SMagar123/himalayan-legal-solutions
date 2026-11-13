import { db } from "@/lib/db"
import { practiceAreas } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { PracticeAreasGrid } from "./practice-areas-grid"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Practice Areas | Himalayan Legal Solutions",
  description:
    "Explore our core areas of legal practice, from corporate law to civil litigation, tailored to the needs of clients in Nepal.",
}

export default async function PracticeAreasPage() {
  let areas: any[] = []
  let fetchError = false

  try {
    areas = await db
      .select({
        id: practiceAreas.id,
        slug: practiceAreas.slug,
        title: practiceAreas.title,
        excerpt: practiceAreas.excerpt,
        coverImage: practiceAreas.coverImage,
      })
      .from(practiceAreas)
      .where(eq(practiceAreas.isPublished, true))
      .orderBy(desc(practiceAreas.createdAt))
  } catch (error) {
    console.error("Failed to fetch practice areas:", error)
    fetchError = true
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="inline-block border-b-[3px] border-[#0E4A66] pb-1 text-3xl font-bold text-[#0E4A66] md:text-4xl">
            Practice Areas
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            Explore our core areas of legal practice. We provide strategic
            counsel and robust representation across a wide spectrum of legal
            disciplines, tailored to meet the unique needs of our clients.
          </p>
        </div>

        {fetchError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-20 text-center">
            <h3 className="mb-2 text-xl font-bold text-red-800">
              Something went wrong
            </h3>
            <p className="max-w-md text-red-600">
              We couldn&apos;t load the practice areas at this moment. Please
              try refreshing the page.
            </p>
          </div>
        ) : (
          <PracticeAreasGrid areas={areas} />
        )}
      </div>
    </div>
  )
}
