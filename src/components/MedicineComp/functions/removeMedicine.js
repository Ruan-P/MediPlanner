import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {removeMedicine, resetState} from "../../../store/slices/medicineSlice";
import {useNavigate} from 'react-router-dom';


const RemoveMedicine = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [item_name, setItem_name] = useState('')
    const [comp_name, setComp_name] = useState('')
    const { items, status, error } = useSelector(state => state.medicine.remove);
    const userID = useSelector((state) => state.auth.user.id);


    useEffect(() => {
        dispatch(resetState())
    }, []);

    const handleClick = () => {
        const query = {userID, item_name, comp_name}
        dispatch(removeMedicine(query))
    }

    return (
        <div>
            <h2>저장된 의약품 삭제하기</h2>
            <input
                type="text"
                value={item_name}
                onChange={(e) => setItem_name(e.target.value)}
                placeholder="삭제할 약품명 입력"
            />
            <input
                type="text"
                value={comp_name}
                onChange={(e) => setComp_name(e.target.value)}
                placeholder="약품의 제조사 입력. (공백가능)"
            />
            <button onClick={handleClick}>요청</button>
            {status === 'loading' && <p>로딩 중...</p>}
            {status === 'failed' && <p>오류: {error}</p>}
            {status === 'success'&& <ul>
                <li>
                    {items.success}
                </li>
            </ul>}

            <button onClick={() => {navigate('/')}}>돌아가기</button>
        </div>
    );
};

export default RemoveMedicine;