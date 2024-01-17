import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const createCousrseOutline = async (req: Request, res: Response) => {
  console.log(req.body);
  const { hasTopics, Title, userID, Description, topics } = req.body;
  //create course
  const outline = await prisma.course.create({
    data: {
      hasTopics: topics.length > 0 ? true : false,
      Title: Title,
      Description: Description,
      user: { connect: { id: userID } },
    },
  });
  console.log(outline);

  //add the topics
  if (topics.length > 0) {
    console.log("topics available");
    topics.forEach(async (topicEl: any) => {
      const { Description, Name } = topicEl;
      const topic = await prisma.topic.create({
        data: {
          course: { connect: { CourseID: outline.CourseID } },
          Name: Name,
          Description: Description,
        },
      });
      console.log("topic aded to course");
    });
  }
};
export const getCourseOutline = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany({ include: { topics: true } });
  res.json({ success: true, message: courses });
};