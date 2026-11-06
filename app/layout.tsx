import type { Metadata } from "next" // Import Metadata type
import { Geist_Mono, Outfit, Lexend } from "next/font/google"

import "./globals.css"
import { SmoothScroll } from "@/components/molecules/SmoothScroll"
import { Navbar } from "@/components/organisms/Navbar/Navbar"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/organisms/Footer"
import { BreadcrumbNav } from "@/components/molecules/BreadCrumbNav"
import { ScrollToTop } from "@/components/molecules/ScrollToTop"
import { ScrollToTopButton } from "@/components/organisms/ScrollToTopButton"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual production domain
  title: {
    default: "Himalayan Legal Solutions | Expert Legal Counsel",
    template: "%s | Himalayan Legal Solutions", // Appends the site name to any child page titles
  },
  description:
    "A team of highly skilled legal professionals equipped to navigate complex cross-border commercial transactions and resolve sophisticated legal disputes in Nepal.",
  keywords: [
    "Law Firm Nepal",
    "Corporate Law Kathmandu",
    "Legal Solutions",
    "Cross-border transactions",
    "Himalayan Legal Solutions",
    "Litigation Nepal",
  ],
  authors: [{ name: "Himalayan Legal Solutions" }],
  creator: "Himalayan Legal Solutions",

  // Favicon & Icons (Place these files inside your /public folder)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (For Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com", // Replace with your actual domain
    title: "Himalayan Legal Solutions | Expert Legal Counsel",
    description:
      "A team of highly skilled legal professionals equipped to navigate complex cross-border commercial transactions and resolve sophisticated legal disputes.",
    siteName: "Himalayan Legal Solutions",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Himalayan Legal Solutions - Expert Legal Counsel",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Himalayan Legal Solutions | Expert Legal Counsel",
    description:
      "A team of highly skilled legal professionals equipped to navigate complex cross-border commercial transactions.",
    images: ["/og-image.jpg"],
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        outfit.variable
      )}
    >
      <body>
        <SmoothScroll>
          <ScrollToTop />
          <Navbar />

          <BreadcrumbNav />

          {children}
          <ScrollToTopButton />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
