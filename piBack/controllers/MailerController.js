const sendEmail = require('../Services/emailService');


const handleContactForm = (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    sendEmail(email, subject, message)
        .then(() => {
            res.status(200).json({ message: 'Email sent successfully' });
        })
        .catch((err) => {
            console.error("Email sending error:", err);
            res.status(500).json({ message: 'Error sending email', error: err.message });
        });
};

module.exports = { handleContactForm };
