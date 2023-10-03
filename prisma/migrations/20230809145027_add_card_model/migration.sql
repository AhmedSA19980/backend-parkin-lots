/*
  Warnings:

  - A unique constraint covering the columns `[name,email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `customerpaymentCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardId` VARCHAR(191) NOT NULL,
    `cardBrand` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `cardNumber` VARCHAR(191) NOT NULL,
    `cardExpMonth` VARCHAR(191) NOT NULL,
    `cardExpYear` VARCHAR(191) NOT NULL,
    `cardCVC` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_name_email_key` ON `user`(`name`, `email`);

-- AddForeignKey
ALTER TABLE `customerpaymentCard` ADD CONSTRAINT `customerpaymentCard_userName_userEmail_fkey` FOREIGN KEY (`userName`, `userEmail`) REFERENCES `user`(`name`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
