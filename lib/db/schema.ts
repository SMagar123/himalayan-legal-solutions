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
    content: text("content"),
    imageUrl: varchar("image_url", { length: 500 }),
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

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type PracticeArea = typeof practiceAreas.$inferSelect
export type NewPracticeArea = typeof practiceAreas.$inferInsert
