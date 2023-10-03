
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useParams, useLocation } from "react-router-dom";
import './css.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
// import io from "socket.io-client";

import Popup from './Popup';

const Queze = () => {

    
    const [cookie, setCookie, removeCookie] = useCookies();
        
    useEffect(()=>{
        console.log('queze_page is rendered');

    },[])
    return(
        <div className='Main_root'>
            <Queze_screen></Queze_screen>
        </div>
    )
}



const Queze_screen = (props) => {

    const translate = useRef(0);
    
    const [controller, setController] = useState(false);

    const navigate = useNavigate();

    const location = useLocation(); // location.state.access_token 값

    const widthRef = useRef('100%');

    const [value,setValue] = useState();

    const val = useRef();

    const key_val = useRef(0);

    const components_arr = useRef();

    const [render, setRender] = useState(0);

    const res_same_school_name_arr = useRef(); //같은 학교 친구들 이름이 배열로 나열되있음

    const input_value = useRef();

    const roomNameRef = useRef();

    const num = useRef(0);

    const datalist = useRef([false,false,false]);

    const token = localStorage.getItem('token');
    
    const mount = useRef();

    const [chooser_translate_state,chooser_setTranslate_state] = useState(0);

    const take_queze = () =>{
        axios({
            url : 'http://localhost:45509/queze2',
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                school : datalist.current[0],
                class : datalist.current[1],
                number : datalist.current[2],
                token  : token
            }
        }).then((res)=>{
            // console.log(res.data[0].roomName);
            const v = res.data.map((e)=>e.value); // 퀴즈 내용
            roomNameRef.current = res.data.map((e)=>e.roomName); // 방번호
            // console.log('roomNameRef is : ',roomNameRef.current);
            // console.log('v',v[0]);
            val.current = v;
            setRender(0);
        })
    }

    useEffect(()=>{

        const jwt = localStorage.getItem('token');
        console.log('take_name 으로 axios 보내짐 and rendered',' jwt is : ',jwt);
        //같은 학교 친구들 이름 가져오기
        axios({
            url : 'http://localhost:45509/api/take_name',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                school : jwt
            },
            
        }).then((res)=>{
            res_same_school_name_arr.current =  res.data;

        })
    },[])
    //######################################################################################
    //######################################################################################
    //-----------------------queze_box------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------- 
    const Queze_box = (props) =>{

        const [render,setRender] = useState();
        const val = useRef([]);
        const [translate_state,settranslate_state] = useState('');
        const key = useRef(0);
        const arr_components = useRef();
        
        
        
        
        useEffect(()=>{
            console.log('props',translate_state);
            console.log('Queze_box_page is rendered');
    
            console.log('text', props.text);
    
            axios({
                url : 'http://localhost:45509/queze2',
                method : "post",
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    school : datalist.current[0],
                    class : datalist.current[1],
                    number : datalist.current[2],
                    token  : token
                }
            }).then((res)=>{
                // console.log(res.data[0].roomName);
                const v = res.data.map((e)=>e.value); // 퀴즈 내용
                roomNameRef.current = res.data.map((e)=>e.roomName); // 방번호
                // console.log('roomNameRef is : ',roomNameRef.current);
                // console.log('v',v[0]);
                val.current = v;
                mount.current = (res.data.length -1) * -100; // 데이터 양
                setRender(0);
            })
        },[])
        // console.log('arr components is : ',arr_components.current);
        arr_components.current = val.current.map((e)=>{
            key.current += 1;
            return(
    
                <li className='Queze_li Border_radius' style={{transform : `translateX(${translate_state}%)`}} key={key.current}>
                    <p className="Queze_p">{e}</p>
                </li>
            );
        })
        // console.log('arr_compotents is ',arr_components.current);
        
        const btn1_click = () => { // 왼쪽으로 가는 버튼 -해줘
            // console.log('left clicked');
            if(translate_state >= 0){
            }
            else {
                console.log('left');
                settranslate_state(translate_state + 100);
                num.current--;
            }
    
    
        }
        const btn2_click = () => {
            // console.log('left clicked');
            if((translate_state <= mount.current)){
                
            }else {
                settranslate_state(translate_state - 100);
                num.current++;
            }
    
        }
        
    
        return(
            <div className="Q_main kind_wrap">
                {/* <div className="top_bottom">
                    <ul className="u1_2">
    
                    </ul>
                </div> */}
                <div className='Q_area kind_slider'>
                    <ul className="Q_ul slider">
                        {
                            arr_components.current
                            
                        }
                        
                    </ul>
                    <button className='btn1' onClick={btn1_click}></button>
                    <button className='btn2' onClick={btn2_click}></button>
                    
                </div>
            </div>
    
        );
    }
    ////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////여기 까지]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
    ////////////////////////////////////////////////////////////////////////////////////
    const debounce = (func, timeout = 300) => {// 디바운스--------------
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
    }
    const processChange = debounce(() => axios_fn());
    //--------------------------------------------------------------------
    //-----------------------추천 이름 component 생성 함수----------------------
    const axios_fn = ()=>{
        console.log('axios is start');

        const props_arr = res_same_school_name_arr.current.map((value)=>// test1,
            {   
                console.log('input_val.curent',input_value.current.value);
                if(input_value.current.value == ''){
                    return null;
                }
                key_val.current = (key_val.current + 1);

                if(value.includes(input_value.current.value)){
                    console.log('입력한 값을 포함함');
                    return (

                        <input type='button' className=' id_area Suggested_Search' key={key_val.current} onClick={(e)=>{input_value.current.value = e.target.value}} value={value}></input>
    
                    );
                }
                else {
                    return null;
                }


            }
        );
        components_arr.current = props_arr;
        setRender(render + 1);
        // console.log('components_arr : ', components_arr);
    }
    //-----------------------------------------------------------------------------
    //---------------------------로그인 되어있는지 확인--------------------
    const login_checker = () => {
        cookie.ayo_user_id !== undefined ? setController(true) : setController(false)
    }
    //----------------------------------------------------------------------------------
    const [cookie, setCookie, removeCookie] = useCookies();

    const logout = () => {
        console.log('쿠키 비우기',localStorage.getItem('kakao_411c89c5f5668a0cf386f9730723ec89'));
        removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
        localStorage.clear();
        if(cookie.kakao_login_access_token !== null){// access_token에 값이 있으면(카카오 로그인 되있는 상태)
            const access_token = cookie.kakao_login_access_token;
            console.log('카카오 로그아웃');
            removeCookie('kakao_login_access_token',{path: '/', domain: 'localhost'});
            window.location.href = 'https://kauth.kakao.com/oauth/logout?client_id=06a99c89dcf41c4f83132512d600f00d&logout_redirect_uri=http://localhost:8080';
        }
    }

    const vote = () => {
        // socket.emit('server1',`${input_value.current.value}`); 
        console.log('roomNameRef is : ',roomNameRef.current[num.current]);
        console.log('input val',input_value.current.value);
        axios({
            url : 'http://localhost:45509/vote',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                //방 번호
                //뽑은 사람
                roomName : roomNameRef.current[num.current],
                voteName : `${input_value.current.value}`
            }
        }).then((res)=>{
            console.log('vote api res is',res);
        })
    }

    const switch_btn = (e) => {
        console.log('e is : ',e.style);
        console.log('key is : ',e.title);
        if(e.style.backgroundColor !== 'blue'){
            e.style.backgroundColor = 'blue';
            datalist.current[e.title] = true;
        }else {
            e.style.backgroundColor = 'white';
            datalist.current[e.title] = false;
        }

        take_queze();
    }

    const makeQueze = () => {
        console.log('datalist : ',datalist.current[0],datalist.current[1],datalist.current[2]);
        axios({
            url     :'http://localhost:45509/create_queze',
            method  : 'POST',
            headers : {

                'Content-Type' : 'application/json'

            },
            data    : {

                //학교,학급,반,질문,방번호
                school      : datalist.current[0],
                class       : datalist.current[1],
                number      : datalist.current[2],
                queze       : input_value.current.value,
                token       : token       

            }
        }).then((res)=>{
            console.log('질문 올림',res);
        })
    }
    const chooser_r_btn = () => {
        if(chooser_translate_state >= 0){
        }
        else {
            console.log('left');
            chooser_setTranslate_state(chooser_translate_state + 100);
        }
    }
    const chooser_l_btn = () => {
        if((chooser_translate_state <= -200)){
                
        }else {
            chooser_setTranslate_state(chooser_translate_state - 100);
        }
    }
    return(
        <>  
            
            <div className='content_area'>

                
                <div className='Q_chooser Border_radius Top'>
                    <ul className="Q_chooser_ul">
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={0} >학교 전체</li>
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={1} >학급 전체</li>
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={2} >우리 반 전체</li>
                    </ul>
                    <button className='btn1' onClick={chooser_r_btn}></button>
                    <button className='btn2' onClick={chooser_l_btn}></button>
                    
                </div>

                <Queze_box></Queze_box>

                <div className='line4'></div>

                <input type='text' onClick={login_checker} onKeyUp={processChange} ref={input_value} className='Input_basic Border_radius' placeholder='이름 입력'></input>
                <Component props={components_arr.current}></Component>
                <input type='button' onClick={vote} value="투표하기" className='btn_basic'></input>
                <input type='button' onClick={logout} className='btn_basic' value="로그아웃"></input>
                <input type='button' onClick={()=>navigate('/makequeze')} className='btn_basic' value="질문 만들기"></input>
                {/* <input className="btn_basic" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={0} value="학교"></input>
                <input className="btn_basic" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={1} value="학급"></input>
                <input className="btn_basic" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={2} value="반"></input> */}
                    
            </div>
            {
                controller == true ? <Popup></Popup> : null
            }
        </>
    );
}

const Component = (props) => /*---------------------------------------------------------*/
    {
        

        console.log('props',props.props);

        return(


            <>
                {props.props}
            </>

        );
    }
export default Queze;

