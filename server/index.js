const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//  CORS fix
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://feedback.r43digitaltech.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//  Needed for Express to parse JSON
app.use(express.json());

//  Preflight request handler
app.options("*", (req, res) => {
  res.sendStatus(200);
});

//  Logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

//  Routes
app.post("/survey", async (req, res) => {
  const { answers } = req.body;
  console.log(" Received:", answers);
  try {
    await pool.query(
      "INSERT INTO survey_responses (answers) VALUES ($1)",
      [JSON.stringify(answers)]
    );
    console.log(" Saved");
    res.status(200).send("Survey submitted successfully");
  } catch (err) {
    console.error(" DB Error:", err);
    res.status(500).send("Error saving survey");
  }
});

app.get("/responses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM survey_responses ORDER BY submitted_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving responses");
  }
});

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
