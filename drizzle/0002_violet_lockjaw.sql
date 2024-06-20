ALTER TABLE "genre" ADD CONSTRAINT "genre_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "bookInstance" ADD CONSTRAINT "bookInstance_imprint_unique" UNIQUE("imprint");