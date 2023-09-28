import React, { useEffect } from "react";
import { useRef } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";


const Login = () => {
    const id = useRef();
    const pass = useRef();
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true; // withCredentials 전역 설정

    useEffect(()=> {
        //----------------------로그인 유지 시간 만료 됬으면--------------------
        if(cookie.ayo_cookie && cookie.ayo_cookie !== null){
            if(cookie.ayo_cookie.date <= Date.now()){
                console.log('로그인 기간 만료, 삭제 됨');
                removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
                localStorage.clear();
            }
            navigate('/queze')
            
        }
        //------------------------------------------------------------------
        

    },[])


    const login_submit = () => { //로그인 완료
        console.log('id', ':', id.current.value);
        console.log('pass', ':', pass.current.value);
        if(id.current.value == '' || pass.current.value == ''){
            alert('아이디와 비밀번호를 입력해 주세요');
        }
        else {
            axios.defaults.withCredentials = true; // withCredentials 전역 설정
            axios({
                url : 'http://localhost:45509/login',
                method : 'post',    
                data : {
                    id : id.current.value,
                    password : pass.current.value
                },
                header : {
                    "Content-Type" : "application/json"
                },
                
            }).then((res)=>{
                console.log(res.data);
                localStorage.setItem('token',res.data);
                navigate('/queze');
            })
        }
        
    }

    return(
        <div className='Main_root'>

            <div className='content_area'>
            
                <div className='Logo'></div>

                <input type='text' className='Input_basic Border_radius Top' placeholder='아이디를 입력해 주세요' ref={id}></input>

                <input type='password' className='Input_basic Border_radius' placeholder='비밀번호를 입력해 주세요' ref={pass}></input>

                <input type='button' className='Submit_btn Submit_btn_' value="다음" onClick={login_submit}></input>
            </div>
        
        </div>
        
    );
}
export default Login;