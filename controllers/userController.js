const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// Créer un nouvel utilisateur
exports.createUser = (req, res) => {
  const { name, password, role, email } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Opération échouée" });
    } else {
      const newUser = { name, password: hashedPassword, role, email };
      db.query("INSERT INTO users SET ?", newUser, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Opération échouée" });
        } else {
          res.status(201).json({
            message: "Utilisateur créé avec succès",
          });
        }
      });
    }
  });
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la récupération des utilisateurs" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Récupérer un utilisateur spécifique
exports.getUser = (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", userId, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la récupération de l'utilisateur" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Utilisateur introuvable" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, password, role, email } = req.body;
  const updatedUser = { name, password, role, email };

  db.query(
    "UPDATE users SET ? WHERE id = ?",
    [updatedUser, userId],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Échec de la mise à jour de l'utilisateur" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Utilisateur introuvable" });
      } else {
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
      }
    }
  );
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", userId, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la suppression de l'utilisateur" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Utilisateur introuvable" });
    } else {
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    }
  });
};
