import React, { useState } from "react";

export default function Contact() {
    const [loading, setLoading] = useState(false);  // State to manage loading
    const [alertMessage, setAlertMessage] = useState("");  // State to manage alert message

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        // Show loading message
        setAlertMessage("Sending email, please wait...");
        setLoading(true);  // Set loading to true while email is being sent

        try {
            const response = await fetch('http://localhost:5000/api/auth/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // Check if the email was sent successfully
            if (response.ok) {
                setAlertMessage("Email sent successfully!");
            } else {
                setAlertMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setAlertMessage('There was an error sending the email.');
        } finally {
            setLoading(false);  // Reset loading to false after email submission is complete
        }
    };

    return (
        <section id="contact" className="section-padding">
            <div className="container">
                <div className="row">
                    <div className="header-section text-center">
                        <h2>Contact Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <hr className="bottom-line" />
                    </div>
                    <form onSubmit={handleSubmit} className="contactForm">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" className="form-control" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <textarea name="message" className="form-control" rows={5} placeholder="Message" required></textarea>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <button type="submit" className="form contact-form-button light-form-button oswald light">
                                SEND EMAIL
                            </button>
                        </div>
                    </form>

                    {/* Loading message / Success/Error alert */}
                    {loading && (
                        <div className="loading-message">
                            <p>{alertMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
