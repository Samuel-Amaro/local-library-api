import { asc, eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { genre } from "../../database/schema";

export abstract class GenreService {
  static async create(values: { name: string }) {
    await db.insert(genre).values(values);
  }

  static async getAll() {
    return db.select().from(genre).orderBy(asc(genre.name));
  }

  static async getDetails(id: number) {
    return await db.query.genre.findFirst({
      where: eq(genre.id, id),
    });
  }

  static async update(values: { name: string }, id: number) {
    return await db
      .update(genre)
      .set(values)
      .where(eq(genre.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db.delete(genre).where(eq(genre.id, id)).returning();
  }
}
