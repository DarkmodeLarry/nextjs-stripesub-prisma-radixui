/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_at_period_end` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
DROP COLUMN "stripe_at_period_end",
ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3);
