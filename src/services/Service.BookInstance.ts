import { db } from "../database/connection";
import { bookInstance } from "../database/schema";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { Order, Status } from "../types";
import { ORDER, PAGE, PAGE_SIZE } from "../Utils";

export abstract class BookInstanceService {
  static async create(values: {
    bookId: number;
    imprint: string;
    status: Status;
    dueBack: string;
  }) {
    await db.insert(bookInstance).values(values);
  }

  static async getAll(
    page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER,
  ) {
    const data = await db.query.bookInstance.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        order === "asc"
          ? asc(bookInstance.createdAt)
          : desc(bookInstance.createdAt),
        order === "asc" ? asc(bookInstance.id) : desc(bookInstance.id),
      ],
    });

    return {
      page,
      pageSize,
      order,
      data,
    };
  }

  static async getDetails(id: number) {
    return await db.query.bookInstance.findFirst({
      where: eq(bookInstance.id, id),
    });
  }

  static async getAllInstancesFromBook(idBook: number, page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER) {
    const data = await db.query.bookInstance.findMany({
      where: eq(bookInstance.bookId, idBook),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        order === "asc"
          ? asc(bookInstance.createdAt)
          : desc(bookInstance.createdAt),
        order === "asc" ? asc(bookInstance.id) : desc(bookInstance.id),
      ],
    });
    return {
      page,
      pageSize,
      order,
      data
    };
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

  static async getFrom(bookId: number, imprint: string) {
    return await db.query.bookInstance.findFirst({
      where: and(
        eq(bookInstance.bookId, bookId),
        ilike(bookInstance.imprint, imprint),
      ),
    });
  }

  static async getAllBookInstanceFromAvailable() {
    return await db.query.bookInstance.findMany({
      where: eq(bookInstance.status, "available"),
    });
  }
}
