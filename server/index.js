const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://jredding43.github.io"
}));
app.use(express.json());

app.post('/survey', async (req, res) => {
  const { answers } = req.body;
  console.log(" Received form submission:", answers); 

  try {
    await pool.query(
      'INSERT INTO survey_responses (answers) VALUES ($1)',
      [JSON.stringify(answers)]
    );
    console.log(" Inserted survey into database"); 
    res.status(200).send("Survey submitted successfully");
  } catch (err) {
    console.error(" DB INSERT ERROR:", err); 
    res.status(500).send("Error saving survey");
  }
});


app.get('/responses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM survey_responses ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving responses");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
