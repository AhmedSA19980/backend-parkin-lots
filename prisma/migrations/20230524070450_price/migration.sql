/*
  Warnings:

  - You are about to drop the column `deleted` on the `user` table. All the data in the column will be lost.
  - Added the required column `price` to the `parkinglot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `parkinglot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parkinglot` ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `deleted`,
    ADD COLUMN `isuserdeleted` BOOLEAN NOT NULL DEFAULT false;
