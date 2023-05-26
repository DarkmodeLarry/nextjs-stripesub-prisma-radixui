/*
  Warnings:

  - You are about to drop the column `paymentIntentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_current_period_end` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Benefits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentIntentID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_paymentIntentId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentIntentId",
ADD COLUMN     "paymentIntentID" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripe_current_period_end";

-- DropTable
DROP TABLE "Benefits";

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentID_key" ON "Order"("paymentIntentID");
