import { ToastContainer } from "react-toastify";
import ModalHeader from "../ModalHeader";
import { useState } from "react";
import { Button, TextInput, Textarea } from "@mantine/core";

const UserModal = ({ isOpen, onClose, onSubmit  }) => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userData.username || !userData.password) {
            toast.warn('All fields are required!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast-warning'
            });
            return;
        }
        onSubmit(userData);
    };

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="modal-overlay">
                <div className="modal">
                    <ModalHeader onClose={onClose}></ModalHeader>
                    <TextInput
                        label="Username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button onClick={handleSubmit} className="submit-button">Register</Button>
                </div>
            </div>
        </>
    );
}

export default UserModal