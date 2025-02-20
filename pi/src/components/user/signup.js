import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/signup.css'; // Add styles

export default function Signup() {
    const history = useNavigate();

    const [errorDisplay, setErrorDisplay] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        password: "",
        confirmp: "",
        image: "",
        role: "", // New field for role
    });

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        phone: "",
        email: "",
        password: "",
        confirmp: "",
        role: "user", // Default role is "user"
        image: null, // To store the uploaded image
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value); // Validate in real-time
    };

    const onBlur = (e) => {
        const { name, value } = e.target;
        if (!value) {
            validate(name, value); // Trigger validation on blur
        }
    };

    const validate = (fieldName, value) => {
        const errors = { ...formErrors }; // Clone formErrors for specific field
        const isContainsUppercase = /^(?=.*[A-Z])/;
        const isContainsLowercase = /^(?=.*[a-z])/;
        const isContainsNumber = /^(?=.*[0-9])/;
        const isValidLength = /^.{8,16}$/;
        const onlyNumbers = /^-?\d*\.?\d*$/;

        switch (fieldName) {
            case "name":
                errors.name = value ? "" : "Name is required";
                break;
            case "lastName":
                errors.lastName = value ? "" : "Last Name is required";
                break;
            case "email":
                errors.email = value ? "" : "Email is required";
                break;
            case "phone":
                errors.phone = onlyNumbers.test(value) ? "" : "Only numbers are allowed";
                break;
            case "password":
                errors.password =
                    isContainsUppercase.test(value) &&
                    isContainsLowercase.test(value) &&
                    isContainsNumber.test(value) &&
                    isValidLength.test(value)
                        ? ""
                        : "Password must be between 8-16 characters and include 1 uppercase, 1 lowercase, and 1 number.";
                break;
            case "confirmp":
                errors.confirmp = value === formData.password ? "" : "Passwords do not match";
                break;
            case "image":
                errors.image = value ? "" : "Image is required";
                break;
            case "role":
                errors.role = value ? "" : "Role is required"; // Validate role selection
                break;
            default:
                break;
        }
        setFormErrors(errors);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateAllFields();
        setFormErrors(errors);

        if (Object.values(errors).every((err) => err === "")) {
            // If form is valid, submit the form data
            await addUser();
        }
    };

    const validateAllFields = () => {
        const errors = {};
        Object.keys(formData).forEach((key) => {
            validate(key, formData[key]);
        });
        return errors;
    };

    const addUser = async () => {
        try {
            // Check if email already exists
            const emailCheckResponse = await fetch(`http://localhost:5000/api/auth/check/${formData.email}`);
            const emailExists = await emailCheckResponse.json();

            if (emailExists.exists) {
                setErrorDisplay("Email already exists");
                return;
            }

            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const signupResponse = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                body: formDataToSend, // Use FormData here for file uploads
            });

            if (!signupResponse.ok) {
                const errorData = await signupResponse.json();
                throw new Error(errorData.message || "Failed to sign up");
            }

            history("/signin"); // Redirect after successful sign-up
        } catch (err) {
            console.error("Error during signup:", err);
            setErrorDisplay(err.message || "An error occurred. Please try again.");
        }
    };

    // Determine if form is valid for button color
    const isFormValid =
        Object.values(formErrors).every((err) => err === "") && Object.values(formData).every((val) => val !== "");

    return (
        <div className="my-5">
            <h1 className="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>
                Sign Up
            </h1>
            <form className="w-50 mx-auto" onSubmit={onSubmit}>
                {/* Form Fields */}
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${formErrors.lastName ? "is-invalid" : ""}`}
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="date"
                        className={`form-control ${formErrors.birthDate ? "is-invalid" : ""}`}
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.birthDate && <div className="invalid-feedback">{formErrors.birthDate}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone"
                        value={formData.phone}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className={`form-control ${formErrors.confirmp ? "is-invalid" : ""}`}
                        id="confirmp"
                        name="confirmp"
                        placeholder="Confirm Password"
                        value={formData.confirmp}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {formErrors.confirmp && <div className="invalid-feedback">{formErrors.confirmp}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="file"
                        className={`form-control ${formErrors.image ? "is-invalid" : ""}`}
                        id="image"
                        name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                    {formErrors.image && <div className="invalid-feedback">{formErrors.image}</div>}
                </div>

                {/* Role Selection */}
                <div className="form-group">
                    <select
                        className={`form-control ${formErrors.role ? "is-invalid" : ""}`}
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={onChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                    {formErrors.role && <div className="invalid-feedback">{formErrors.role}</div>}
                </div>

                {/* Error Display */}
                <div style={{ textAlign: "center", color: "red" }}>{errorDisplay}</div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`ms-auto my-2 btn ${isFormValid ? "btn-success" : "btn-secondary"}`}
                    disabled={!isFormValid}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
