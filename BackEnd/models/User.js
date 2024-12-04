const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    profile: {
      name: { type: String, trim: true },
      bio: { type: String, trim: true },
      picture: { type: String, trim: true }, // URL de la foto de perfil
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Relación con otros usuarios
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Relación con la colección de publicaciones
      },
    ],
    challenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge", // Relación con la colección de desafíos
      },
    ],
    savedLeetcodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leetcode", // Relación con la colección de Leetcodes guardados
      },
    ],
    completedLeetcodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leetcode", // Relación con la colección de Leetcodes completados
      },
    ],
    address: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postal_code: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    preferences: {
      language: { type: String, default: "en" },
      theme: { type: String, default: "light" }, // Opciones de tema (light/dark)
    },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
