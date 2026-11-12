import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Himalayan Legal Solutions",
  description:
    "A team of highly skilled legal professionals equipped to navigate complex cross-border commercial transactions and resolve sophisticated legal disputes in Nepal.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
