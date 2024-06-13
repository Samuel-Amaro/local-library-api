import Elysia, { t } from "elysia";
import { AuthorModel } from "../../models/author";
import { AuthorService } from "../../services/author/service";

export const createAuthor = new Elysia().use(AuthorModel).post(
  "/author",
  async ({ body }) => {
    await AuthorService.create(body);
  },
  {
    body: "author.create",
  },
);

export const getAllAuthors = new Elysia().get("/author", async () => {
  return await AuthorService.getAll();
});

export const getDetailsAuthor = new Elysia().get(
  "/author/:id",
  async ({ params: { id }, set }) => {
    const author = await AuthorService.getDetails(id);

    if (!author) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Author not found :(",
      };
    }

    return author;
  },
  {
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);

export const updateAuthor = new Elysia().use(AuthorModel).put(
  "/author/:id",
  async ({ body, params: { id }, set }) => {
    const updatedAuthor = await AuthorService.update(body, id);

    if (updatedAuthor.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Author not found :(",
      };
    }

    set.status = 201;
  },
  {
    body: "author.update",
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);

export const deleteAuthor = new Elysia().delete(
  "/author/:id",
  async ({ params: { id }, set }) => {
    const deletedAuthor = await AuthorService.delete(id);

    if (deletedAuthor.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Author not found :(",
      };
    }

    set.status = 201;
  },
  {
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);
