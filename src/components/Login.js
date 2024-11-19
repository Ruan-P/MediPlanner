import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/google', {
                token: credentialResponse.credential,
            });
            if (res.status === 200) {
                login(res.data.user); // 상태 업데이트
                navigate('/'); // 홈 페이지로 리다이렉트
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const onError = () => {
        console.log('Login Failed');
    };

    return (
        <div>
            <h2>Login</h2>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
};

export default Login;