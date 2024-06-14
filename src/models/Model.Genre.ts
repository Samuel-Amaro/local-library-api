import Elysia, { t } from "elysia";

export const GenreModel = new Elysia({ name: "Model.Genre" }).model({
  "genre.create.body": t.Object({
    name: t.String({
      minLength: 1,
      maxLength: 100,
      pattern: `^(?!\\s*$).+`,
      default: "Name Genre",
      error: "name field cannot be empty, it is required",
    }),
  }),
  "genre.params": t.Object({
    id: t.Numeric(),
  }),
  "genre.put.update": t.Object({
    name: t.String({
      minLength: 1,
      maxLength: 100,
      pattern: `^(?!\\s*$).+`,
      default: "Name Genre",
      error: "name field cannot be empty, it is required",
    }),
  }),
});
