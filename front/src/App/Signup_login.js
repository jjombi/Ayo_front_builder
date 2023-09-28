import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import './css.css';
import {useCookies} from 'react-cookie';
import School_choose from './School_chose';

const Signup_login = () =>  /*--------------------22222222222---------------------------- */
    {
        const [cookie, setCookie, removeCookie] = useCookies();

        useEffect(()=> {
           //----------------------로그인 유지 시간 만료 됬으면--------------------
            if(cookie.ayo_cookie && cookie.ayo_cookie !== null){
                if(cookie.ayo_cookie.date <= Date.now()){
                    console.log('로그인 기간 만료, 삭제 됨');
                    removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
                    localStorage.clear();
                }
                window.location.href = 'http://localhost:8080/queze';
            }
            //------------------------------------------------------------------
            
        })

        const id_ref = useRef('');
    
        const name_ref = useRef('');
    
        const password_ref = useRef('');

        const navigate = useNavigate();     

        const signup_done = () => 
        {

            if(id_ref.current.value == '' || name_ref.current.value == '' || password_ref.current.value == '')
            {

                alert('입력창을 다시 확인해 주세요');

            }else 
            {

                navigate('/School_choose',{   
                    
                    state: {
                        id: id_ref.current.value,
                        name : name_ref.current.value,
                        pass : password_ref.current.value,
                    }
                });
                

            }
            navigate('/School_choose',   
            {   
                state : {
                    id : id_ref.current.value,
                    name : name_ref.current.value,
                    pass : password_ref.current.value,
                }
                
            });
    }
        
        const check_userid = (Userdata) => 
        {
            if(id_ref.current.value == '') return(alert('id를 입력해 주세요'));

            console.log('id_ref : 값', id_ref.current.value);

            axios
            ({

                method   : 'post',
                url      : 'http://localhost:45509/check_id',
                data     : 
                {
                    'userid' : id_ref.current.value
                },
                headers  : 
                {
                    "Content-Type": "application/json",
                }
                
            })
            .then(res => 
            {

                console.log(res);
                
                if(res.data === 'that userid is aleady used')
                {

                    console.log('that userid is aleady used');
                    alert('이미 사용되고있는 id 입니다');

                }
                else if(res.data === 'you can use it')
                {

                    console.log('you can use it');
                    alert('사용가능한 아이디 입니다');

                }

            })
            .catch(error => {

                console.error("Error:", error);

            });

        }
        return(
            <>
            
                <div className='Main_root'>


                    <div className='content_area'>


                        <div className='Logo'></div>

                        <input type='text' className='Input_basic Border_radius Top' placeholder='이름을 입력해 주세요' ref={name_ref}></input>
                        
                        <input type='text' className='Input_basic Border_radius' placeholder='id 입력' ref={id_ref}></input>
                       
                        <input type='button' className='Input_basic Input_id_btn Border_radius' value="아이디 중복 검사" onClick={check_userid}></input> 

                        <input type='password' className='Input_basic Border_radius' placeholder='비밀번호를 입력해 주세요' ref={password_ref}></input>
                        
                        <input type='password' className='Input_basic Border_radius' placeholder='비밀번호를 다시 입력해 주세요'></input>
                        
                        <input type='button' className='Submit_btn Submit_btn_' value="다음" onClick={signup_done}></input>
                        
                        <p className='Page_num'>2/3</p>
                    
                    </div>
                        
                </div>
            
            </>
        )
    
    }
export default Signup_login;
