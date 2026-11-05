import Link from "next/link"
import Image from "next/image"

export function NavLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Animated Logo Image */}
      <div className="relative flex h-15 w-40 shrink-0 items-center justify-center transition-transform duration-300 md:w-50 lg:h-20">
        <Image
          src="/logo.png"
          alt="Himalayan Legal Solutions Logo"
          fill
          priority
          className="object-cover"
        />
      </div>
    </Link>
  )
}
