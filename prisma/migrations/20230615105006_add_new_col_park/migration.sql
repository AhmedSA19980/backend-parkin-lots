/*
  Warnings:

  - Added the required column `capacityUsed` to the `parkinglot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parkinglot` ADD COLUMN `capacityUsed` INTEGER NOT NULL;
