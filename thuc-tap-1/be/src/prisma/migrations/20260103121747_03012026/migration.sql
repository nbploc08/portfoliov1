-- CreateTable
CREATE TABLE `AssetHistory` (
    `id` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `portfolioId` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,
    `oldAmount` DOUBLE NOT NULL,
    `newAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssetHistory` ADD CONSTRAINT `AssetHistory_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `PortfolioAsset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
