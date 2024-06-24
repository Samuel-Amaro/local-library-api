import Elysia, { t } from "elysia";
import { AuthorModel } from "../models/Model.Author";
import { AuthorService } from "../services/Service.Author";
import { BookService } from "../services/Service.Book";
import { ServiceUtils } from "../services/Service.Utils";

export const createAuthor = new Elysia().use(AuthorModel).post(
  "/author",
  async ({ body, set }) => {
    const author = await AuthorService.getFromName(
      body.firstName,
      body.familyName,
    );

    if (author) {
      set.status = 422;
      return {
        code: "UNPROCESSABLE_ENTITY",
        message: `author with first name: ${body.firstName} is family name: ${body.familyName} already exists!`,
      };
    }

    await AuthorService.create(body);
    set.status = 201;
  },
  {
    body: "author.create",
  },
);

export const getAllAuthors = new Elysia().use(AuthorModel).get(
  "/author",
  async ({ query }) => {
    return await AuthorService.getAll(query.page, query.pageSize, query.order);
  },
  {
    query: "author.query",
  },
);

export const getDetailsAuthor = new Elysia().use(AuthorModel).get(
  "/author/:id",
  async ({ params: { id }, set, query }) => {
    const author = await AuthorService.getDetails(id);

    if (!author) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Author not found :(",
      };
    }

    return {
      ...author,
      books: await BookService.getAllBooksFromAuthor(
        id,
        query.page,
        query.pageSize,
        query.order,
      )
    };
  },
  {
    params: "author.params",
    query: "author.query",
  },
);

export const updateAuthor = new Elysia().use(AuthorModel).put(
  "/author/:id",
  async ({ body, params: { id }, set }) => {
    const changes = ServiceUtils.partialBody<
      {
        firstName: string;
        familyName: string;
        dateOfBirth: string;
        dateOfDeath: string;
      },
      typeof body
    >(body);

    if (!ServiceUtils.hasKeys(changes)) {
      set.status = 400;
      return {
        message: "Body request not valid",
      };
    }

    const updatedAuthor = await AuthorService.update(changes, id);

    if (updatedAuthor.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: `Author withh id ${id} not found :(`,
      };
    }

    set.status = 201;

    return {
      message: `Author with id: ${id} updated successfully!`,
      status: 201,
    };
  },
  {
    body: "author.update",
    params: "author.params",
  },
);

export const deleteAuthor = new Elysia().use(AuthorModel).delete(
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
  },
  {
    params: "author.params",
  },
);
