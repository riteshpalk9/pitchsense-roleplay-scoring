import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ScoreSchema } from "./schema";
import { createPrompt } from "./prompt";
import "dotenv/config";

// Initialize Gemini provider via AI SDK
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function evaluatePitch(scenario: string, pitch: string) {
  const prompt = createPrompt(scenario, pitch);

  try {
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: ScoreSchema,
      prompt,
    });

    return object;
  } catch (error) {
    console.error("AI evaluation error:", error);
    throw new Error("AI evaluation failed");
  }
}
