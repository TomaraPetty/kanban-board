import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const columns = pgTable("columns", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().references(() => columns.status),
  assignee: varchar("assignee", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}) 