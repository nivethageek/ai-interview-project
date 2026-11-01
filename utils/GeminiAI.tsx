import "server-only";
import { GoogleGenAI } from "@google/genai";

export function getAI() {
  const apiGeminiKey = process.env.GEMINI_API_KEY;
  if (!apiGeminiKey) {
    throw new Error("GEMINI_API_KEY is not set in the server environment.");
  }

  return new GoogleGenAI({ apiKey: apiGeminiKey });
}
