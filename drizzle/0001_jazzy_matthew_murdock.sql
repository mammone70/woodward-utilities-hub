ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "bills" DROP CONSTRAINT "bills_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bills" ALTER COLUMN "date_issued" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE numeric(100, 2);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" SET DEFAULT '0.00';