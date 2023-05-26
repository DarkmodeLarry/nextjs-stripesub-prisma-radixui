-- CreateTable
CREATE TABLE "Benefits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Benefits_pkey" PRIMARY KEY ("id")
);
