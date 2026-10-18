import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const targetColor = { red: 64, green: 98, blue: 212 };

// Example: POST /api/evaluate/red with { "red": 50 }.
app.post("/api/evaluate/:channel", (req, res) => {
  const channel = req.params.channel;
  if (!Object.hasOwn(targetColor, channel)) {
    return res.status(404).json({ error: "Unknown color channel." });
  }

  const input = req.body?.[channel];
  // Accept numbers or digit strings, but reject empty guesses.
  if (
    typeof input !== "number" &&
    !(typeof input === "string" && /^\d{1,3}$/.test(input))
  ) {
    return res
      .status(400)
      .json({ error: "Enter a whole number from 0 to 255." });
  }

  const guess = Number(input);
  if (!Number.isInteger(guess) || guess < 0 || guess > 255) {
    return res
      .status(400)
      .json({ error: "Enter a whole number from 0 to 255." });
  }

  const target = targetColor[channel];
  let feedback = "correct";
  if (guess < target) {
    feedback = "increase";
  } else if (guess > target) {
    feedback = "decrease";
  }

  return res.json({ channel, feedback });
});

app.post("/api/start", (req, res) => {
  res.json(targetColor);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
