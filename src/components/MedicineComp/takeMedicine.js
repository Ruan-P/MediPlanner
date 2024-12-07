import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./takeMedicine.css";
import MedicationList from "./functions/medicationList";
import AlarmManager from "./functions/alramManager";
import { useDispatch, useSelector } from "react-redux";
import { getMedicine, resetState } from "../../store/slices/medicineSlice";
import AddIcon from '@mui/icons-material/Add';

const TakeMedicine = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.medicine.get);
    const userID = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        if (userID) {
            dispatch(resetState());
            dispatch(getMedicine(userID));
        }
    }, [dispatch, userID]);

    const today = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const formattedDate = `${today.getMonth() + 1}. ${today.getDate()} (${week[today.getDay()]}) `;

    const [medications, setMedications] = useState([]);

    useEffect(() => {
        if (Array.isArray(items)) {
            setMedications(items);
        }
    }, [items]);

    const [selectedTime, setSelectedTime] = useState("아침");

    // const handelAddMedication = () => {
    //     navigate('/medicines/add');
    // };

    const filteredMedications = medications.filter((medication) => {
        if (selectedTime === "아침" && medication.al_b === 1) return true;
        if (selectedTime === "점심" && medication.al_l === 1) return true;
        if (selectedTime === "저녁" && medication.al_d === 1) return true;
        return false;
    });

    if (status === 'loading') {
        return <p>로딩 중...</p>;
    } else if (status === 'failed') {
        return <p>오류: {error}</p>;
    } else {
        return (
            <div className="take-medicine-page">
                <div className="today-take-medicine-list">
                    <h2 className="today-date">
                        {formattedDate} 오늘{" "}
                        <KeyboardArrowDownIcon className="today-date-underArrow"/>
                    </h2>
                    {["아침", "점심", "저녁"].map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`selectedTime-btn 
                                ${selectedTime === time ? "active" : ""}`}>
                            {time}
                        </button>
                    ))}
                </div>
                <div>
                    <MedicationList medications={filteredMedications}/>
                </div>
                <div className="add-medication-form">
                    <button className="add-medication-btn"> {/*TO-DO # onClick 기능부여*/}
                        <AddIcon/>
                    </button>
                </div>
                <div>
                    <AlarmManager/>
                </div>
            </div>
        );
    }
};

export default TakeMedicine;