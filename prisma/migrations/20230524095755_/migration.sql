/*
  Warnings:

  - You are about to drop the column `price` on the `parkinglot` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `parkinglot` table. All the data in the column will be lost.
  - Added the required column `price` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `parkinglot` DROP COLUMN `price`,
    DROP COLUMN `totalPrice`;
