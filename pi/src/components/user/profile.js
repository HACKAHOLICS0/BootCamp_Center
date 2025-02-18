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
    const [isInterestPointModalOpen, setIsInterestPointModalOpen] = useState(false); // Nouveau state pour le modal des points d'intérêt
    const [editableUser, setEditableUser] = useState({
        name: "", lastName: "", birthDate: "", email: "", phone: ""
    });
    const [interestPoints, setInterestPoints] = useState([]); // Etat pour les points d'intérêt

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
    }, [user]);

    useEffect(() => {
        // Récupérer les points d'intérêt
        const fetchInterestPoints = async () => {
            try {
                const response = await fetch(`${backendURL}/api/interest-points`);
                const data = await response.json();
                setInterestPoints(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des points d'intérêt :", error);
            }
        };

        fetchInterestPoints();
    }, []);

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
    
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
    
            setEditableUser({
                name: updatedUser.name || "",
                lastName: updatedUser.lastName || "",
                birthDate: updatedUser.birthDate ? updatedUser.birthDate.split("T")[0] : "",
                email: updatedUser.email || "",
                phone: updatedUser.phone || ""
            });
    
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeInterestPointModal = () => {
        setIsInterestPointModalOpen(false); // Fermer le modal des points d'intérêt
    };

    const openInterestPointModal = () => {
        setIsInterestPointModalOpen(true); // Ouvrir le modal des points d'intérêt
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

                        {/* Afficher les points d'intérêt */}
                        <div className="col-md-6 my-3">
                            <div className="card card-user mb-3">
                                <h4 className="text-center my-3">Points of Interest</h4>
                                <hr />
                                <div className="card-body card-body-user">
                                    {interestPoints.length > 0 ? (
                                        interestPoints.map((point, i) => <p key={i}>{point.value}</p>)
                                    ) : (
                                        <p>No points of interest available.</p>
                                    )}
                                </div>
                                <div className="text-end mt-3 me-3">
                                    <button className="edit-button" onClick={openInterestPointModal}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal pour les points d'intérêt */}
            {isInterestPointModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close" onClick={closeInterestPointModal}>&times;</span>
                        <h4>Choose Points of Interest</h4>
                        <ul>
                            {interestPoints.map((point, index) => (
                                <li key={index}>
                                    <input type="checkbox" value={point.value} />
                                    {point.value}
                                </li>
                            ))}
                        </ul>
                        <div className="text-end mt-3">
                            <button className="btn btn-success">Save Selection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
