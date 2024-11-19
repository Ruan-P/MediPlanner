import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccess = (credentialResponse) => {
        dispatch(loginUser(credentialResponse.credential))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <GoogleLogin onSuccess={onSuccess} onError={() => console.log('Login Failed')} />
        </div>
    );
};

export default Login;