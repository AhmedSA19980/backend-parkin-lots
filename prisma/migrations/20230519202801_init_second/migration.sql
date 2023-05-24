-- CreateTable
CREATE TABLE `ParkingLot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `hourlyRate` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `parkingLotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ParkingLotToVehicleType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ParkingLotToVehicleType_AB_unique`(`A`, `B`),
    INDEX `_ParkingLotToVehicleType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_parkingLotId_fkey` FOREIGN KEY (`parkingLotId`) REFERENCES `ParkingLot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParkingLotToVehicleType` ADD CONSTRAINT `_ParkingLotToVehicleType_A_fkey` FOREIGN KEY (`A`) REFERENCES `ParkingLot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParkingLotToVehicleType` ADD CONSTRAINT `_ParkingLotToVehicleType_B_fkey` FOREIGN KEY (`B`) REFERENCES `VehicleType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
