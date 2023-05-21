const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json());

// Importer les routes
const userRoutes = require("./routes/userRoutes");

// Utiliser les routes
app.use("/user", userRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Serveur en cours d'exécution sur le port 3000");
});
