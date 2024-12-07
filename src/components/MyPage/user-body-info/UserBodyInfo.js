import React, { useEffect, useState } from 'react';
import './UserBodyInfo.css';
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, updateProfileData, resetState } from "../../../store/slices/profileSlice";

const UserBodyInfo = () => {
    const dispatch = useDispatch();

    const { items, status, error } = useSelector((state) => state.profile.get);
    const userID = useSelector((state) => state.auth.user?.id);

    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (userID) {
            dispatch(resetState());
            fetchUserData();
        }
    }, [dispatch, userID]);

    const fetchUserData = async () => {
        const resultAction = await dispatch(getProfileData(userID));
        if (getProfileData.fulfilled.match(resultAction)) {
            const { height, age, weight } = resultAction.payload;
            setHeight(height);
            setAge(age);
            setWeight(weight);
        }
    };

    const handleSubmit = () => {
        const query = {height, age, weight, userID}
        dispatch(updateProfileData(query));
    };

    return (
        <div className="user-body-info-section">
            <p>직접 입력</p>
            <div className="user-input-form">
                    <div className="input-group">
                        <label>
                            키
                            <input
                                type="number"
                                name="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="입력"
                            />
                            <span>cm</span>
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            나이
                            <input
                                type="number"
                                name="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="입력"
                            />
                            <span>세</span>
                        </label>
                    </div>

                    <div className="input-group">
                        <label>
                            몸무게
                            <input
                                type="number"
                                name="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="입력"
                            />
                            <span>kg</span>
                        </label>
                    </div>

                    <button onClick={handleSubmit} className="submit-btn">
                        수정
                    </button>
            </div>
        </div>
    );
};

export default UserBodyInfo;