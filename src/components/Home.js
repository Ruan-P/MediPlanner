import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';

const Home = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const handleSetMedicine = () => {
        navigate('/med/add')
    }

    const handleRemoveMedicine = () => {
        navigate('/med/remove')
    }

    const handleGetMedicine = () => {
        navigate('/med/mypage')
    }

    const handleClickMyProfile = () => {
        navigate('/myPage')
    }

    return (<>
        <div>
            {user && (
                <div>
                    <p>{user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <br/>
                    <button onClick={handleClickMyProfile}>마이페이지</button>
                    <br/>
                    <button onClick={handleSetMedicine}>의약품 검색 및 등록하기</button>
                    <br/>
                    <button onClick={handleRemoveMedicine}>저장된 의약품 삭제하기</button>
                    <br/>
                    <button onClick={handleGetMedicine}>등록된 의약품 조회하기</button>
                </div>
            )}
        </div>
        </>
    );
};

export default Home;