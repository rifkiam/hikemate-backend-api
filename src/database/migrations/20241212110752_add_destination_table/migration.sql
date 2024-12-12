-- CreateTable
CREATE TABLE `Destinations` (
    `id` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(24) NOT NULL,
    `long` VARCHAR(24) NOT NULL,
    `mdpl` INTEGER NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Destinations_place_key`(`place`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
