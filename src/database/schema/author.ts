import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { book } from "./book";

export const author = pgTable("author", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  familyName: varchar("familyName", { length: 100 }).notNull(),
  dateOfBirth: date("dateOfBirth"),
  dateOfDeath: date("dateOfDeath"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("uptadedAt").defaultNow().notNull(),
});

export const authorRelations = relations(author, ({ many }) => ({
  book: many(book),
}));
