import React from "react";
import {useNavigate} from 'react-router-dom';

const ayo_world_rank_header = () => {

    const navigate = useNavigate();

    const navi_to_make_queze = () => {
        navigate('/ayoworldrankmakequeze');
    }
    const navi_to_main = () => {
        navigate('/');
    }
    const navi_to_quezeshow = () => {
        navigate('/quezeshow_main');
    }
    const navi_to_make_quezeshow = () => {
        navigate('/make_quezeshow');
    }
    const navi_to_community = () => {
        navigate('/community');
    }
    const navi_to_space = () => {
        navigate('/space');
    }
    return(
        <header className="Main2_header">
            <div className='header_rogo'><p>Ayo</p></div>
            <button className="all_btn" type="button" onClick={navi_to_main}>이상형 월드컵</button>
            {/* <button className="all_btn" type="button" onClick={navi_to_make_queze}>티어표 제작</button> */}
            <button className="all_btn" type="button" onClick={navi_to_quezeshow}>나락퀴즈쇼</button>
            {/* <button className="all_btn" type="button" onClick={navi_to_make_quezeshow}>나락퀴즈쇼 제작</button> */}
            <button className="all_btn " type="button" onClick={navi_to_community}>커뮤니티</button>
            {/* <button className="all_btn " type="button" title="" onClick={navi_to_space}>스페이스</button> */}

        </header>
    )
}
export default ayo_world_rank_header;