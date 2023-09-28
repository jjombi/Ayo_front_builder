import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import './css.css';
import {useCookies} from 'react-cookie';


const School_choose = (props) => /*-----------------33333333333333333---------------------------------------------- */
    {  
        const [cookie, setCookie, removeCookie] = useCookies();

        useEffect(()=> {
            console.log(cookie.ayo_user_id);
            if(cookie.ayo_user_id && cookie.ayo_user_id !== null){
                window.location.href = 'http://localhost:8080/queze';
            }
        })

        const location = useLocation();

        const navigate = useNavigate();     

        const key_val = useRef(0);

        const ref = useRef(); 

        const class_ = useRef();

        const number = useRef();

        const age = useRef();

        const school_name_ref = useRef([]);

        const code = useLocation();

        const export_school_name = useRef();

        const [render,setRender] = useState(0);

        const access_token = useRef();

        const target_id = useRef(); //카카오 targeg_id

        const kakao_nickname = useRef(); // 카카오 로그인 유저 이름

        useEffect(()=>{
            const code = new URL(window.location.href).searchParams.get("code");
            const client_id = '06a99c89dcf41c4f83132512d600f00d'; //rest
            const redirect_uri = 'http://localhost:8080/school_choose';
            if(code !== null && cookie.kakao_access_token == undefined){
                console.log(code, ' : code');
                axios({//                 토큰 받기
                    method : 'POST',
                    url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=06a99c89dcf41c4f83132512d600f00d&refresh_token=${redirect_uri}&code=${code}`,
                    headers : {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((res)=> {
                    console.log(res.data);
                    access_token.current = res.data.access_token;
                    console.log(access_token.current,'58 access_token');
                    axios({ //                        카카오 사용자 정보 가져오기
                        url : `https://kapi.kakao.com/v2/user/me`,
                        method : 'POST',
                        headers : {
                            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'Authorization' : `Bearer ${access_token.current}`
                        },  
                    }).then((res)=>{
                        console.log(res.data.id);
                        axios({
                            url : 'http://localhost:45509/api/signup_check',
                            method : 'POST',
                            headers : {
                                'Content-type': 'application/json'
                            },
                            data : {
                                id : res.data.id
                            }
                        }).then((res)=>{
                            console.log('내 서버 요청',res); //이미 있는 카카오 계정
                            alert('이미 있는 계정 입니다');
                            if(res.data == 'that is already signuped') navigate('/');
                        })
                    })
                })
                
                
            }

            console.log(access_token);
        },[code])


        const apifun = () => //회원 가입 완료 버튼
        {

            console.log('props, export_school_name',props, export_school_name);
            // console.log('access_token : ',access_token);
            if(access_token.current !== undefined){// access_token에 값이 있으면(카카오 로그인 상태) 카카오 회원가입
                console.log('access tokenm : ',access_token.current);
                axios({ //                        카카오 사용자 정보 가져오기
                    url : `https://kapi.kakao.com/v2/user/me`,
                    method : 'POST',
                    headers : {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'Authorization' : `Bearer ${access_token.current}`
                    },  
                }).then((res)=>{
                    console.log(res);
                    target_id.current = res.data.id; // 카카오 아이디 넣고
                    kakao_nickname.current = res.data.properties.nickname;// 카카오 이름 넣고
                    console.log(target_id,kakao_nickname);

                    axios({

                    method           : 'Post',
                    url              : 'http://localhost:45509/infor/', // 내 서버에
                    data             : 
                    {
    
                        'userName'     : kakao_nickname.current, // 카카오 이름 이랑
                        'userid'       : target_id.current,      // 카카오 아이디랑
                        'userPassword' : 'kakao',
                        'schoolName'   : ref.current,           //  학교이름 이랑 보냄
                        'kakao_access_token' : access_token.current,
                        'age'          : age.current.value,
                        'class'        : class_.current.value,
                        'number'       : number.current.value
                    },
                    headers          : 
                    {
    
                        "Content-Type" : "application/json",
    
                    }
                    }).then((res)=>{
                        localStorage.setItem('token',res.data);
                    })
                })
                //로그인 유지를 위해 서버에서 토큰 보내줘야함 토큰은 카카오 access_token 값 가지고 있어야 함
                
            }else {
            axios({ //          ayo 회원가입
                
                method           : 'Post',
                url              : 'http://localhost:45509/infor',
                data             : 
                {

                    'userName'     : location.state.name,
                    'userid'       : location.state.id,
                    'userPassword' : location.state.pass,
                    'schoolName'   : ref.current.value,
                    'age'          : age.current.value,
                    'class'        : class_.current.value,
                    'number'       : number.current.value
                },
                headers          : 
                {

                    "Content-Type" : "application/json",

                }
            })
            .then((res) => 
            {
                localStorage.setItem('token',res.data);
                console.log('success');

            })
            }
            navigate('/queze',{   
                    
                state: {
                    access_token : access_token.current
                }
            });
        }


        const Component = (props) => /*---------------------------------------------------------*/
        {
            

            console.log(props.props);

            return(


                <>
                    {props.props.current}
                </>

            );
        }

        const debounce = (func, timeout = 300) => {
            let timer;
            return (...args) => {
              clearTimeout(timer);
              timer = setTimeout(() => {
                func.apply(this, args);
              }, timeout);
            };
        }
        const processChange = debounce(() => Axios_fn());

        const Axios_fn =() => /*--------------------------------------------------------------*/
        {   

            
            const fn = (e)=> {

                console.log('sad',e.target.value);
                ref.current.value = e.target.value;

            }
            console.log('ref : ',ref.current.value);
            fetch(`https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${ref.current.value}&Type=json&key=7bb28e84d18c4b3c9455a81e663d6e6e`)
            .then((response) => response.json())
            .then((data) => 
            {   


                if(Object.values(Object.values(data)[0])[1] === '해당하는 데이터가 없습니다.')
                {

                    console.log('해당하는 데이터가 없습니다.');

                }
                else 
                {

                    console.log('schoolInfo');

                    school_name_ref.current = [];

                    console.log('school_name 값 초기화', school_name_ref.current);

                    let data_ = data.schoolInfo[1];

                    if(data_.row.length <= 5)
                    { // 검색 길이 5이하

                        console.log('검색 길이 5이하');
                        let arr = [];
                        for(let i=0;i<data_.row.length;i++)
                        {
                            arr[i] = data_.row[i].SCHUL_NM;
                            console.log('빈 arr에 온 데이터 만큼 베열에 데이터 넣는 중',arr);
                        }
                        school_name_ref.current = arr;
                        console.log(' school_name : ',school_name_ref.current);

                    }
                    else 
                    {

                        let arr = [];
                        console.log('검색 길이 5이상');
                        for(let i=0;i<5;i++)
                        {
                            arr[i] = data_.row[i].SCHUL_NM; 
                            console.log('빈 arr에 온 데이터 만큼 베열에 데이터 넣는 중',arr);
                        }
                        school_name_ref.current = arr;
                        console.log(' school_name : ',school_name_ref.current);

                    }
                }
            })
            .then(()=> {

                console.log('Line 224  school_name value : ',school_name_ref.current);

                const props_arr = school_name_ref.current.map((value)=>
                {

                    key_val.current = (key_val.current + 1);

                    return (

                        <input type='button' className=' id_area Suggested_Search' key={key_val.current} onClick={fn} value={value}></input>

                    );

                });

                console.log('Line 230 props_arr value : ',props_arr);
    
                export_school_name.current = props_arr;

                console.log('EXPORT ref',export_school_name.current,'props',props_arr);
                
                setRender(render + 1);

            })
            
             
    }
    
        return(

            <div className='Main_root'>

            <div className='content_area'>

                <div className='Logo'></div>

                <input type='text' className='Input_basic Border_radius' placeholder='학교 검색' ref={ref} onKeyUp={processChange}></input>
                
                <Component props={export_school_name}></Component>
                
                <input type='button' className='Input_basic Input_id_btn Border_radius' value="enter" onClick={Axios_fn}></input>
                                               
                <select name="class" className='Input_basic Input_id_btn Border_radius' ref={class_}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>

                <select name="class" className='Input_basic Input_id_btn Border_radius' ref={number}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>

                </select>
                <input type='text' className='Input_basic Border_radius' placeholder='나이' ref={age} ></input>
                
                <p className='guid_message Guid_message_'>이제 마지막 단계 입니다</p>
                
                <input type='button' className='Submit_btn' value="완료" onClick={apifun}></input>
                
                

                <p className='Page_num'>3/3</p>
           
            </div>
            
        </div>
        )
    }
    export default School_choose;