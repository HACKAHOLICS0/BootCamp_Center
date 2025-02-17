const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User'); // Assurez-vous que le chemin est correct

// Route pour vérifier si l'email existe déjà
const checkEmailExists = async (req, res) => {
    const { email } = req.params;

    try {
        // Vérifie si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error during email check:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const signup = async (req, res) => {
    const { name, lastname, birthDate, phone, email, password } = req.body;
    const imagePath = req.file ? req.file.path : null; // Récupère le chemin de l'image téléchargée

    // Validation des champs nécessaires
    if (!name || !lastname || !birthDate || !phone || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hacher le mot de passe avant de le sauvegarder
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            lastname,
            birthDate,
            phone,
            email,
            password: hashedPassword, // Mot de passe haché
            image: imagePath, // Ajouter l'image
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const signin = async (req, res) => {
    const { email, password } = req.body;

    // Validation des champs nécessaires
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect password' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retourner la réponse avec le token
        res.status(200).json({
            msg: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName, // Nom de famille
                birthDate: user.birthDate, // Date de naissance
                phone: user.phone, // Numéro de téléphone
                email: user.email, // Email
                image: user.image, // Image de profil
                state: user.state, // État de l'utilisateur (par exemple actif, inactif, etc.)
                coursepreferences: user.coursepreferences, // Préférences de cours
                refinterestpoints: user.refinterestpoints, // Points d'intérêt
                refmodules: user.refmodules, // Modules de référence
                reffriends: user.reffriends, // Amis de référence
                typeUser: user.typeUser
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const editUser = async (req, res) => {
    try {
        const { name, lastName, birthDate, phone, email, password } = req.body;
        const userId = req.params.id;
        const imagePath = req.file ? req.file.path : null;

        // Vérifier si l'utilisateur existe
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Si un mot de passe est fourni, le hacher
        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Mettre à jour les informations de l'utilisateur
        user.name = name || user.name;
        user.birthDate = birthDate || user.birthDate;
        user.phone = phone || user.phone;
        user.lastName = lastName || user.lastName; // Fix: lastName not lastname
        user.email = email || user.email;
        user.password = hashedPassword;
        user.image = imagePath || user.image;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si l'ID est valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { signup, signin, checkEmailExists ,editUser ,getUserById};
