const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Créer un nouvel utilisateur
router.post("/", UserController.createUser);

// Récupérer tous les utilisateurs
router.get("/", UserController.getAllUsers);

// Récupérer un utilisateur spécifique
router.get("/:id", UserController.getUser);

// Mettre à jour un utilisateur
router.put("/:id", UserController.updateUser);

// Supprimer un utilisateur
router.delete("/:id", UserController.deleteUser);

module.exports = router;
