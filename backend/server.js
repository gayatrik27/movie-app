const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 NEW ROUTE (IMPORTANT)
app.get("/search", async (req, res) => {
    const query = req.query.q;

    const response = await fetch(`https://www.omdbapi.com/?apikey=ed112898&s=${query}`);
    const data = await response.json();

    res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));