-- CreateTable
CREATE TABLE `Sos_alerts` (
    `id` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(24) NOT NULL,
    `long` VARCHAR(24) NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `chat_id` VARCHAR(20) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hike_spots` (
    `id` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(24) NOT NULL,
    `long` VARCHAR(24) NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `chat_id` VARCHAR(20) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Hike_spots_chat_id_key`(`chat_id`),
    UNIQUE INDEX `Hike_spots_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sos_alerts` ADD CONSTRAINT `Sos_alerts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
