"use client"

import dynamic from "next/dynamic" // Import dynamic
import Link from "next/link"
import { motion } from "motion/react"
import { MapPin, Phone, Mail, Scale, Loader2 } from "lucide-react"
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import { footerData } from "@/lib/data/footer-data"
import { containerVariants, itemVariants } from "@/lib/animations"

// Dynamically import the map component with a loading skeleton
const GoogleMap = dynamic(
  () => import("@/components/molecules/GoogleMap").then((mod) => mod.GoogleMap),
  {
    ssr: false, // Prevents server-side rendering errors
    loading: () => (
      <div className="flex h-50 w-full animate-pulse items-center justify-center rounded-md border border-white/10 bg-white/10">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      </div>
    ),
  }
)

const IconMap = {
  Facebook: FaFacebookF,
  TikTok: FaTiktok,
  Instagram: FaInstagram,
  X: FaXTwitter,
  WhatsApp: FaWhatsapp,
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-primary pt-20 pb-8 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-full"
        >
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Column 1: Logo & About */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start pr-0 lg:col-span-5 lg:pr-8"
            >
              <Link
                href={footerData.logo.href}
                className="group mb-6 flex items-center gap-3"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:scale-105">
                  <Scale className="h-5 w-5" />
                </div>
                <span className="text-3xl font-semibold tracking-wide text-white">
                  {footerData.logo.name}
                </span>
              </Link>

              <h3 className="mb-3 text-lg font-bold">
                {footerData.about.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                {footerData.about.description}
              </p>

              {/* Dynamically Loaded Map */}
              <GoogleMap embedUrl={footerData.about.mapEmbedUrl} />
            </motion.div>

            {/* Column 2: Services */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:col-span-2"
            >
              <h3 className="mb-6 text-lg font-bold">
                {footerData.columns[0].title}
              </h3>
              <ul className="flex flex-col gap-3">
                {footerData.columns[0].links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Expertise */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:col-span-2"
            >
              <h3 className="mb-6 text-lg font-bold">
                {footerData.columns[1].title}
              </h3>
              <ul className="flex flex-col gap-3">
                {footerData.columns[1].links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Socials, Hours & Contact */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-8 lg:col-span-3"
            >
              <div>
                <h3 className="mb-4 text-lg font-bold">
                  {footerData.socials.title}
                </h3>
                <div className="flex items-center gap-4">
                  {footerData.socials.links.map((social, index) => {
                    const Icon =
                      IconMap[social.icon as keyof typeof IconMap] ||
                      FaFacebookF
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        className="text-white transition-colors duration-300 hover:text-white/70"
                        aria-label={social.name}
                      >
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold">
                  {footerData.officeHours.title}
                </h3>
                <p className="text-sm text-white/70">
                  {footerData.officeHours.time}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold">
                  {footerData.contact.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                    <span className="max-w-[200px] text-sm leading-relaxed text-white/70">
                      {footerData.contact.address}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-white/70" />
                    <a
                      href={`tel:${footerData.contact.phone}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {footerData.contact.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-white/70" />
                    <a
                      href={`mailto:${footerData.contact.email}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {footerData.contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="mb-6 h-px w-full bg-white/20" />

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-white/80">{footerData.copyright}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
