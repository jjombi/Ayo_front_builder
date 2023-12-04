import React from "react";
import {useNavigate} from 'react-router-dom';

const ayo_world_rank_header = () => {

    const navigate = useNavigate();

    const navi_to_make_queze = () => {
        navigate('/ayoworldrankmakequeze');
    }
    const navi_to_main = () => {
        navigate('/ayoworldrank');
    }
    return(
        <header className="Main2_header">
            <div className='header_rogo'><p>Ayo</p></div>
            <button className="all_btn" onClick={navi_to_main}>전체 문제 보기</button>
            <button className="all_btn" onClick={navi_to_make_queze}>문제 만들기</button>
        </header>
    )
}
export default ayo_world_rank_header;