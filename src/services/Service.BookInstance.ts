import { db } from "../database/connection";
import { bookInstance } from "../database/schema";
import { Status } from "../models/Model.BookInstance";
import { asc, eq } from "drizzle-orm";

export abstract class BookInstanceService {
  static async create(values: {
    bookId: number;
    imprint: string;
    status: Status;
    dueBack: string;
  }) {
    await db.insert(bookInstance).values(values);
  }

  static async getAll() {
    return await db
      .select()
      .from(bookInstance)
      .orderBy(asc(bookInstance.createdAt));
  }

  static async getDetails(id: number) {
    return await db.query.bookInstance.findFirst({
      where: eq(bookInstance.id, id),
    });
  }

  static async getAllInstancesFromBook(idBook: number) {
    return await db.query.bookInstance.findMany({
      where: eq(bookInstance.bookId, idBook),
    });
  }

  static async update(
    values: {
      bookId?: number;
      imprint?: string;
      status?: Status;
      dueBack?: string;
    },
    id: number,
  ) {
    return await db
      .update(bookInstance)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(bookInstance.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db
      .delete(bookInstance)
      .where(eq(bookInstance.id, id))
      .returning();
  }
}
