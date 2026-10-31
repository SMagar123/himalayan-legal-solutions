export type NavItem = {
  title: string
  href?: string
  submenu?: { title: string; href: string; description?: string }[]
}

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    submenu: [
      {
        title: "Our Firm",
        href: "/about",
        description: "Learn about our history and values.",
      },
      {
        title: "Our Team",
        href: "/team",
        description: "Meet our experienced attorneys.",
      },
      {
        title: "Careers",
        href: "/careers",
        description: "Join our growing team.",
      },
    ],
  },
  { title: "Publications", href: "/publications" },
  {
    title: "Services",
    submenu: [
      { title: "Corporate Law", href: "/services/corporate" },
      { title: "Litigation", href: "/services/litigation" },
      { title: "Real Estate", href: "/services/real-estate" },
    ],
  },
  {
    title: "Practice Areas",
    submenu: [
      { title: "Family Law", href: "/practice/family" },
      { title: "Criminal Defense", href: "/practice/criminal" },
      { title: "Intellectual Property", href: "/practice/ip" },
    ],
  },
  { title: "Contact", href: "/contact" },
]
