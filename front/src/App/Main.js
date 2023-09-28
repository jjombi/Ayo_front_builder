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
    useEffect(()=>{
        //----------------------로그인 유지 시간 만료 됬으면--------------------
        console.log(cookie.ayo_cookie);
        if(cookie.ayo_cookie && cookie.ayo_cookie !== undefined){
            if(cookie.ayo_cookie.date <= Date.now()){
                console.log('로그인 기간 만료, 삭제 됨');
                removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
                localStorage.clear();
            }
            navigate('/queze');
        }else if(cookie.ayo_cookie == undefined){
            localStorage.clear();
        }
        //------------------------------------------------------------------
    },[])
    const [con, setCon] = useState(1);
    

    const Method_choose = () => { /*---------------------111111111111111111------------------------------ */
        
        const api_key = '06a99c89dcf41c4f83132512d600f00d'; //15ed10535ccc4ba448715ef558ca9c54
        const redirect_url = 'http://localhost:3000';
        const navigate = useNavigate();

        const to_signup = () => 
        {
            setCon(2);
            navigate('Signup_login');
            console.log(con);
        }
        
        // console.log(window.Kakao.isInitialized());
        const to_kakao = () => 
        {   
    
            
            window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=06a99c89dcf41c4f83132512d600f00d&redirect_uri=http://localhost:8080/school_choose&response_type=code';
        }


        return(
            <>

                <div className='content_area'>


                    <div className='Logo'></div>
 
                    <div className='Input_basic Border_radius Top' onClick={to_kakao}></div>
                    
                    <p className='guid_message'>카카오톡 로그인</p>
                    
                    <div className='Input_basic Border_radius' onClick={to_signup}></div>
                    
                    <p className='guid_message'>간편 회원 가입 하기</p>
                    
                    <input type='button' className='Input_basic Border_radius' onClick={()=>{navigate('/gotologin')}}></input>

                    <p className='guid_message'>이미 계정이 있으면 로그인 하러 가기</p>

                    <p className='guid_message Guid_message_'>회원가입 또는 로그인 후 이용가능한 서비스 입니다</p>
                    
                    <p className='Page_num'>1/3</p>

                </div>
                
            </>
        )
    }
        
    

    
    
    return(

        <div className='Main_root'>


            <Method_choose></Method_choose>
                    
            
        
        </div>

    );
}
    
export default Main;
