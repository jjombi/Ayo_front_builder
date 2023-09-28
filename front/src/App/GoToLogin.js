import React, { useEffect } from "react";
import axios from "axios";
import { useLocation,Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useCookies } from "react-cookie";


const GotoLogin = () => {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies();


    useEffect(()=> {
        const code = new URL(window.location.href).searchParams.get("code");
        const redirect_uri = 'http://localhost:8080/queze'
        console.log(code);
        if(code !== null){ // 인가코드 받으면
            axios({//                 토큰 받기
                method : 'POST',
                url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=06a99c89dcf41c4f83132512d600f00d&refresh_token=${redirect_uri}&code=${code}`,
                headers : {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res)=> {
                console.log(res.data);
                window.localStorage.setItem('logining','null');
                new URL(window.location.href).searchParams.set("code",null);
                axios.defaults.withCredentials = true; // withCredentials 전역 설정
                axios({
                    url : 'http://localhost:45509/api/kakao_login',
                    method : 'POST',
                    headers : {
                        "Content-Type" : "application/json"

                    },
                    data : {
                        kakao_access_token : res.data.access_token
                    }
                }).then((res)=>{
                    console.log(res);
                })
                // navigate('/queze');
            })
        }
        //----------------------로그인 유지 시간 만료 됬으면--------------------
            if(cookie.ayo_cookie && cookie.ayo_cookie !== null){
                if(cookie.ayo_cookie.date <= Date.now()){
                    console.log('로그인 기간 만료, 삭제 됨');
                    removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
                    localStorage.clear();
                }
                navigate('/queze');
            }
            //------------------------------------------------------------------
             
         
    })

    const to_kakao = ()=> {

        window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=06a99c89dcf41c4f83132512d600f00d&redirect_uri=http://localhost:8080/gotologin&response_type=code';

    }
    return(
        <>
            <div className='Main_root'>

                <div className='content_area'>
                    <div className='Logo'></div>
 
                    <div className='Input_basic Border_radius Top' onClick={to_kakao}></div>
                    
                    <p className='guid_message'>카카오톡 로그인</p>
                    
                    <div className='Input_basic Border_radius' onClick={()=>{navigate('/login')}}></div>
                    
                    <p className='guid_message'>ayo계정으로 로그인</p>
                    
                    <input type='button' className='Input_basic Border_radius' ></input>

                    <p className='guid_message Guid_message_'>회원가입 또는 로그인 후 이용가능한 서비스 입니다</p>
                    
                    <p className='Page_num'>2/3</p>
                </div>

            </div>

        </>
    );
}
export default GotoLogin;