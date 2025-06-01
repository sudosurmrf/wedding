-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "groom" TEXT NOT NULL,
    "wife" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "ourstory" TEXT NOT NULL,
    "ceremony" TEXT NOT NULL,
    "reception" TEXT NOT NULL,
    "dresscode" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
