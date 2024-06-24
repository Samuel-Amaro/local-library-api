import Elysia, { t } from "elysia";
import { Order } from "../types";

export const BookModel = new Elysia({ name: "Model.Book" }).model({
  "model.create.body": t.Object({
    title: t.String({
      minLength: 1,
      pattern: `^(?!\\s*$).+`,
      default: "Title book",
      error: "title field cannot be empty, it is required",
    }),
    isbn: t.String({
      minLength: 1,
      maxLength: 17,
      pattern: `^(?!\\s*$).+`,
      default: "isbn book with format 000-0-00-000000-0",
      error: "isbn field cannot be empty, it is required",
    }),
    summary: t.String({
      minLength: 1,
      pattern: `^(?!\\s*$).+`,
      default: "summary book",
      error: "summary field cannot be empty, it is required",
    }),
    authorId: t.Numeric({ minimum: 1 }),
    genreId: t.Numeric({ minimum: 1 }),
  }),
  "model.params": t.Object({
    id: t.Numeric(),
  }),
  "model.update": t.Object({
    title: t.Optional(
      t.String({
        minLength: 1,
        pattern: `^(?!\\s*$).+`,
        default: "Title book",
        error: "title field cannot be empty, it is required",
      }),
    ),
    isbn: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 17,
        pattern: `^(?!\\s*$).+`,
        default: "isbn book with format 000-0-00-000000-0",
        error: "isbn field cannot be empty, it is required",
      }),
    ),
    summary: t.Optional(
      t.String({
        minLength: 1,
        pattern: `^(?!\\s*$).+`,
        default: "summary book",
        error: "summary field cannot be empty, it is required",
      }),
    ),
    authorId: t.Optional(t.Numeric({ minimum: 1 })),
    genreId: t.Optional(t.Numeric({ minimum: 1 })),
  }),
  "model.book.query": t.Partial(
    t.Object({
      order: t.Optional(t.Enum(Order, { default: Order.asc })),
      page: t.Optional(t.Numeric({ minimum: 1 })),
      pageSize: t.Optional(t.Numeric({ minimum: 1 })),
    }),
  ),
});
