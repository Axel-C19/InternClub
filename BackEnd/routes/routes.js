const express = require("express");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const Leetcode = require("../models/Leetcode");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Ruta para registrar usuarios
router.post("/signup", async (req, res) => {
  const { username, email, password_hash, phone_number, age } = req.body;
  try {
    // Creación de un nuevo usuario
    const user = new User({
      username,
      email,
      password_hash,
      phone_number,
      age,
    });

    // Guardar en la base de datos
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user: " + error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Comparar la contraseña en texto plano
    if (password !== user.password_hash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Enviar el token y la información del usuario
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ejemplo de una ruta protegida
router.get("/protected", auth, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.user });
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all challenges
router.get("/challenges", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new challenge
router.post("/challenges", async (req, res) => {
  const challenge = new Challenge({
    title: req.body.title,
    description: req.body.description,
    difficulty: req.body.difficulty,
    picture: req.body.picture,
  });

  try {
    const newChallenge = await challenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para agregar un desafío al usuario autenticado
router.post("/users/challenges", auth, async (req, res) => {
  try {
    const { challengeId } = req.body;

    if (!challengeId) {
      return res.status(400).json({ error: "Challenge ID is required" });
    }

    const userId = req.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { challenges: challengeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Challenge added to user's challenges successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding challenge to user's challenges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear un nuevo leetcode
router.post("/leetcodes", auth, async (req, res) => {
  const leetcode = new Leetcode({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    difficulty: req.body.difficulty,
    topics: req.body.topics,
  });

  try {
    const newLeetcode = await leetcode.save();
    res.status(201).json(newLeetcode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los leetcodes
router.get("/leetcodes", async (req, res) => {
  try {
    const leetcodes = await Leetcode.find().sort({ createdAt: -1 });
    res.json(leetcodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para agregar un leetcode a los guardados del usuario autenticado
router.post("/users/leetcodes/saved", auth, async (req, res) => {
  try {
    const { leetcodeId } = req.body;

    if (!leetcodeId) {
      return res.status(400).json({ error: "Leetcode ID is required" });
    }

    const userId = req.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedLeetcodes: leetcodeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Leetcode added to user's saved leetcodes successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding leetcode to user's saved leetcodes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para obtener los leetcodes guardados por el usuario autenticado
router.get("/users/leetcodes/saved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("savedLeetcodes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedLeetcodes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ruta para obtener los challenges en los que participa el usuario autenticado
router.get("/users/challenges", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("challenges");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.challenges);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ruta para marcar un leetcode como completado por el usuario autenticado
router.post("/users/leetcodes/completed", auth, async (req, res) => {
  try {
    const { leetcodeId } = req.body;

    if (!leetcodeId) {
      return res.status(400).json({ error: "Leetcode ID is required" });
    }

    const userId = req.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { completedLeetcodes: leetcodeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Leetcode marked as completed successfully",
      user,
    });
  } catch (error) {
    console.error("Error marking leetcode as completed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener el perfil del usuario autenticado
router.get("/profile", auth, async (req, res) => {
  try {
    const userId = req.user;

    // Buscar al usuario por su ID
    const user = await User.findById(userId).select(
      "username email age phone_number profile"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/leetcodes/:id/completedBy", auth, async (req, res) => {
  try {
    const leetcodeId = req.params.id;
    const userId = req.user;

    // Buscar y actualizar el leetcode para agregar al usuario que lo completó
    const leetcode = await Leetcode.findByIdAndUpdate(
      leetcodeId,
      { $addToSet: { completedBy: userId } }, // Utilizar $addToSet para evitar duplicados
      { new: true }
    );

    if (!leetcode) {
      return res.status(404).json({ error: "Leetcode not found" });
    }

    res.status(200).json({
      message: "Leetcode marked as completed successfully in Leetcode schema",
      leetcode,
    });
  } catch (error) {
    console.error("Error marking leetcode as completed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Actualizar el perfil del usuario autenticado
router.put("/profile", auth, async (req, res) => {
  try {
    const userId = req.user;
    const { name, bio, picture, phone_number, age } = req.body;

    // Actualizar la información del perfil
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.name": name,
          "profile.bio": bio,
          "profile.picture": picture,
          phone_number,
          age,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
