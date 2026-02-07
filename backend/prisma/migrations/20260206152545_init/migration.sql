-- CreateTable
CREATE TABLE "serviceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "serviceCategory_pkey" PRIMARY KEY ("id")
);
