import { GoogleGenAI } from "@google/genai";

// console.log("Gemini API Key found?", import.meta.env.VITE_GEMINI_API_KEY ? "✅ YES" : "❌ NO");

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default async function runChat(PROMTS) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: PROMTS,
  });
  console.log(response.text);
  return(response.text);
}
