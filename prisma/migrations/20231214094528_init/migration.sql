/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeCustomerID" TEXT,
ADD COLUMN     "subscriptionID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerID_key" ON "User"("stripeCustomerID");
