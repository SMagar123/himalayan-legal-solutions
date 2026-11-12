"use server"

import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { getSession } from "@/lib/auth"
import { v4 as uuidv4 } from "uuid"

export async function uploadImageAction(formData: FormData) {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" }
  }

  const file = formData.get("file") as File
  if (!file) {
    return { error: "No file provided" }
  }

  // Validate file type (basic)
  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image." }
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create a unique filename
  const ext = path.extname(file.name)
  const filename = `${uuidv4()}${ext}`

  // Define upload path
  const uploadDir = path.join(process.cwd(), "public/uploads")

  // Ensure directory exists
  await mkdir(uploadDir, { recursive: true })

  // Write file
  await writeFile(path.join(uploadDir, filename), buffer)

  // Return the public URL
  return { url: `/uploads/${filename}` }
}
