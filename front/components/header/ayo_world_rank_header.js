import React from "react";
import { getAccessToken, isLogin, router } from "@functions/WorldRank";
import new_logo from '@image/Img_folder/NEWLOGO.png';
import Image from 'next/image';
import { useRouter } from "next/router";
const ayo_world_rank_header = () => {

    const router_ = useRouter();

    const navi_to_make_queze = () => {
        router(router_,'/ayoworldrankmakequeze');
    }
    const navi_to_main = () => {
        router(router_,'/worldcup');
    }
    const navi_to_quezeshow = () => {
        router(router_,'/');
    }
    const navi_to_make_quezeshow = () => {
        router(router_,'/Produce/step1');
    }
    const navi_to_community = () => {
        router(router_,'/Community');
    }
    const navi_to_space = () => {
        router(router_,'/space');
    }
    const navi_to_guide = () => {
        router(router_,'/guide');
        
    }
    const navi_to_machugi = () => {
        router(router_,'/machugi');
    } 
    const navi_to_Continue_speaking = () => {
        router(router_,'/continue_speaking');
    }
    const navi_to_New_word_queze = () => {
        router(router_,'/new_word_queze');
    }
    return(
        <header className="Main2_header">
            <div className='header_rogo'>
                <Image src={new_logo} alt="ay0-Logo"></Image>
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
            <button className="all_btn" type="button" onClick={()=>router(router_,'/produce')}>퀴즈쇼 제작</button>
            {/* <button className="all_btn " type="button" title="" onClick={navi_to_space}>스페이스</button> */}
            
            {   
                typeof window === 'undefined'? 
                <button className="all_btn header_login_btn" type="button" onClick={()=>{router(router_,'/login')}}>로그인<br/>회원가입</button>:
                isLogin() ?
                <button className="all_btn header_login_btn" type="button" onClick={()=>{router(router_,'/profile')}}>프로필</button>
                :
                <button className="all_btn header_login_btn" type="button" onClick={()=>{router(router_,'/login')}}>로그인<br/>회원가입</button>
            }

        </header>
    )
}
export default ayo_world_rank_header;