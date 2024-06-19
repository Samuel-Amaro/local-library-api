import { db } from "../database/connection";
import { author, book, genre } from "../database/schema";
import { asc, eq, ilike, or } from "drizzle-orm";

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

  static async getAll() {
    return await db.select().from(book).orderBy(asc(book.title));
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

  static async getAllBooksFromAuthor(idAuthor: number) {
    const result = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.authorId, idAuthor));
    return result.map((value) => {
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
  }

  static async getAllBooksFromGenre(idGenre: number) {
    const result = await db
      .select()
      .from(book)
      .innerJoin(author, eq(book.authorId, author.id))
      .innerJoin(genre, eq(book.genreId, genre.id))
      .where(eq(book.genreId, idGenre));
    return result.map((value) => {
      return {
        id: value.book.id,
        createdAt: value.book.createdAt,
        updatedAt: value.book.updatedAt,
        title: value.book.title,
        isbn: value.book.isbn,
        summary: value.book.summary,
        genre: value.genre.name,
        authorId: value.book.authorId,
      };
    });
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
