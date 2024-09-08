-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orientador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT
);
INSERT INTO "new_Orientador" ("email", "id", "nome") SELECT "email", "id", "nome" FROM "Orientador";
DROP TABLE "Orientador";
ALTER TABLE "new_Orientador" RENAME TO "Orientador";
CREATE UNIQUE INDEX "Orientador_email_key" ON "Orientador"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
