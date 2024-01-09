/*
  Warnings:

  - Added the required column `hasTopics` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasNestedSubtopics` to the `Subtopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasSubTopics` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "hasTopics" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Subtopic" ADD COLUMN     "hasNestedSubtopics" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "hasSubTopics" BOOLEAN NOT NULL;
