// models/Challenge.js
const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
