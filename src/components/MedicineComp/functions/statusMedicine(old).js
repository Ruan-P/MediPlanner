import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMedicine, resetState } from "../../../store/slices/medicineSlice";

const StatusMedicineOld = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, status, error } = useSelector(state => state.medicine.get);
    const userID = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        if (userID) {
            dispatch(resetState());
            dispatch(getMedicine(userID));
        }
    }, [dispatch, userID]);

    if (status === 'loading') {
        return <p>로딩 중...</p>;
    }

    if (status === 'failed') {
        return <p>오류: {error}</p>;
    }
    console.log(items)

    return (
        <div>
            <h2>Searching</h2>
            <ul>
                {items.map((medicine, index) => (
                    <li key={index}>
                        {medicine.drug_name} - {medicine.comp_name} / {medicine.type} // {medicine.class_name}
                        <img src={medicine.item_image} alt={medicine.drug_name} width="40%" />
                    </li>
                ))}
            </ul>
            <br />
            <button onClick={() => navigate('/')}>돌아가기</button>
        </div>
    );
};

export default StatusMedicineOld;