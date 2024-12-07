import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './UserProfile.css';
import {useSelector} from "react-redux";

const UserProfile = () => {

    const user_name = useSelector((state) => state.auth.user.name);
    return (
        <div>
            <div className="user-profile-container">
                <div className="user-profile-box">
                    <AccountCircleIcon className="user-profile-icon" />
                    <span>{user_name}</span>
                </div>
                <span className="profile-today-text">오늘도 건강하세요!</span>
            </div>
        </div>
    );
};

export default UserProfile;