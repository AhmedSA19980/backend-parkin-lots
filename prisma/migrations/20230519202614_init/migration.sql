/*
  Warnings:

  - You are about to drop the `_parkinglottovehicletype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parkinglot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicletype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_parkinglottovehicletype` DROP FOREIGN KEY `_ParkingLotToVehicleType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_parkinglottovehicletype` DROP FOREIGN KEY `_ParkingLotToVehicleType_B_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_parkingLotId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropTable
DROP TABLE `_parkinglottovehicletype`;

-- DropTable
DROP TABLE `booking`;

-- DropTable
DROP TABLE `parkinglot`;

-- DropTable
DROP TABLE `vehicletype`;
