// app/(public)/publications/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import { db } from "@/lib/db"
import { publications } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { BlockRenderer } from "./block-renderer"

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

  // Parse the JSON blocks
  let blocks: any[] = []
  try {
    blocks = JSON.parse(pub.content || "[]")
  } catch {
    blocks = []
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 pt-10 pb-24 md:px-8">
      <h1 className="mb-8 text-3xl leading-tight font-bold text-gray-900 md:text-5xl">
        {pub.title}
      </h1>
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
    </article>
  )
}
