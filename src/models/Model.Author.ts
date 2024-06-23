import Elysia, { t } from "elysia";

export enum Order {
  asc = "asc",
  desc = "desc",
}

export const AuthorModel = new Elysia({ name: "Model.Author" }).model({
  "author.create": t.Object({
    firstName: t.String({
      pattern: `^(?!\\s*$).+`,
      minLength: 1,
      maxLength: 100,
      default: "First Name",
      error: "the first name cannot be empty",
    }),
    familyName: t.String({
      pattern: `^(?!\\s*$).+`,
      minLength: 1,
      maxLength: 100,
      default: "the family name cannot be empty",
    }),
    dateOfBirth: t.Optional(
      t.String({
        pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
        default: "YYYY-MM-DD",
        error:
          "Enter the date in the following format: YYYY-MM-DD in date of birth field",
      }),
    ),
    dateOfDeath: t.Optional(
      t.String({
        pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
        default: "YYYY-MM-DD",
        error:
          "Enter the date in the following format: YYYY-MM-DD in date of death",
      }),
    ),
  }),
  "author.update": t.Object({
    firstName: t.Optional(
      t.String({
        pattern: `^(?!\\s*$).+`,
        minLength: 1,
        maxLength: 100,
        default: "First Name",
        error: "the first name cannot be empty",
      }),
    ),
    familyName: t.Optional(
      t.String({
        pattern: `^(?!\\s*$).+`,
        minLength: 1,
        maxLength: 100,
        default: "the family name cannot be empty",
      }),
    ),
    dateOfBirth: t.Optional(
      t.String({
        pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
        default: "YYYY-MM-DD",
        error:
          "Enter the date in the following format: YYYY-MM-DD in date of birth field",
      }),
    ),
    dateOfDeath: t.Optional(
      t.String({
        pattern: `^(?:[0-9]\\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
        default: "YYYY-MM-DD",
        error:
          "Enter the date in the following format: YYYY-MM-DD in date of death",
      }),
    ),
  }),
  "author.params": t.Object({
    id: t.Numeric(),
  }),
  "author.query": t.Partial(
    t.Object({
      order: t.Optional(t.Enum(Order, { default: Order.asc })),
      page: t.Optional(t.Numeric({ minimum: 1 })),
      pageSize: t.Optional(t.Numeric({ minimum: 1 })),
    }),
  ),
});
