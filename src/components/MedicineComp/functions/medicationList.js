import React from "react";
import "./medicationList.css";

const MedicationList = ({ medications }) => {
    return (
        <div>
            {medications.length > 0 ? (
                medications.map((med, index) => (
                    <div key={index} className="medicine-list">
                        <img src={med.item_image} alt={med.name} width="25%" />
                        <p>{med.drug_name}</p>
                        <button
                            onClick={() => alert(med.details)}
                            className="medicine-details-btn">
                            자세히
                        </button>
                    </div>
                ))
            ) : (
                <p className="medicine-list-none">해당 시간에 복용할 약이 없습니다.</p>
            )}
        </div>
    );
};

export default MedicationList;
