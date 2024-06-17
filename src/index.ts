import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getDetailsAuthor,
  updateAuthor,
} from "./controllers/author";
import {
  createGenre,
  deleteGenre,
  getAllGenre,
  getDetailsGenre,
  updateGenre,
} from "./controllers/genre";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getDetailsBook,
  updateBook,
} from "./controllers/book";

const app = new Elysia({ prefix: "/api/v1" })
  .use(createAuthor)
  .use(getAllAuthors)
  .use(getDetailsAuthor)
  .use(updateAuthor)
  .use(deleteAuthor)
  .use(createGenre)
  .use(getDetailsGenre)
  .use(getAllGenre)
  .use(updateGenre)
  .use(deleteGenre)
  .use(createBook)
  .use(getAllBooks)
  .use(getDetailsBook)
  .use(updateBook)
  .use(deleteBook)
  .use(
    cors({
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      origin: (request): boolean => {
        const origin = request.headers.get("origin");

        if (!origin) {
          return false;
        }

        return true;
      },
    }),
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Local Library API Documentation",
          version: "1.0.0",
        },
      },
    }),
  )
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status;

        return error.toResponse();
      }
      case "NOT_FOUND": {
        return "Route not found :(";
      }
      default: {
        console.log(error);

        return new Response(null, { status: 500 });
      }
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
