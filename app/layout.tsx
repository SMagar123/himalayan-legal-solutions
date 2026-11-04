import { Geist, Geist_Mono, Outfit } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
        <ThemeProvider>
          <SmoothScroll>
            <ScrollToTop />
            <Navbar />
            <BreadcrumbNav />

            {children}
            <ScrollToTopButton />
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
