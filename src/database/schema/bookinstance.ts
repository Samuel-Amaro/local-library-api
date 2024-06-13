import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { book } from "./book";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("status_enum", [
  "available",
  "maintenance",
  "loaned",
  "reserved",
]);

export const bookInstance = pgTable("bookInstance", {
  id: serial("id").primaryKey(),
  bookId: integer("bookId").references(() => book.id, {
    onDelete: "cascade",
  }),
  imprint: text("imprint").notNull(),
  status: statusEnum("status").default("maintenance").notNull(),
  dueBack: date("dueBack").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("uptadedAt").defaultNow().notNull(),
});

export const bookInstanceRelations = relations(
  bookInstance,
  ({ one, many }) => ({
    book: one(book, {
      fields: [bookInstance.bookId],
      references: [book.id],
    }),
  }),
);
