import Elysia from "elysia";
import { BookService } from "../services/Service.Book";
import { AuthorService } from "../services/Service.Author";
import { GenreService } from "../services/Service.Genre";
import { BookInstanceService } from "../services/Service.BookInstance";

export const catalog = new Elysia().get("/catalog", async () => {
  const books = await BookService.getAll();
  const authors = await AuthorService.getAll();
  const genres = await GenreService.getAll();
  const bookInstances = await BookInstanceService.getAll();
  const bookInstancesAvailable =
    await BookInstanceService.getAllBookInstanceFromAvailable();

  return {
    books: books.totalItems,
    authors: authors.totalItems,
    genres: genres.totalItems,
    copies: bookInstances.totalItems,
    copiesAvailable: bookInstancesAvailable.totalItems,
  };
});
