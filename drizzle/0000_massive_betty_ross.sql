DO $$ BEGIN
 CREATE TYPE "public"."status_enum" AS ENUM('available', 'maintenance', 'loaned', 'reserved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "author" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"familyName" varchar(100) NOT NULL,
	"dateOfBirth" date,
	"dateOfDeath" date,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"uptadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genre" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"uptadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"isbn" varchar(17) NOT NULL,
	"summary" text NOT NULL,
	"authorId" integer,
	"genreId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"uptadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookInstance" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookId" integer,
	"imprint" text NOT NULL,
	"status" "status_enum" DEFAULT 'maintenance' NOT NULL,
	"dueBack" date DEFAULT now(),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"uptadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_authorId_author_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."author"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_genreId_genre_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genre"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookInstance" ADD CONSTRAINT "bookInstance_bookId_book_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
