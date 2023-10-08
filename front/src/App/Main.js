import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css.css';
import {useCookies} from 'react-cookie';
import Signup_login from './Signup_login';

// 할꺼
// 1. alert 안쓰고 팝업창 만들기 
// 2. 디자인 더 깔끔하게
// 3. 반응형으로 바꾸기
// 4. 데이터 요청, 서버에 요청보낼 때 버튼이 두번 눌리지 않도록 하는거 만들기 디바운스 https://www.freecodecamp.org/korean/news/debounce-dibaunseu-javascripteseo-hamsureul-jiyeonsikineun-bangbeob-js-es6-yeje/
//    학교 찾기 에서 버튼 빼고 값이 바뀔때 마다 요청보내서 띄우도록\
//    
// 5. 최적화
//


const Main = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [con, setCon] = useState(1);

    useEffect(()=>{
        //----------------------로그인 유지 시간 만료 됬으면--------------------
        console.log(cookie.ayo_cookie);
        if(cookie.ayo_cookie && cookie.ayo_cookie !== undefined){
            if(cookie.ayo_cookie.date <= Date.now()){
                console.log('로그인 기간 만료, 삭제 됨');
                removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
                localStorage.clear();
            }
            // navigate('/queze');
        }else if(cookie.ayo_cookie == undefined){
            localStorage.clear();
        }
        //------------------------------------------------------------------
    },[])
    const ddd = [<div style={{backgroundColor : '${bc}'}} className='btn_basic' onClick={()=>{if(bc == 'blue'){setBc('red')}else{setBc('blue')}}}></div>]
    const to_signup = () => 
    {
        setCon(2);
        navigate('Signup_login');
        console.log(con);
    }

    return(
        <div className='Main_root'>

            <div className='content_area'>


                <div className='Logo'><p>Ayo</p></div>


                
                <div className='btn_basic Top' onClick={()=>{navigate('/login')}}>
                    <div>로고</div>
                    <p>Ayo계정 로그인</p>
                </div>
                

                <div  className='btn_basic' onClick={to_signup}>
                    <div>로고</div>
                    <p>Ayo계정 회원가입</p>
                </div>
                

                <p className='guid_message Guid_message_'>회원가입 또는 로그인 후 이용가능한 서비스 입니다</p>
                

            </div>
            
        </div>
    )
    
}
    
export default Main;
