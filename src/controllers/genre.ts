import Elysia from "elysia";
import { GenreModel } from "../models/Model.Genre";
import { GenreService } from "../services/Service.Genre";
import { BookService } from "../services/Service.Book";
import { ServiceUtils } from "../services/Service.Utils";

export const createGenre = new Elysia().use(GenreModel).post(
  "/genre",
  async ({ body, set }) => {
    const genre = await GenreService.getFromName(body.name);

    if (genre) {
      set.status = 422;
      return {
        code: "UNPROCESSABLE_ENTITY",
        message: `genre with name: ${body.name} already exists!`,
      };
    }

    await GenreService.create(body);

    set.status = 201;
  },
  {
    body: "genre.create.body",
  },
);

export const getAllGenre = new Elysia().use(GenreModel).get(
  "/genre",
  async ({ query }) => {
    return await GenreService.getAll(query.page, query.pageSize, query.order);
  },
  {
    query: "genre.query",
  },
);

export const getDetailsGenre = new Elysia().use(GenreModel).get(
  "/genre/:id",
  async ({ params: { id }, set, query }) => {
    const genre = await GenreService.getDetails(id);

    if (!genre) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Genre not found :(",
      };
    }

    return {
      books: await BookService.getAllBooksFromGenre(
        id,
        query.page,
        query.pageSize,
        query.order,
      ),
      genre: genre,
    };
  },
  {
    params: "genre.params",
    query: "genre.query",
  },
);

export const updateGenre = new Elysia().use(GenreModel).put(
  "/genre/:id",
  async ({ body, params: { id }, set }) => {
    const changes = ServiceUtils.partialBody<{ name: string }, typeof body>(
      body,
    );

    if (!ServiceUtils.hasKeys(changes)) {
      set.status = 400;

      return {
        message: "Body request not valid",
      };
    }

    const genre = await GenreService.update(changes, id);

    if (genre.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: `Genre with id: ${id} not found :(`,
      };
    }

    set.status = 201;

    return {
      message: `Genre with id: ${id} updated successfully!`,
      status: 201,
    };
  },
  {
    body: "genre.put.update",
    params: "genre.params",
  },
);

export const deleteGenre = new Elysia().use(GenreModel).delete(
  "/genre/:id",
  async ({ params: { id }, set }) => {
    const genre = await GenreService.delete(id);

    if (genre.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Genre not found :(",
      };
    }
  },
  {
    params: "genre.params",
  },
);
