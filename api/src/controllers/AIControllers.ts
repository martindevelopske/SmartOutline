import { Request, Response } from "express";
import { openai } from "../config/open-ai.js";
// const api_key = process.env.OPENAPI_KEY;
// const organization = process.env.OPENAPI_ORG;
const schema = {
  type: "object",
  properties: {
    courseTitle: {
      type: "string",
      description: "Data structures and Algorithms",
    },
    courseDescription: {
      type: "string",
      description:
        "A short description of the topic and what the student will learn. It should be more than 50 words.",
    },
    courseTopics: {
      type: "array",
      items: {
        type: "object",
        properties: {
          topicTitle: { type: "string", description: "A title of the topic" },
          topicDescription: {
            type: "string",
            description:
              "a description of what to be learned on this topic. should be more than 50 words of what the student will learn from that topic.",
          },
        },
      },
      description: "An array containing all the topics ",
    },
  },
  required: ["courseTitle", "courseDescription", "courseTopics"],
};

export const AI = async (req: Request, res: Response) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "you are a course outline generator",
      },
      {
        role: "user",
        content:
          "generate a course outline for a data structures and algorithms course",
      },
    ],
    functions: [{ name: "AI", parameters: schema }],
    model: "gpt-3.5-turbo",
  });

  const resp = completion.choices[0].message.function_call?.arguments;
  console.log(resp);

  // const arr = Array(resp);
  // console.log(typeof resp, resp?.length, typeof arr, arr);
  res.send(resp);

  //   const parsed = JSON.parse(resp!);
  //   console.log(parsed);
};
