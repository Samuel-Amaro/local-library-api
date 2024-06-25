import { asc, desc, eq, ilike } from "drizzle-orm";
import { db } from "../database/connection";
import { genre } from "../database/schema";
import { ORDER, PAGE, PAGE_SIZE } from "../Utils";
import { Order } from "../types";
import { ServiceUtils } from "./Service.Utils";

export abstract class GenreService {
  static async create(values: { name: string }) {
    await db.insert(genre).values(values);
  }

  static async getAll(
    page: number = PAGE,
    pageSize: number = PAGE_SIZE,
    order: Order = ORDER,
  ) {
    const dataWithoutLimit = await db.select().from(genre);

    const data = await db.query.genre.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        order === "asc" ? asc(genre.name) : desc(genre.name),
        order === "asc" ? asc(genre.id) : desc(genre.id),
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
    return await db.query.genre.findFirst({
      where: eq(genre.id, id),
    });
  }

  static async update(values: { name?: string }, id: number) {
    return await db
      .update(genre)
      .set({
        ...values,
        updatedAt: new Date(),
      })
      .where(eq(genre.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db.delete(genre).where(eq(genre.id, id)).returning();
  }

  static async getFromName(name: string) {
    return await db.query.genre.findFirst({
      where: ilike(genre.name, name),
    });
  }
}
