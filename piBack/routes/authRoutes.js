const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../config/multerConfig'); // Assurez-vous que le chemin est correct

// Vérification de l'email
router.get('/check/:email', authController.checkEmailExists);

// Inscription avec upload d'image
router.post('/signup', upload.single('image'), authController.signup);
// Récupérer un utilisateur par son ID
router.get("/:id", authController.getUserById);

// Connexion
router.post('/signin', authController.signin);
router.put("/:id", upload.single('image'), authController.editUser);
module.exports = router;
