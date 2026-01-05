import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenerativeAI(apiKey)

export const chatModel = client.getGenerativeModel({ model: "gemini-2.5-flash" });

