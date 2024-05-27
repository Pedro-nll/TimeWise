import { Button, TextInput, Modal } from '@mantine/core';
import simpleLogo from '../../assets/simpleLogo.png';
import { useEffect, useState } from 'react';
import { APIReq } from '../../APIReq';
import './login.css';

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [loginFailed, setLoginFailed] = useState(false);
    const [registerModalOpened, setRegisterModalOpened] = useState(false);

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
                console.log(document.cookie)
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

    return (
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
    );
};

export default Login;
