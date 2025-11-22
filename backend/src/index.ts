import express from "express";
import cors from "cors";
import "dotenv/config";
import { RoleplaySchema } from "./schema";
import { evaluatePitch } from "./ai";

const app = express();
const port = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());

app.use(cors({ origin: FRONTEND_URL }));

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/evaluate", async (req, res) => {
  // Validate request body against our Zod schema
  const parseResult = RoleplaySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid input format." });
  }
  const { scenario, pitch } = parseResult.data;

  try {
    const scoreResult = await evaluatePitch(scenario, pitch);
    res.json(scoreResult);
  } catch (error: any) {
    console.error("AI evaluation error:", error);
    res.status(500).json({ error: "Evaluation failed." });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
