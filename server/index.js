const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// --- CORS Configuration ---
const corsOptions = {
  origin: "https://jredding43.github.io", // GitHub Pages domain
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support

// --- Middleware ---
app.use(express.json());

// --- Request Logger ---
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// --- POST: Submit Survey ---
app.post("/survey", async (req, res) => {
  const { answers } = req.body;
  console.log("Received:", answers);

  try {
    await pool.query(
      "INSERT INTO survey_responses (answers) VALUES ($1)",
      [JSON.stringify(answers)]
    );
    console.log("Saved to database");
    res.status(200).send("Survey submitted successfully");
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Error saving survey");
  }
});

// --- GET: Retrieve All Survey Responses ---
app.get("/responses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM survey_responses ORDER BY submitted_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Error retrieving responses");
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
