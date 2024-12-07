import React from "react";
import UserProfile from "./UserProfile";
import "./MyPage.css";
import SubCategory from "./sub-category/SubCategory";
import UserBodyInfo from "./user-body-info/UserBodyInfo";

//1) 상단 되돌아가기 bar
//2) 사용자 프로필 및 아이디 렌더링
//3) 2와 함께 오늘도 힘내세요! 문구
//4) 나의 찜, 복용 이력, q&a 카테고리 (flex-row) / 해당 카테고리 별 아이콘 가짐 (column)
//5) 건강 정보 연동하기 >> 건강보험공단 바로가기 링크

//5) 사용자 키/나이/몸무게 직접 입력할 수 있는 컴포넌트

const MyPage = () => {
    return (
        <div className="my-page">
            <div>{/* 상단 되돌아가기 바 */}</div>
            <div>
                <UserProfile />
                <SubCategory />
            </div>
            {/* false && (
                <div>
                    { 건강 정보 연동하기 - 건강보험공단 바로가기 컴포넌트 }* 건강 정보
                    연동하기
                </div>
            )*/}
            <div className="user-body-info">
                {/* 사용자 키/나이/몸무게 직접 입력 칸 */}
                <UserBodyInfo />
            </div>
        </div>
    );
};

export default MyPage;
