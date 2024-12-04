const mongoose = require("mongoose");

const leetcodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  topics: [
    {
      type: String,
      enum: [
        "arrays",
        "strings",
        "graphs",
        "dfs",
        "bfs",
        "graphql",
        "recursive",
        "dynamic programming",
      ],
      required: true,
    },
  ],
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con los usuarios que han completado el leetcode
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Leetcode = mongoose.model("Leetcode", leetcodeSchema);
module.exports = Leetcode;
