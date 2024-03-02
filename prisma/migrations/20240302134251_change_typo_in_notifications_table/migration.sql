/*
  Warnings:

  - You are about to drop the column `readt_at` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "readt_at",
ADD COLUMN     "read_at" TIMESTAMP(3);
