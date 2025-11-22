import { z } from "zod";

// Request schema for the /evaluate endpoint
export const RoleplaySchema = z.object({
  scenario: z.string().nonempty(),
  pitch: z.string().nonempty(),
});

// Response schema for the scoring output
export const ScoreSchema = z.object({
  overallScore: z.number().min(0).max(40),
  clarity: z.number().min(0).max(10),
  relevance: z.number().min(0).max(10),
  persuasiveness: z.number().min(0).max(10),
  confidence: z.number().min(0).max(10),
  insights: z.string(),
});
export type RoleplayInput = z.infer<typeof RoleplaySchema>;
export type ScoreOutput = z.infer<typeof ScoreSchema>;
