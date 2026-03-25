const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  poster: String
});

module.exports = mongoose.model("Movie", movieSchema);