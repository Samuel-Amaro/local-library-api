import { db } from "../database/connection";
import { author, book, genre } from "../database/schema";
import { asc, desc, eq, ilike, or } from "drizzle-orm";
import { Order } from "../types";
import { ORDER, PAGE, PAGE_SIZE } from "../Utils";
import { ServiceUtils } from "./Service.Utils";

export abstract class BookService {
  static async create(values: {
    title: string;
    isbn: string;
    summary: string;
    authorId: number;
    genreId: number;
  }) {
    await db.insert(book).values(values);
  }

  static async getAll(
    page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER,
  ) {
    const dataWithoutLimit = await db.select().from(book);
    const totalPages = Math.ceil(dataWithoutLimit.length / pageSize);
    const data = await db.query.book.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        order === "asc" ? asc(book.title) : desc(book.title),
        order === "asc" ? asc(book.id) : desc(book.id),
      ],
    });

    return {
      page,
      pageSize,
      totalPages: ServiceUtils.calculateTotalPages(
        dataWithoutLimit.length,
        pageSize,
      ),
      totalItems: dataWithoutLimit.length,
      order,
      data,
    };
  }

  static async getDetails(id: number) {
    const result = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.id, id));
    return result.map((value) => {
      return {
        ...value.book,
        author: `${value.author.firstName} ${value.author.familyName}`,
        genre: value.genre.name,
      };
    });
  }

  static async getAllBooksFromAuthor(
    idAuthor: number,
    page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER,
  ) {
    const resultWithoutLimit = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.authorId, idAuthor));

    const result = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.authorId, idAuthor))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy(
        order === "asc" ? asc(book.title) : desc(book.title),
        order === "asc" ? asc(book.id) : desc(book.id),
      );

    const data = result.map((value) => {
      return {
        id: value.book.id,
        createdAt: value.book.createdAt,
        updatedAt: value.book.updatedAt,
        title: value.book.title,
        isbn: value.book.isbn,
        summary: value.book.summary,
        genreId: value.book.genreId,
        genre: value.genre.name,
      };
    });

    return {
      page,
      pageSize,
      totalPages: ServiceUtils.calculateTotalPages(
        resultWithoutLimit.length,
        pageSize,
      ),
      totalItems: resultWithoutLimit.length,
      order,
      data,
    };
  }

  static async getAllBooksFromGenre(
    idGenre: number,
    page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER,
  ) {
    const resultWithoutLimit = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.genreId, idGenre));

    const result = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.genreId, idGenre))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy(
        order === "asc" ? asc(book.title) : desc(book.title),
        order === "asc" ? asc(book.id) : desc(book.id),
      );

    const data = result.map((value) => {
      return {
        id: value.book.id,
        createdAt: value.book.createdAt,
        updatedAt: value.book.updatedAt,
        title: value.book.title,
        isbn: value.book.isbn,
        summary: value.book.summary,
        authorId: value.book.authorId,
      };
    });

    return {
      page,
      pageSize,
      totalPages: ServiceUtils.calculateTotalPages(
        resultWithoutLimit.length,
        pageSize,
      ),
      totalItems: resultWithoutLimit.length,
      order,
      data,
    };
  }

  static async update(
    values: {
      title?: string;
      isbn?: string;
      summary?: string;
      authorId?: number;
      genreId?: number;
    },
    id: number,
  ) {
    return await db
      .update(book)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(book.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db.delete(book).where(eq(book.id, id)).returning();
  }

  static async getFrom(title?: string, isbn?: string) {
    return await db.query.book.findFirst({
      where: or(
        title ? ilike(book.title, title) : undefined,
        isbn ? ilike(book.isbn, isbn) : undefined,
      ),
    });
  }
}
