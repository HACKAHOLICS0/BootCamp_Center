const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

// Set up the transporter using your verified Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendContactEmail = (emailData) => {
    const { name, email, subject, message } = emailData;
    const mailOptions = {
        from: email,  // The email the user provides (e.g., takihmid28@gmail.com)
        to: 'hmidahmed049@gmail.com',    // The email you want to receive the message (your email)
        subject: subject,  // The subject the user provides
        text: `
            Dear Support Team,
    
            You have received a new contact form submission.
    
            -------------------------------
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            -------------------------------
    
            Message:
            ${message}
    
            -------------------------------
            
            Best regards,
            Your HACKAHOLICS Team
        `,
    };
    

    return transporter.sendMail(mailOptions);  // Send the email
};


module.exports = {sendEmail,sendContactEmail};
