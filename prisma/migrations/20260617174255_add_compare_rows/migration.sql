-- CreateTable
CREATE TABLE "CompareRow" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "direct" TEXT NOT NULL,
    "airbnb" TEXT NOT NULL,
    "vrbo" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CompareRow_pkey" PRIMARY KEY ("id")
);
