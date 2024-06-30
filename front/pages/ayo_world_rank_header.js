import React from "react";
import { getAccessToken, isLogin, router } from "../functions/WorldRank";
import new_logo from '../public/Img_folder/NEWLOGO.png';
const ayo_world_rank_header = () => {


    const navi_to_make_queze = () => {
        router('/ayoworldrankmakequeze');
    }
    const navi_to_main = () => {
        router('/worldcup');
    }
    const navi_to_quezeshow = () => {
        router('/');
    }
    const navi_to_make_quezeshow = () => {
        router('/make_quezeshow');
    }
    const navi_to_community = () => {
        router('/community');
    }
    const navi_to_space = () => {
        router('/space');
    }
    const navi_to_guide = () => {
        router('/guide_main');
        
    }
    const navi_to_machugi = () => {
        router('/machugi');
    } 
    const navi_to_Continue_speaking = () => {
        router('/continue_speaking');
    }
    const navi_to_New_word_queze = () => {
        router('/new_word_queze');
    }
    return(
        <header className="Main2_header">
            <div className='header_rogo'>
                <img src={new_logo}></img>
            </div>
            {/* <button className="all_btn" type="button" onClick={navi_to_main}>이상형 월드컵</button> */}
            {/* <button className="all_btn" type="button" onClick={navi_to_make_queze}>티어표 제작</button> */}
            <button className="all_btn" type="button" onClick={navi_to_quezeshow}>퀴즈쇼</button>
            {/* <button className="all_btn " type="button" onClick={navi_to_machugi}>문제 맞추기</button>
            <button className="all_btn " type="button" onClick={navi_to_Continue_speaking}>이어말하기</button>
            <button className="all_btn " type="button" onClick={navi_to_New_word_queze}>신조어 맞추기</button> */}
            {/* <button className="all_btn" type="button" onClick={navi_to_make_quezeshow}>퀴즈쇼 제작</button> */}
            <button className="all_btn " type="button" onClick={navi_to_community}>제안하기</button>
            <button className="all_btn " type="button" onClick={navi_to_guide}>공지사항</button>
            <button className="all_btn" type="button" onClick={()=>router('/produce')}>퀴즈쇼 제작</button>
            {/* <button className="all_btn " type="button" title="" onClick={navi_to_space}>스페이스</button> */}
            {
                isLogin() ?
                <button className="all_btn header_login_btn" type="button" onClick={()=>{router('/profile')}}>프로필</button>
                :
                <button className="all_btn header_login_btn" type="button" onClick={()=>{router('/login')}}>로그인<br/>회원가입</button>

            }
        </header>
    )
}
export default ayo_world_rank_header;