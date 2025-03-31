const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // TEMPORARY for testing only
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/survey", (req, res) => {
  console.log("Received:", req.body);
  res.status(200).send("Survey received successfully.");
});

app.get("/", (req, res) => {
  res.send("Test backend live. CORS is wide open.");
});

app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});
