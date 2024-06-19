import Elysia from "elysia";
import { BookInstancerModel, Status } from "../models/Model.BookInstance";
import { BookInstanceService } from "../services/Service.BookInstance";
import { BookService } from "../services/Service.Book";
import { ServiceUtils } from "../services/Service.Utils";

export const createBookInstance = new Elysia().use(BookInstancerModel).post(
  "/bookinstance",
  async ({ body, set }) => {
    const book = await BookService.getDetails(body.bookId);

    if (book.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Book not found :(",
      };
    }

    await BookInstanceService.create(body);

    set.status = 201;
  },
  {
    body: "model.create",
  },
);

export const getAllBookInstance = new Elysia().get(
  "/bookinstance",
  async () => {
    return await BookInstanceService.getAll();
  },
);

export const getDetailsBookInstance = new Elysia().use(BookInstancerModel).get(
  "/bookinstance/:id",
  async ({ params: { id }, set }) => {
    const instance = await BookInstanceService.getDetails(id);

    if (!instance) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "BookInstance not found :(",
      };
    }

    return instance;
  },
  {
    params: "model.params",
  },
);

export const getAllInstancesFromBook = new Elysia().use(BookInstancerModel).get(
  "/bookinstance/all/:id",
  async ({ params: { id }, set }) => {
    const book = await BookService.getDetails(id);

    if (book.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Book not found :(",
      };
    }

    return await BookInstanceService.getAllInstancesFromBook(id);
  },
  {
    params: "model.params",
  },
);

export const updateBookInstance = new Elysia().use(BookInstancerModel).put(
  "/bookinstance/:id",
  async ({ params: { id }, body, set }) => {
    const changes = ServiceUtils.partialBody<
      {
        bookId: number;
        status: Status;
        dueBack: string;
        imprint: string;
      },
      typeof body
    >(body);

    if (!ServiceUtils.hasKeys(changes)) {
      set.status = 400;

      return {
        message: "Body request not valid",
      };
    } else if (changes.bookId) {
      const book = await BookService.getDetails(changes.bookId);

      if (book.length === 0) {
        set.status = 404;
        return {
          code: "NOT_FOUND",
          message: `Book with id: ${changes.bookId} not found :(`,
        };
      }
    }

    const updateBookInstance = await BookInstanceService.update(changes, id);

    if (updateBookInstance.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: `BookInstance with id: ${id} not found :(`,
      };
    }

    set.status = 201;

    return {
      message: `BookInstance with id: ${id} updated successfully!`,
      status: 201,
    };
  },
  {
    body: "model.bookinstance.update",
    params: "model.params",
  },
);

export const deleteBookInstance = new Elysia().use(BookInstancerModel).delete(
  "/bookinstance/:id",
  async ({ params: { id }, set }) => {
    const instance = await BookInstanceService.delete(id);

    if (instance.length === 0) {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: `BookInstance with id: ${id} not found :(`,
      };
    }
  },
  {
    params: "model.params",
  },
);
