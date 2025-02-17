const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Pour la gestion des chemins de fichiers
const authRoutes = require("./routes/authRoutes");

// Initialize environment variables
dotenv.config({ path: "./config/.env" });

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Serve static files (if needed, for images or front-end assets)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
require("./config/dbConfig"); // Assuming dbConfig handles DB connection

// Authentication Routes
app.use("/api/auth", authRoutes); // Add your auth routes

// Catch all route for handling undefined routes
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Server Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
