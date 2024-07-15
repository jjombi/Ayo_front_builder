import React from "react";
import { logout } from "@functions/profile/Profile";

const Profile_header = () => {
    const change_clicked = (e) => {
        // searchParams.set('path',e.target.id);
        // setSearchParams(searchParams);
    }
    return (
        <header className="Main2_a_queze_header">
            <button type="button" id="info" title="내 정보" onClick={change_clicked} className="all_btn a_queze_header_btn">
                내 정보
            </button>
            <button type="button" id="my_q" title="내 퀴즈" onClick={change_clicked} className="all_btn a_queze_header_btn">
                내 퀴즈
            </button>
            <button type="button" id="my_likes" title="좋아요" onClick={change_clicked} className="all_btn a_queze_header_btn">
                좋아요
            </button>
            <button type="button" id="log_out" title="로그아웃" onClick={logout} className="all_btn a_queze_header_btn">
                로그아웃
            </button>
        </header>
    )
}
export default Profile_header;