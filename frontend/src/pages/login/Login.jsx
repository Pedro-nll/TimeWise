import { Button, TextInput, Modal } from '@mantine/core';
import simpleLogo from '../../assets/simpleLogo.png';
import { useEffect, useState } from 'react';
import { APIReq } from '../../APIReq';
import './login.css';
import UserModal from '../../components/modals/userModal/UserModal';

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [loginFailed, setLoginFailed] = useState(false);
    const [registerModalOpened, setRegisterModalOpened] = useState(false);
    const [modalClass, setModalClass] = useState('');


    useEffect(() => {
        document.body.classList.add('body-login');
        document.body.classList.remove('body-home');
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        const REST = new APIReq();
        try {
            const body = JSON.stringify(userData);
            const response = await REST.postRequest('/user/login', body);
            if (response.status === 200) {
                const token = await response.data.accessToken
                document.cookie = `Authorization=${token}; path=/`;
                window.location.href = '/home';
            } else {
                setLoginFailed(true);
            }
        } catch (e) {
            console.error(e);
            setLoginFailed(true);
        }
    };

    const handleRegister = () => {
        setRegisterModalOpened(true);
    };

    const registerUser = async (userData) => {
        const REST = new APIReq();
        try {
            const body = JSON.stringify(userData);
            const response = await REST.postRequest('/user/register', body);
            if (response.status === 200) {
                const token = await response.data.accessToken
                document.cookie = `Authorization=${token}; path=/`;
                window.location.href = '/home';
            } else {
                setLoginFailed(true);
            }
        } catch (e) {
            console.error(e);
            setLoginFailed(true);
        }
    };

    const closeModal = () => {
        setModalClass('modal-exit');
        setTimeout(() => {
            setRegisterModalOpened(false)
            setModalClass('');
        }, 300);
    };


    return (
        <>
            <div className="login-container">
                <img src={simpleLogo} alt="Logo" className="logo-login" />
                {loginFailed && <div className="error-message">Login failed. Please try again.</div>}
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
                <Button onClick={handleRegister} className="register-button-login">Register</Button>
                <Button onClick={handleSubmit} className="submit-button-login">Login</Button>
            </div>

            <UserModal
                isOpen={registerModalOpened}
                onClose={closeModal}
                onSubmit={registerUser}
                className={modalClass}
            />
        </>
    );
};

export default Login;
