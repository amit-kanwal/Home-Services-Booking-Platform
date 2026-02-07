/*
  Warnings:

  - You are about to drop the `serviceCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "serviceCategory";

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);
