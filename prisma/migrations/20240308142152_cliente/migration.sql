-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "coordenada_x" TEXT NOT NULL DEFAULT '',
    "coordenada_y" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
