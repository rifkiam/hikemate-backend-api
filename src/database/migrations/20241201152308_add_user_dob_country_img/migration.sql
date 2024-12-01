/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `username`,
    ADD COLUMN `birth_date` DATE NOT NULL,
    ADD COLUMN `country` VARCHAR(50) NOT NULL,
    ADD COLUMN `image_path` VARCHAR(255) NULL;
