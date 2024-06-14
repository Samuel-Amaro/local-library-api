import { asc, eq } from "drizzle-orm";
import { db } from "../database/connection";
import { author } from "../database/schema";

export abstract class AuthorService {
  static async create(values: {
    dateOfBirth?: string | null;
    dateOfDeath?: string | null;
    firstName: string;
    familyName: string;
  }) {
    await db.insert(author).values(values);
  }

  static async update(
    values: {
      dateOfBirth?: string | null;
      dateOfDeath?: string | null;
      firstName: string;
      familyName: string;
      updatedAt?: Date | undefined;
    },
    id: number,
  ) {
    return await db
      .update(author)
      .set(values)
      .where(eq(author.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db.delete(author).where(eq(author.id, id)).returning();
  }

  static async getAll() {
    return await db.select().from(author).orderBy(asc(author.firstName));
  }

  static async getDetails(id: number) {
    return await db.query.author.findFirst({
      where: eq(author.id, id),
    });
  }
}
