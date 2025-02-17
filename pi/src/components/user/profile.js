import "../../assets/css/user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

const backendURL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
    return imagePath ? `${backendURL}/${imagePath.replace(/\\/g, "/")}` : "/uploads/avatar7.png";
};

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableUser, setEditableUser] = useState({
        name: "", lastName: "", birthDate: "", email: "", phone: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Mise à jour des données éditables chaque fois que `user` change
    useEffect(() => {
        if (user) {
            setEditableUser({
                name: user.name || "",
                lastName: user.lastName || "",
                birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
                email: user.email || "",
                phone: user.phone || ""
            });
        }
    }, [user]); // Cette useEffect ne s'exécutera que si `user` change

    const handleEditUser = () => {
        setIsModalOpen(true);
    };

    const handleSaveUser = async () => {
        if (!user || !user._id) {  // Utilise _id au lieu de id
            console.log("No user or user ID found.");
            return;
        }
    
        console.log("Editable User before save:", editableUser);
    
        try {
            console.log("Sending request to update user...");
            const response = await fetch(`${backendURL}/api/auth/${user._id}`, {  // Utilise _id ici
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editableUser),
            });
    
            console.log("Response status:", response.status);
    
            if (!response.ok) {
                console.log("Error: Response not OK.");
                throw new Error("Failed to update user data");
            }
    
            const updatedUser = await response.json();
            console.log("Updated user received from backend:", updatedUser);
    
            // Vérifie les données avant de les mettre à jour dans l'état
            console.log("Current user data before state update:", user);
            console.log("Editable User before state update:", editableUser);
    
            // Mettre à jour `user` immédiatement après la sauvegarde
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
    
            // Mettre à jour `editableUser` aussi
            setEditableUser({
                name: updatedUser.name || "",
                lastName: updatedUser.lastName || "",
                birthDate: updatedUser.birthDate ? updatedUser.birthDate.split("T")[0] : "",
                email: updatedUser.email || "",
                phone: updatedUser.phone || ""
            });
    
            // Fermer le modal après la sauvegarde
            console.log("Closing modal...");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };
    if (!user) {
        return (
            <div className="text-center mt-5">
                <FontAwesomeIcon icon={faSpinner} className="fa-5x fa-pulse" />
                <h4>Loading user data...</h4>
            </div>
        );
    }

    return (
        <div id="main" data-aos="fade-in">
            <div className="container mt-5">
                <div className="main-body">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card card-user">
                                <div className="card-body-user text-center">
                                    <img src={getImageUrl(user.image)} className="rounded-circle" width="300" alt="User Avatar" />
                                    <div className="mt-3"><h4>{user.name || "User"}</h4></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <h4 className="text-center my-3">Personal Information</h4>
                            <div className="card-user mb-3">
                                <div className="card-body card-body-user">
                                    {["name", "lastName", "birthDate", "email", "phone"].map((key, index) => (
                                        <React.Fragment key={index}>
                                            <div className="row">
                                                <div className="col-sm-3"><h6 className="mb-0">{key.replace(/([A-Z])/g, ' $1')}</h6></div>
                                                <div className="col-sm-9 text-secondary">{user[key] || "N/A"}</div>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))}
                                    <div className="text-end mt-3">
                                        <button className="edit-button" onClick={handleEditUser}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <span className="close" onClick={closeModal}>&times;</span>
                                    <h4>Edit User Information</h4>
                                    <form>
                                        {Object.keys(editableUser).map((key, index) => (
                                            <div className="mb-3" key={index}>
                                                <label className="form-label">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                <input
                                                    type={key === "birthDate" ? "date" : "text"}
                                                    className="form-control"
                                                    value={editableUser[key]}
                                                    onChange={(e) => setEditableUser({ ...editableUser, [key]: e.target.value })}
                                                />
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-success" onClick={handleSaveUser}>Save Changes</button>
                                    </form>
                                </div>
                            </div>
                        )}
                        {[{ title: "Points of Interest", data: user.refinterestpoints },
                          { title: "Course Preferences", data: user.coursepreferences }].map((section, index) => (
                            <div className="col-md-6 my-3" key={index}>
                                <div className="card card-user mb-3">
                                    <h4 className="text-center my-3">{section.title}</h4>
                                    <hr />
                                    <div className="card-body card-body-user">
                                        {Array.isArray(section.data) && section.data.length > 0 ? (
                                            section.data.map((item, i) => <p key={i}>{item}</p>)
                                        ) : (
                                            <p>No {section.title.toLowerCase()} available.</p>
                                        )}
                                    </div>
                                    <div className="text-end mt-3 me-3">
                                        <button className="edit-button">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
