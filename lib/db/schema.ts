import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).notNull().default("admin"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
)

export const practiceAreas = pgTable(
  "practice_areas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content"), // BlockNote JSON
    coverImage: varchar("cover_image", { length: 500 }),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("practice_areas_slug_idx").on(table.slug),
  })
)

export const publications = pgTable(
  "publications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content"),
    coverImage: varchar("cover_image", { length: 500 }),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("publications_slug_idx").on(table.slug),
  })
)

export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content"),
    coverImage: varchar("cover_image", { length: 500 }),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("services_slug_idx").on(table.slug),
  })
)

export const consultations = pgTable(
  "consultations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    company: varchar("company", { length: 255 }),
    serviceId: uuid("service_id").references(() => services.id, {
      onDelete: "set null",
    }),
    otherSubject: varchar("other_subject", { length: 255 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 20 }).default("new").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    statusIdx: index("consultations_status_idx").on(table.status),
    createdAtIdx: index("consultations_created_at_idx").on(table.createdAt),
  })
)

export const contactInquiries = pgTable(
  "contact_inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    isReadIdx: index("contact_inquiries_is_read_idx").on(table.isRead),
  })
)

export type Consultation = typeof consultations.$inferSelect
export type NewConsultation = typeof consultations.$inferInsert

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type PracticeArea = typeof practiceAreas.$inferSelect
export type NewPracticeArea = typeof practiceAreas.$inferInsert
