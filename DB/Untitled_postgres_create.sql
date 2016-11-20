CREATE TABLE "Users" (
	"ID" integer NOT NULL UNIQUE,
	"telegram_id" integer NOT NULL UNIQUE,
	"other_info(feature)" integer NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Lots" (
	"ID" serial NOT NULL UNIQUE,
	"owner_id" integer NOT NULL,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"price" integer NOT NULL,
	"start_time" TIME NOT NULL,
	"end_time" TIME NOT NULL,
	"winner_id" integer NOT NULL,
	CONSTRAINT Lots_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Lots" ADD CONSTRAINT "Lots_fk0" FOREIGN KEY ("owner_id") REFERENCES "Users"("ID");
ALTER TABLE "Lots" ADD CONSTRAINT "Lots_fk1" FOREIGN KEY ("winner_id") REFERENCES "Users"("ID");

