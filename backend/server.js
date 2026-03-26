const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = "ed112898";

app.get("/movies", async (req, res) => {
  const query = req.query.q;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});