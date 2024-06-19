import Elysia from "elysia";
import { BookModel } from "../models/Model.Book";
import { AuthorService } from "../services/Service.Author";
import { GenreService } from "../services/Service.Genre";
import { BookService } from "../services/Service.Book";
import { ServiceUtils } from "../services/Service.Utils";

export const createBook = new Elysia().use(BookModel).post(
  "/book",
  async ({ body, set }) => {
    const author = AuthorService.getDetails(body.authorId);
    const genre = GenreService.getDetails(body.genreId);

    if (!author) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Author not found :(",
      };
    }

    if (!genre) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Genre not found :(",
      };
    }

    await BookService.create(body);
    set.status = 201;
  },
  {
    body: "model.create.body",
  },
);

export const getAllBooks = new Elysia().get("/book", async () => {
  return await BookService.getAll();
});

export const getDetailsBook = new Elysia().use(BookModel).get(
  "/book/:id",
  async ({ params: { id }, set }) => {
    const book = await BookService.getDetails(id);

    if (book.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Book not found :(",
      };
    }

    return book[0];
  },
  {
    params: "model.params",
  },
);

export const updateBook = new Elysia().use(BookModel).put(
  "/book/:id",
  async ({ params: { id }, set, body }) => {
    const changes = ServiceUtils.partialBody<
      {
        title: string;
        isbn: string;
        summary: string;
        authorId: number;
        genreId: number;
      },
      typeof body
    >(body);

    if (!ServiceUtils.hasKeys(changes)) {
      set.status = 400;

      return {
        message: "Body request not valid",
      };
    } else if (changes.authorId) {
      const author = await AuthorService.getDetails(changes.authorId);

      if (!author) {
        set.status = 404;
        return {
          code: "NOT_FOUND",
          message: `Author with id: ${changes.authorId} not found :(`,
        };
      }
    } else if (changes.genreId) {
      const genre = await GenreService.getDetails(changes.genreId);

      if (!genre) {
        set.status = 404;
        return {
          code: "NOT_FOUND",
          message: `Genre with id: ${changes.genreId} not found :(`,
        };
      }
    }

    const book = await BookService.update(changes, id);

    if (book.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: `Book with id: ${id} not found :(`,
      };
    }

    set.status = 201;

    return {
      message: `Book with id: ${id} updated successfully!`,
      status: 201,
    };
  },
  {
    body: "model.update",
    params: "model.params",
  },
);

export const deleteBook = new Elysia().use(BookModel).delete(
  "/book/:id",
  async ({ params: { id }, set }) => {
    const book = await BookService.delete(id);

    if (book.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Book not found :(",
      };
    }
  },
  {
    params: "model.params",
  },
);
