import React from 'react';
import './LoginPage.css'
import MedicationIcon from '@mui/icons-material/Medication';
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
        <div className="login-page-container">
            <MedicationIcon className="login-page-icon"/>
            <p>로그인해서 시작하기</p>
            <GoogleLogin onSuccess={onSuccess} onError={() => console.log('Login Failed')}
                         theme="outline"
                         text="signup_with"
                         size="large"
                         shape="pill"
                         type="standard"
                         logo_alignment="left"
                         auto_select="off"
            />
        </div>
    );
};

export default Login;