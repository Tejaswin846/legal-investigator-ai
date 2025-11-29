import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your real API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/investigate", async (req, res) => {
  try {
    const query = req.body.query;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a legal investigator AI. Provide accurate legal explanations." },
        { role: "user", content: query }
      ]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
