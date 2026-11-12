import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { eq, ne, desc, and } from "drizzle-orm"
import type { Metadata } from "next"
import { ArrowRight, Calendar } from "lucide-react"
import { BlockRenderer } from "./block-renderer"
import { Disclaimer } from "@/components/molecules/Disclaimer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pub = await db.query.publications.findFirst({
    where: eq(publications.slug, slug),
  })
  if (!pub) return { title: "Publication Not Found" }
  return {
    title: pub.seoTitle || pub.title,
    description: pub.seoDescription || pub.excerpt,
    openGraph: {
      title: pub.seoTitle || pub.title,
      description: pub.seoDescription || pub.excerpt,
      images: pub.coverImage ? [{ url: pub.coverImage }] : [],
    },
  }
}

export default async function PublicationDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const pub = await db.query.publications.findFirst({
    where: eq(publications.slug, slug),
  })
  if (!pub) notFound()

  const morePublications = await db
    .select({
      id: publications.id,
      slug: publications.slug,
      title: publications.title,
      coverImage: publications.coverImage,
    })
    .from(publications)
    .where(and(ne(publications.id, pub.id), eq(publications.isPublished, true)))
    .orderBy(desc(publications.createdAt))
    .limit(6)

  let blocks: any[] = []
  try {
    blocks = JSON.parse(pub.content || "[]")
  } catch {
    blocks = []
  }

  const publishedDate = new Date(pub.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <article className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:px-8">
        <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-5xl">
          {pub.title}
        </h1>

        {/* Published Date */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>
            Published on{" "}
            <span className="font-medium text-gray-700">{publishedDate}</span>
          </span>
        </div>

        {pub.coverImage && (
          <div className="relative mb-12 h-75 w-full overflow-hidden rounded-2xl shadow-lg md:h-112.5">
            <Image
              src={pub.coverImage}
              alt={pub.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>
        )}

        <BlockRenderer blocks={blocks} />

        <Disclaimer />
      </article>

      {morePublications.length > 0 && (
        <div className="container mx-auto mt-12 max-w-6xl border-t border-gray-200 px-4 py-16 md:px-8">
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
              {morePublications.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/publications/${item.slug}`}
                    className="group relative block aspect-4/3 w-full overflow-hidden rounded-2xl shadow-sm"
                  >
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#0E4A66]/10">
                        <span className="text-sm font-medium text-[#0E4A66]/40">
                          No Cover
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="line-clamp-2 text-lg leading-tight font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                        {item.title}
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
    </>
  )
}
