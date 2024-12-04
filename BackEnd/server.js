const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Conexión a MongoDB desde db.js
const Routes = require("./routes/routes"); // Importamos las rutas de autenticación
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
connectDB();

// Rutas
app.use("/api", Routes); // Agregamos las rutas de autenticación

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
