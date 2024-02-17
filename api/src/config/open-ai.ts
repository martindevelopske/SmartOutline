// import { Configuration, OpenAIApi } from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAPI_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export default openai;
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY,
  //   organization: "org-WT1KfF0aa4AAKdNIaaq9peCe",
});
