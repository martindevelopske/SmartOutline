-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "Completed" SET DEFAULT false,
ALTER COLUMN "hasTopics" SET DEFAULT false;

-- AlterTable
ALTER TABLE "NestedSubtopic" ALTER COLUMN "Completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Subtopic" ALTER COLUMN "Completed" SET DEFAULT false,
ALTER COLUMN "hasNestedSubtopics" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "Completed" SET DEFAULT false,
ALTER COLUMN "hasSubTopics" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasCourses" BOOLEAN NOT NULL DEFAULT false;
