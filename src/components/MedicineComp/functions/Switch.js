import React from "react";
import "./Switch.css"; // 스타일링 파일

const Switch = ({ isChecked, onToggle }) => {
    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onToggle}
            />
            <span className="slider-t round"></span>
        </label>
    );
};

export default Switch;