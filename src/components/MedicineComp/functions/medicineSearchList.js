import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Switch from "react-switch";
import {saveMedicine} from "../../../store/slices/medicineSlice";

const MedicineSearchList = ({ props }) => {
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.auth.user.id);

    const [switchStates, setSwitchStates] = useState([]);

    useEffect(() => {
        if (props.length > 0) {
            const initialStates = props.map(() => ({
                al_b: false,
                al_l: false,
                al_d: false,
            }));
            setSwitchStates(initialStates);
        }
    }, [props]);

    const handleSwitchChange = (index, key) => {
        setSwitchStates((prevState) =>
            prevState.map((state, i) =>
                i === index ? { ...state, [key]: !state[key] } : state
            )
        );
    };

    const handleSave = async (index) => {
        const med = props[index];
        const switchState = switchStates[index];

        const dataToSend = {
            userID,
            item_sn: med.ITEM_SEQ,
            drug_name: med.ITEM_NAME,
            comp_name: med.ENTP_NAME,
            type: med.ETC_OTC_NAME,
            item_image: med.ITEM_IMAGE,
            class_name: med.CLASS_NAME,
            al_b: switchState.al_b,
            al_l: switchState.al_l,
            al_d: switchState.al_d,
        };
        dispatch(saveMedicine(dataToSend))
    };

    return (
        <div>
            {props.length > 0 ? (
                props.map((med, index) => (
                    <div className="medicine-list" key={index}>
                        <div>
                            <img src={med.ITEM_IMAGE} alt={med.ITEM_NAME} width="30%" />
                            <p>
                                {med.ITEM_NAME} <br/> {med.ENTP_NAME}
                            </p>
                            <Switch
                                onChange={() => handleSwitchChange(index, "al_b")}
                                checked={switchStates[index]?.al_b || false}
                                onColor="#408dff"
                                offColor="#b0cdff"
                                uncheckedIcon={false}
                            />
                            &nbsp;
                            <Switch
                                onChange={() => handleSwitchChange(index, "al_l")}
                                checked={switchStates[index]?.al_l || false}
                                onColor="#FFA500"
                                offColor="#FFE4B5"
                                uncheckedIcon={false}
                            />
                            &nbsp;
                            <Switch
                                onChange={() => handleSwitchChange(index, "al_d")}
                                checked={switchStates[index]?.al_d || false}
                                onColor="#191970"
                                offColor="#8d8dc9"
                                uncheckedIcon={false}
                            />
                            <div>
                                <button onClick={() => handleSave(index)}>추가하기</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                ""
            )}
        </div>
    );
};

export default MedicineSearchList;