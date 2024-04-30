/*
  Warnings:

  - You are about to drop the column `brityh` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `brityh`,
    ADD COLUMN `birthday` DATETIME(3) NOT NULL;
