import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { book } from "./book";

export const genre = pgTable("genre", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("uptadedAt").defaultNow().notNull(),
});

export const genreRelations = relations(genre, ({ many }) => ({
  book: many(book),
}));
