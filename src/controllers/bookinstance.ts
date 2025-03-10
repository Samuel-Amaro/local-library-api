import Elysia from "elysia";
import { BookInstancerModel } from "../models/Model.BookInstance";
import { BookInstanceService } from "../services/Service.BookInstance";
import { BookService } from "../services/Service.Book";
import { ServiceUtils } from "../services/Service.Utils";
import { Status } from "../types";

export const createBookInstance = new Elysia().use(BookInstancerModel).post(
  "/bookinstance",
  async ({ body, set }) => {
    const bookInstance = await BookInstanceService.getFrom(
      body.bookId,
      body.imprint,
    );

    if (bookInstance) {
      set.status = 422;
      return {
        code: "UNPROCESSABLE_ENTITY",
        message: `bookInstance com bookId: ${body.bookId} is imprint: ${body.imprint} already exists!`,
      };
    }

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

export const getAllBookInstance = new Elysia().use(BookInstancerModel).get(
  "/bookinstance",
  async ({ query }) => {
    return await BookInstanceService.getAll(
      query.page,
      query.pageSize,
      query.order,
    );
  },
  {
    query: "model.bookinstance.query",
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
