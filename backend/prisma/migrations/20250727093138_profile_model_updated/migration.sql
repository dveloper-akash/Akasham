/*
  Warnings:

  - You are about to drop the column `social` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClientProfile" ADD COLUMN "socials" JSONB;

-- AlterTable
ALTER TABLE "EditorProfile" ADD COLUMN "socials" JSONB;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'email',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "needsOnboarding" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT,
    "currentRole" TEXT,
    "displayName" TEXT,
    "username" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "country" TEXT,
    "state" TEXT
);
INSERT INTO "new_User" ("avatarUrl", "country", "createdAt", "currentRole", "displayName", "email", "id", "needsOnboarding", "phone", "provider", "role", "state", "updatedAt", "username") SELECT "avatarUrl", "country", "createdAt", "currentRole", "displayName", "email", "id", "needsOnboarding", "phone", "provider", "role", "state", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
