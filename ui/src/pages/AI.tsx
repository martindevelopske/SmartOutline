import { useEffect, useState } from "react";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});
const AI = () => {
  // Your GPT-3 API Key
  const [generatedOutline, setGeneratedOutline] = useState("");

  const generateOutline = async (userInput) => {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo", // Choose the engine based on your requirements
        prompt: `Generate a course outline based on the user input: Data structures}`,
      });
      console.log(response);

      setGeneratedOutline(response.choices[0].text);
    } catch (error) {
      console.error("Error generating outline:", error);
    }
  };

  useEffect(() => {
    // Example usage: Trigger outline generation when user input changes
    const userInput = "User's input text goes here...";
    generateOutline(userInput);
  }, []); // Add dependencies based on your specific requirements

  return (
    // ... Your existing JSX code
    <div>
      {/* Display the generated outline */}
      <div>
        <h2>Generated Course Outline:</h2>
        <p>{generatedOutline}</p>
      </div>
    </div>
  );
};

export default AI;
// import OpenAI from "openai";
// const openai = new OpenAI();
// export default async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
