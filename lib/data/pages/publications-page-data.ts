export const publicationsPageData = {
  title: "Publications",
  // Mock database of publications
  allPublications: [
    {
      id: 1,
      slug: "lorem-ipsum-dolor-sit-amet-1",
      title: "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop", // Gavel
      isFeatured: false,
    },
    {
      id: 2,
      slug: "lorem-ipsum-dolor-sit-amet-2",
      title: "Lorem Ipsum",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", // Mountains
      isFeatured: true, // Has overlay by default
    },
    {
      id: 3,
      slug: "lorem-ipsum-dolor-sit-amet-3",
      title: "Lorem ipsum dolor sit amet consectetur.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop", // Lady Justice
      isFeatured: false,
    },
    {
      id: 4,
      slug: "lorem-ipsum-dolor-sit-amet-4",
      title: "Lorem ipsum dolor sit amet consectetur.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop", // Handshake
      isFeatured: false,
    },
    {
      id: 5,
      slug: "lorem-ipsum-dolor-sit-amet-5",
      title: "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      id: 6,
      slug: "lorem-ipsum-dolor-sit-amet-6",
      title: "Lorem ipsum dolor sit amet consectetur.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      id: 7,
      slug: "lorem-ipsum-dolor-sit-amet-7",
      title: "Lorem ipsum dolor sit amet consectetur.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      id: 8,
      slug: "lorem-ipsum-dolor-sit-amet-8",
      title: "Lorem Ipsum",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
      isFeatured: true,
    },
    // Add more items to test pagination logic...
  ],
}
