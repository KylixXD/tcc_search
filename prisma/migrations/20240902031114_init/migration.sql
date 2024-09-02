-- CreateTable
CREATE TABLE "Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "curso" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SubareaComputacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subareas" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Orientador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CaracteristicasTcc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "objetoEstudo" TEXT NOT NULL,
    "usoConhecimento" TEXT NOT NULL,
    "objetivoEstudo" TEXT NOT NULL,
    "principalAreaConhecimento" TEXT NOT NULL,
    "coletaSerhumano" BOOLEAN NOT NULL,
    "subareaComputacaoId" INTEGER NOT NULL,
    CONSTRAINT "CaracteristicasTcc_subareaComputacaoId_fkey" FOREIGN KEY ("subareaComputacaoId") REFERENCES "SubareaComputacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TCCs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoDefesa" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "orientadorId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "caracteristicasTccId" INTEGER NOT NULL,
    CONSTRAINT "TCCs_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TCCs_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Orientador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TCCs_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TCCs_caracteristicasTccId_fkey" FOREIGN KEY ("caracteristicasTccId") REFERENCES "CaracteristicasTcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orientador_email_key" ON "Orientador"("email");
