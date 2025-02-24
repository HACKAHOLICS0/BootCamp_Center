// utils/passport.js
const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Model/User'); 
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Recherche un utilisateur avec le googleId fourni
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Si l'utilisateur n'existe pas, créez-le
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails && profile.emails[0].value,
            // Vous pouvez ajouter d'autres champs selon vos besoins
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// (Optionnel) Pour la gestion des sessions, si vous les utilisez
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});