import { notFound } from "next/navigation"
import { publicationsPageData } from "@/lib/data/pages/publications-page-data"

export default async function PublicationDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Await params in Next.js 15+
  const { slug } = await params

  // Find the publication based on the slug
  const publication = publicationsPageData.allPublications.find(
    (p) => p.slug === slug
  )

  // If slug doesn't exist, show 404
  if (!publication) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-32">
      <h1 className="mb-8 text-4xl font-bold text-[#0E4A66]">
        {publication.title}
      </h1>
      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
        {/* Add Image here in the future */}
      </div>
      <p className="text-lg leading-relaxed text-gray-600">
        Full content for this publication will go here. We will fetch this via
        API later.
      </p>
    </div>
  )
}
