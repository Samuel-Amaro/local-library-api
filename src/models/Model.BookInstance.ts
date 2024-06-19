import Elysia, { t } from "elysia";

export enum Status {
  available = "available",
  maintenance = "maintenance",
  loaned = "loaned",
  reserved = "reserved",
}

export const BookInstancerModel = new Elysia({
  name: "Model.BookInstance",
}).model({
  "model.create": t.Object({
    bookId: t.Numeric({ minimum: 1 }),
    imprint: t.String({
      minLength: 1,
      pattern: `^(?!\\s*$).+`,
      default: "imprint from book instance",
      error: "book instance field cannot be empty, it is required",
    }),
    status: t.Enum(Status, { default: Status.maintenance }),
    dueBack: t.String({
      pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
      default: "YYYY-MM-DD",
      error:
        "Enter the date in the following format: YYYY-MM-DD in date of due back",
    }),
  }),
  "model.params": t.Object({
    id: t.Numeric({ minimum: 1 }),
  }),
  "model.bookinstance.update": t.Object({
    bookId: t.Optional(t.Numeric({ minimum: 1 })),
    imprint: t.Optional(
      t.String({
        minLength: 1,
        pattern: `^(?!\\s*$).+`,
        default: "imprint from book instance",
        error: "book instance field cannot be empty, it is required",
      }),
    ),
    status: t.Optional(t.Enum(Status, { default: Status.maintenance })),
    dueBack: t.Optional(
      t.String({
        pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
        default: "YYYY-MM-DD",
        error:
          "Enter the date in the following format: YYYY-MM-DD in date of due back",
      }),
    ),
  }),
});
