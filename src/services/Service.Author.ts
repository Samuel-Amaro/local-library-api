import { asc, desc, eq, ilike, or, sql, SQLWrapper } from "drizzle-orm";
import { db } from "../database/connection";
import { author } from "../database/schema";
import { Order } from "../models/Model.Author";

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
      dateOfBirth?: string;
      dateOfDeath?: string;
      firstName?: string;
      familyName?: string;
    },
    id: number,
  ) {
    return await db
      .update(author)
      .set({
        ...values,
        updatedAt: new Date(),
      })
      .where(eq(author.id, id))
      .returning();
  }

  static async delete(id: number) {
    return await db.delete(author).where(eq(author.id, id)).returning();
  }

  static async getAll(
    page: number = 1,
    pageSize: number = 5,
    order: Order = Order.asc,
  ) {
    const data = await db.query.author.findMany({
      extras: {
        fullName:
          sql<string>`concat(${author.firstName}, ' ', ${author.familyName})`.as(
            "full_name",
          ),
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [
        order === "asc"
          ? asc(
              sql<SQLWrapper>`concat(${author.firstName}, ' ', ${author.familyName})`.getSQL(),
            )
          : desc(
              sql<SQLWrapper>`concat(${author.firstName}, ' ', ${author.familyName})`.getSQL(),
            ),
        order === "asc" ? asc(author.id) : desc(author.id),
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
    return await db.query.author.findFirst({
      where: eq(author.id, id),
    });
  }

  static async getFromName(firstName: string, familyName: string) {
    return await db.query.author.findFirst({
      where: or(
        ilike(author.firstName, firstName),
        ilike(author.familyName, familyName),
      ),
    });
  }
}
