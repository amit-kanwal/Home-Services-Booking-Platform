-- CreateTable
CREATE TABLE "ServiceProviderInformation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "town" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "ServiceProviderInformation_pkey" PRIMARY KEY ("id")
);
