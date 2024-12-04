const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para proteger rutas
const auth = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Si el token tiene el prefijo 'Bearer', extraer el token después de la palabra 'Bearer'
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim(); // Elimina "Bearer " para obtener solo el token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar el JWT_SECRET de .env
    req.user = decoded.userId; // Asumimos que el token tiene userId
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
