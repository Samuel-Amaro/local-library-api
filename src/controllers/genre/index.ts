import Elysia, { t } from "elysia";
import { GenreModel } from "../../models/Model.Genre";
import { GenreService } from "../../services/genre/Service.Genre";

export const createGenre = new Elysia().use(GenreModel).post(
  "/genre",
  async ({ body, set }) => {
    await GenreService.create(body);

    set.status = 201;
  },
  {
    body: "genre.create.body",
  },
);

export const getAllGenre = new Elysia().get("/genre", async () => {
  return await GenreService.getAll();
});

export const getDetailsGenre = new Elysia().use(GenreModel).get(
  "/genre/:id",
  async ({ params: { id }, set }) => {
    const genre = await GenreService.getDetails(id);

    if (!genre) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Genre not found :(",
      };
    }

    return genre;
  },
  {
    params: "genre.params",
  },
);

export const updateGenre = new Elysia().use(GenreModel).put(
  "/genre/:id",
  async ({ body, params: { id }, set }) => {
    const genre = await GenreService.update(body, id);

    if (genre.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Genre not found :(",
      };
    }

    set.status = 201;

    return genre;
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
