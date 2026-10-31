import Link from "next/link"
import { Scale } from "lucide-react"

export function NavLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Animated Logo Icon */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Scale className="h-5 w-5" />
      </div>
      <span className="text-xl font-semibold tracking-wide text-white transition-colors group-hover:text-white/90 md:text-2xl">
        Himalayan Legal Solutions
      </span>
    </Link>
  )
}
