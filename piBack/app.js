const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Pour la gestion des chemins de fichiers
const authRoutes = require("./routes/authRoutes"); // Tes routes d'authentification
const mongoose = require('mongoose');
const { initializePoints } = require('./controllers/intrestpoint'); // Ton contrôleur pour les points d'intérêt
const interestPointRoutes = require('./routes/intrestRoutes'); // Assurez-vous que le chemin est correct

// Initialiser les variables d'environnement
dotenv.config({ path: './config/.env' });

// Créer l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Pour analyser les requêtes JSON

// Serveur les fichiers statiques (si nécessaire, pour les images ou autres ressources front-end)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    
})
.then(() => {
    console.log("Connexion à MongoDB réussie");

    // Appeler la fonction d'initialisation des points d'intérêt
    initializePoints(); // Insérer les points d'intérêt par défaut dans la base de données
})
.catch((err) => {
    console.error("Erreur lors de la connexion à MongoDB:", err);
});

// Routes d'authentification
app.use("/api/auth", authRoutes); // Ajoute tes routes d'authentification

// Route pour récupérer les points d'intérêt
const interestPointModel = require('./Model/Interestpoint'); // Assure-toi d'importer ton modèle
app.use('/api', interestPointRoutes);
app.get('/api/points', async (req, res) => {
    try {
        const points = await interestPointModel.find();
        res.status(200).json(points); // Retourne les points d'intérêt au client
    } catch (err) {
        console.error("Erreur lors de la récupération des points d'intérêt:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Catch all route pour les routes non définies
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serveur en fonctionnement sur le port ${port}`);
});
