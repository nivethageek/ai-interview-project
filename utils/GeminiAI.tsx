import { GoogleGenAI } from "@google/genai";

const apiGeminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
export const ai = new GoogleGenAI({ apiKey: apiGeminiKey });
