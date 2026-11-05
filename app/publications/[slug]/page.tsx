import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, ArrowRight } from "lucide-react"
import { publicationsPageData } from "@/lib/data/pages/publications-page-data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

  // Get content blocks (fallback to empty array if undefined)
  const contentBlocks = publication.contentBlocks || []

  // Get "More Publications" (filter out the current one and take the first 4)
  const morePublications = publicationsPageData.allPublications
    .filter((p) => p.slug !== slug)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="container mx-auto max-w-5xl px-4 pt-8 md:px-8">
        <h1 className="mb-8 text-2xl leading-tight font-bold text-gray-900 md:text-4xl">
          {publication.title}
        </h1>

        <div className="relative mb-12 h-75 w-full overflow-hidden rounded-2xl shadow-lg md:h-112.5">
          <Image
            src={publication.image}
            alt={publication.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <div className="flex flex-col gap-8">
          {contentBlocks.map((block: any, index: number) => (
            <div key={index} className="w-full">
              {/* Paragraph */}
              {block.type === "paragraph" && (
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {block.content}
                </p>
              )}

              {/* Heading */}
              {block.type === "heading" && (
                <h2 className="mt-4 mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                  {block.content}
                </h2>
              )}

              {/* List */}
              {block.type === "list" && (
                <ul className="mt-2 flex flex-col gap-3">
                  {block.items?.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 md:text-base"
                    >
                      <span className="mt-1 flex shrink-0 items-center justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0E4A66]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Image Grid */}
              {block.type === "imageGrid" && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {block.images?.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative aspect-4/3 overflow-hidden rounded-xl shadow-sm"
                    >
                      <Image
                        src={img}
                        alt={`Content image ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Data Table */}
              {block.type === "table" && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        {block.headers?.map((header: string, i: number) => (
                          <th
                            key={i}
                            className="px-6 py-4 font-bold text-gray-900"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows?.map((row: string[], i: number) => (
                        <tr
                          key={i}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          {row.map((cell, j) => (
                            <td key={j} className="px-6 py-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Video Embed */}
              {block.type === "video" && (
                <div className="group relative mt-6 aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={block.thumbnail}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                      <Play className="ml-1 h-6 w-6 fill-white text-white md:h-8 md:w-8" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fallback text if no content blocks */}
        {contentBlocks.length === 0 && (
          <p className="text-lg leading-relaxed text-gray-600">
            Full content for this publication will go here. We will fetch this
            via API later.
          </p>
        )}
      </div>

      {/* --- More Publications Carousel Section --- */}
      {morePublications.length > 0 && (
        <div className="container mx-auto mt-24 max-w-6xl border-t border-gray-200 px-4 pt-16 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-[#0E4A66]">
              More Publications
            </h2>
            <Link
              href="/publications"
              className="flex items-center gap-1 text-sm font-semibold text-[#0E4A66] hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full"
          >
            <CarouselContent className="-ml-4">
              {morePublications.map((pub) => (
                <CarouselItem
                  key={pub.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/publications/${pub.slug}`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm"
                  >
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="line-clamp-2 text-lg leading-tight font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                        {pub.title}
                      </h3>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop Controls */}
            <div className="pointer-events-none absolute top-1/2 right-4 left-4 hidden -translate-y-1/2 justify-between lg:flex">
              <CarouselPrevious className="pointer-events-auto static h-10 w-10 translate-y-0 border-none bg-white/90 text-[#0E4A66] hover:bg-white" />
              <CarouselNext className="pointer-events-auto static h-10 w-10 translate-y-0 border-none bg-white/90 text-[#0E4A66] hover:bg-white" />
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static h-10 w-10 translate-y-0 border-gray-300 text-[#0E4A66] hover:bg-gray-100" />
              <CarouselNext className="static h-10 w-10 translate-y-0 border-gray-300 text-[#0E4A66] hover:bg-gray-100" />
            </div>
          </Carousel>
        </div>
      )}
    </div>
  )
}
