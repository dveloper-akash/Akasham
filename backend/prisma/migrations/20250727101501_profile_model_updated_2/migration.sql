/*
  Warnings:

  - You are about to drop the column `clientBio` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `editorBio` on the `EditorProfile` table. All the data in the column will be lost.
  - Added the required column `bio` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `EditorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "company" TEXT,
    "job" TEXT,
    "socials" JSONB,
    CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientProfile" ("company", "id", "job", "socials", "userId") SELECT "company", "id", "job", "socials", "userId" FROM "ClientProfile";
DROP TABLE "ClientProfile";
ALTER TABLE "new_ClientProfile" RENAME TO "ClientProfile";
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "ClientProfile"("userId");
CREATE TABLE "new_EditorProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" JSONB,
    "portfolio" JSONB,
    "socials" JSONB,
    CONSTRAINT "EditorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EditorProfile" ("id", "portfolio", "skills", "socials", "userId") SELECT "id", "portfolio", "skills", "socials", "userId" FROM "EditorProfile";
DROP TABLE "EditorProfile";
ALTER TABLE "new_EditorProfile" RENAME TO "EditorProfile";
CREATE UNIQUE INDEX "EditorProfile_userId_key" ON "EditorProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
