"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { uploadImageAction } from "../UploadActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { savePublicationAction } from "./save-action"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import slugify from "slugify"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="bg-primary">
      {pending ? "Saving..." : "Save Publication"}
    </Button>
  )
}

export function PublicationEditor() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [coverImage, setCoverImage] = useState<string>("")
  const [state, formAction] = useActionState(savePublicationAction, null)

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(
        slugify(title, {
          lower: true,
          strict: true,
          trim: true,
        })
      )
    }
  }, [title, slugManuallyEdited])

  // Custom Image Upload for BlockNote
  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImageAction(formData)
    if (result?.url) {
      return result.url
    }
    throw new Error("Upload failed")
  }

  // Initialize BlockNote editor with the custom upload function
  const editor = useCreateBlockNote({
    uploadFile: handleImageUpload,
  })

  // Convert Blocks to JSON string before submitting the form
  const handleFormAction = (formData: FormData) => {
    // Get current blocks from editor
    const blocks = editor.document
    formData.append("content", JSON.stringify(blocks))
    return formAction(formData)
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImageAction(formData)
    if (result?.url) {
      setCoverImage(result.url)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="text-3xl font-bold text-primary">Create Publication</h1>

      {state?.error && (
        <div className="rounded bg-red-50 p-3 text-red-600">{state.error}</div>
      )}

      <form action={handleFormAction} className="space-y-6">
        <input type="hidden" name="coverImage" value={coverImage} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              placeholder="Publication Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <Input
              name="slug"
              placeholder="my-publication-slug"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setSlugManuallyEdited(true)
              }}
            />
            <p className="text-xs text-gray-500">
              Auto-generated from title. You can edit it manually.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Excerpt (For cards)</Label>
          <Textarea name="excerpt" placeholder="Short summary..." />
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
              <Input
                name="seoTitle"
                placeholder="Custom title for search engines"
              />
            </div>
            <div className="space-y-2">
              <Label>SEO Description (Optional)</Label>
              <Input name="seoDescription" placeholder="Custom description" />
            </div>
          </div>
        </div>

        {/* BlockNote Editor */}
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
