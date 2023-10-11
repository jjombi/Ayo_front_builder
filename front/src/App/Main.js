import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './css.css';
import {useCookies} from 'react-cookie';



const Main = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem('token') != undefined){
            if(localStorage.getItem('end_time') <= Date.now()){
                localStorage.clear();
                alert('로그인 만료');
                navigate('/');
            }
            else{
                alert('로그인 됨');
            }
        }
        
    },[])
    const to_signup = () => 
    {
        navigate('Signup_login');
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
