"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { toast } from "sonner"
import { uploadImageAction } from "../../../publications/UploadActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateServiceAction } from "../../actions"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import slugify from "slugify"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="bg-primary">
      {pending ? "Updating..." : "Update Service"}
    </Button>
  )
}

interface Props {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  seoTitle: string
  seoDescription: string
}

export function EditServiceEditor({
  id,
  title: initialTitle,
  slug: initialSlug,
  excerpt,
  content,
  coverImage: initialCoverImage,
  seoTitle,
  seoDescription,
}: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [slug, setSlug] = useState(initialSlug)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true)
  const [coverImage, setCoverImage] = useState(initialCoverImage)

  const router = useRouter()
  const [state, formAction] = useActionState(updateServiceAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success("Service updated successfully!")
      router.push("/admin/services")
    }
  }, [state, router])

  useEffect(() => {
    if (state?.error) toast.error(state.error)
  }, [state])

  let initialContent = undefined
  try {
    const parsed = JSON.parse(content)
    if (parsed && parsed.length > 0) initialContent = parsed
  } catch {}

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImageAction(formData)
    if (result?.url) return result.url
    throw new Error("Upload failed")
  }

  const editor = useCreateBlockNote({
    initialContent,
    uploadFile: handleImageUpload,
  })

  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title, { lower: true, strict: true, trim: true }))
    }
  }, [title, slugManuallyEdited])

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImageAction(formData)
    if (result?.url) setCoverImage(result.url)
  }

  const handleFormSubmit = (formData: FormData) => {
    formData.append("content", JSON.stringify(editor.document))
    formAction(formData)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="text-3xl font-bold text-primary">Edit Service</h1>

      {state?.error && (
        <div className="rounded bg-red-50 p-3 text-red-600">{state.error}</div>
      )}

      <form action={handleFormSubmit} className="space-y-6">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="coverImage" value={coverImage} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <Input
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setSlugManuallyEdited(true)
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Excerpt (For cards)</Label>
          <Textarea name="excerpt" defaultValue={excerpt} />
        </div>

        <div className="space-y-2">
          <Label>Cover Image</Label>
          <Input type="file" accept="image/*" onChange={handleCoverUpload} />
          {coverImage && (
            <div className="relative mt-2 h-48 w-80 overflow-hidden rounded-lg border shadow-sm">
              <Image
                src={coverImage}
                alt="Cover Preview"
                fill
                sizes="320px"
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold">SEO Metadata</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>SEO Title (Optional)</Label>
              <Input name="seoTitle" defaultValue={seoTitle} />
            </div>
            <div className="space-y-2">
              <Label>SEO Description (Optional)</Label>
              <Input name="seoDescription" defaultValue={seoDescription} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <div className="min-h-[500px] rounded-lg border bg-white p-4">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
