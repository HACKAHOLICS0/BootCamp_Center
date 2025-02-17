import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [codeForEmail, setcodeForEmail] = useState({
        sent: false,
        value: "",
        enteredValue: "",
        error: "",
        changePassDisplay: false,
    });
    const [formEmail, setFormEmail] = useState({
        email: "",
        error: ""
    });

    return (
        <div>
            {/* Formulaire pour l'email */}
            {!codeForEmail.sent &&
                <form className="w-50 mx-auto mt-5">
                    <h3 className="text-center mb-4">Reset Password</h3>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder="Enter Email" 
                        />
                    </div>
                    <div style={{ textAlign: "center", color: "red" }}>{formEmail.error}</div>
                    <button type="submit" className="ms-auto my-2 btn btn-template-user">Submit</button>
                </form>
            }

            {/* Formulaire pour entrer le code de vérification */}
            {codeForEmail.sent &&
                <form className="w-50 mx-auto my-5">
                    <h3 className="text-center mb-4">Reset Password</h3>
                    <h4>A verification code was sent to your email address</h4>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter your verification code" 
                        />
                    </div>
                    <h5 style={{ color: "red" }}></h5>
                    <h5 style={{ textAlign: "center", color: "red" }}>{codeForEmail.error}</h5>
                    <button type="submit" className="btn btn-template-user my-2" style={{ float: "right" }}>Submit</button>
                </form>
            }

            {/* Formulaire pour changer le mot de passe */}
            {codeForEmail.changePassDisplay &&
                <form className="w-50 mx-auto my-5">
                    <h3 className="text-center mb-4">Reset Password</h3>
                    <div className="form-group my-2">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter Password" 
                        />
                    </div>
                    <div style={{ color: "red" }}></div>
                    <div className="form-group my-2">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Confirm your Password" 
                        />
                    </div>
                    <div style={{ color: "red" }}></div>
                    <button type="submit" className="btn btn-template-user my-2" style={{ float: "right" }}>Submit</button>
                </form>
            }
        </div>
    );
}
