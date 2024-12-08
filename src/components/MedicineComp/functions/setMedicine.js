import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMedicine, resetState} from '../../../store/slices/medicineSlice';
import {useNavigate} from 'react-router-dom';
import MedicineSearchList from "./medicineSearchList";
import './setMedicine.css'

const SearchMedicine = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('')

    const { items, status, error } = useSelector(state => state.medicine.search);
    const [medicineSearchedList, setMedicineSearchedList] = useState([])

    const { g_items, g_status, g_error} = useSelector(state => state.medicine.save);

    useEffect(() => {
        dispatch(resetState())
    }, []);

    const handleSearch = () => {
        dispatch(resetState())
        const query =  {query1, query2}
        dispatch(searchMedicine(query));
        // console.log(items)
    };

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="add-medication-form">
            <h2>복용약 추가</h2>
            <div className="add-medicine-form">
                <div className="add-medication-input">
                    <input
                        type="text"
                        value={query1}
                        onChange={(e) => setQuery1(e.target.value)}
                        placeholder="약 이름을 입력하세요"
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <div className="add-medication-input">
                    <input
                        type="text"
                        value={query2}
                        onChange={(e) => setQuery2(e.target.value)}
                        placeholder="제조사 이름을 입력하세요. 모른다면 공백"
                    />
                    <button onClick={handleRefresh}>초기화</button>
                </div>
            </div>
            {status === 'loading' && <p>로딩 중...</p>}
            {status === 'failed' && <p>오류: {error}</p>}
            <br/>

            {items ? <MedicineSearchList props={items}/> : 'Nothing to display'}

            <button onClick={() => {
                navigate('/med/mypage')
            }}>돌아가기
            </button>

        </div>
    );
};

export default SearchMedicine;