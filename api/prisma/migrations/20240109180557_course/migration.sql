-- DropIndex
DROP INDEX "User_id_key";

-- CreateTable
CREATE TABLE "Course" (
    "CourseID" SERIAL NOT NULL,
    "UserID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseID")
);

-- CreateTable
CREATE TABLE "Topic" (
    "TopicID" SERIAL NOT NULL,
    "CourseID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("TopicID")
);

-- CreateTable
CREATE TABLE "Subtopic" (
    "SubtopicID" SERIAL NOT NULL,
    "TopicID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,
    "ParentSubtopicID" INTEGER,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("SubtopicID")
);

-- CreateTable
CREATE TABLE "NestedSubtopic" (
    "SubtopicID" SERIAL NOT NULL,
    "ParentSubtopicID" INTEGER,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,

    CONSTRAINT "NestedSubtopic_pkey" PRIMARY KEY ("SubtopicID")
);

-- CreateTable
CREATE TABLE "_ChildNestedSubtopics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChildNestedSubtopics_AB_unique" ON "_ChildNestedSubtopics"("A", "B");

-- CreateIndex
CREATE INDEX "_ChildNestedSubtopics_B_index" ON "_ChildNestedSubtopics"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_TopicID_fkey" FOREIGN KEY ("TopicID") REFERENCES "Topic"("TopicID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildNestedSubtopics" ADD CONSTRAINT "_ChildNestedSubtopics_A_fkey" FOREIGN KEY ("A") REFERENCES "NestedSubtopic"("SubtopicID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildNestedSubtopics" ADD CONSTRAINT "_ChildNestedSubtopics_B_fkey" FOREIGN KEY ("B") REFERENCES "Subtopic"("SubtopicID") ON DELETE CASCADE ON UPDATE CASCADE;
