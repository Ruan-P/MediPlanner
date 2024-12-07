import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMedicine, resetState} from '../../../store/slices/medicineSlice';
import {useNavigate} from 'react-router-dom';

const SetMedicine = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('')

    const { items, status, error } = useSelector(state => state.medicine.search);
    const userID = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        dispatch(resetState())
    }, []);

    const handleSearch = () => {

        const query =  {query1, query2, userID}
        dispatch(searchMedicine(query));
    };

    return (
        <div>
            <h2>의약품 검색 및 저장</h2>
            <input
                type="text"
                value={query1}
                onChange={(e) => setQuery1(e.target.value)}
                placeholder="의약품 이름을 입력하세요"
            />
            <input
                type="text"
                value={query2}
                onChange={(e) => setQuery2(e.target.value)}
                placeholder="제조사 이름을 입력하세요. 모른다면 공백"
            />
            <button onClick={handleSearch}>검색</button>
            {status === 'loading' && <p>로딩 중...</p>}
            {status === 'failed' && <p>오류: {error}</p>}
            {items && <ul>
                <li>
                    {items.success}
                </li>
            </ul>}

            <button onClick={() => {
                navigate('/med/mypage')
            }}>돌아가기
            </button>
        </div>
    );
};

export default SetMedicine;