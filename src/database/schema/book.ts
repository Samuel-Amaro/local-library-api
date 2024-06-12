import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { author } from "./author";
import { genre } from "./genre";
import { relations } from "drizzle-orm";
import { bookInstance } from "./bookinstance";

export const book = pgTable("book", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  isbn: varchar("isbn", { length: 17 }).notNull(),
  summary: text("summary").notNull(),
  authorId: integer("authorId").references(() => author.id, {
    onDelete: "set null",
  }),
  genreId: integer("genreId").references(() => genre.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("uptadedAt").defaultNow().notNull(),
});

export const booksRelations = relations(book, ({ one, many }) => ({
  author: one(author, {
    fields: [book.authorId],
    references: [author.id],
  }),
  genre: one(genre, {
    fields: [book.genreId],
    references: [genre.id],
  }),
  bookInstance: many(bookInstance),
}));
