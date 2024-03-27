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
    const navi_to_guide = () => {
        navigate('/guide_main');
        
    }
    const navi_to_machugi = () => {
        navigate('/machugi');
    } 
    const navi_to_Continue_speaking = () => {
        navigate('/continue_speaking');
    }
    const navi_to_New_word_queze = () => {
        navigate('/New_word_queze');
    }
    return(
        <header className="Main2_header">
            <div className='header_rogo'><p>Ayo</p></div>
            <button className="all_btn" type="button" onClick={navi_to_main}>이상형 월드컵</button>
            {/* <button className="all_btn" type="button" onClick={navi_to_make_queze}>티어표 제작</button> */}
            <button className="all_btn" type="button" onClick={navi_to_quezeshow}>퀴즈쇼</button>
            <button className="all_btn " type="button" onClick={navi_to_machugi}>문제 맞추기</button>
            <button className="all_btn " type="button" onClick={navi_to_Continue_speaking}>이어말하기</button>
            <button className="all_btn " type="button" onClick={navi_to_New_word_queze}>신조어 맞추기</button>
            {/* <button className="all_btn" type="button" onClick={navi_to_make_quezeshow}>퀴즈쇼 제작</button> */}
            <button className="all_btn " type="button" onClick={navi_to_community}>제안하기</button>
            <button className="all_btn " type="button" onClick={navi_to_guide}>공지사항</button>
            {/* <button className="all_btn " type="button" title="" onClick={navi_to_space}>스페이스</button> */}

        </header>
    )
}
export default ayo_world_rank_header;