"use client"

import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  // Initialize editor in read-only mode by not passing onchange
  const editor = useCreateBlockNote({
    initialContent: blocks.length > 0 ? blocks : undefined,
  })

  return (
    <div className="prose prose-lg max-w-none">
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  )
}
