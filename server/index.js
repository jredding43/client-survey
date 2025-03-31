const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// --- CORS Configuration ---
const corsOptions = {
  origin: "https://feedback.r43digitaltech.com",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));

// --- Middleware ---
app.use(express.json());

// --- Request Logger ---
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// --- Root Health Check ---
app.get("/", (req, res) => {
  res.send("Backend is live and CORS is enabled!");
});

// --- POST: Submit Survey ---
app.post("/submit-feedback", async (req, res) => {
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
