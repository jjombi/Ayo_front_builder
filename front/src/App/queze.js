
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useParams, useLocation } from "react-router-dom";
import './css.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Queze_box from './Queze_box';
// import io from "socket.io-client";

import Popup from './Popup';

const Queze = () => {

    return(
        <div className='Main_root'>
            <Queze_screen></Queze_screen>
        </div>
    )
}



const Queze_screen = (props) => {

    const [con, setCon] = useState('');

    const navigate = useNavigate();

    const key_val = useRef(0);

    const components_arr = useRef();

    const [render, setRender] = useState(0);

    const res_same_school_name_arr = useRef(); //같은 학교 친구들 이름이 배열로 나열되있음

    const input_value = useRef();

    const roomNameRef = useRef();

    const num = useRef(0);

    const token = localStorage.getItem('token');
        
    const type_ = useRef('학교');

    const queze_result = useRef(null);

    const opacity_ = useRef();

    useEffect(()=>{

        
        console.log('take_name 으로 axios 보내짐 and rendered',' jwt is : ',token);
        //같은 학교 친구들 이름 가져오기
        if(token === null){
            alert('로그인 만료');
            navigate('/');
        }
        else{

            axios({
                url : 'http://localhost:45509/api/take_name',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    token : token,
                    type  : type_.current
                },
                
            }).then((res)=>{
                res_same_school_name_arr.current =  res.data;
                console.log('같은 힉교 친구들 이름',res_same_school_name_arr.current);
            })
            
        }
        
    },[])


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
        console.log('axios is start',input_value.current.style);

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

                        <input type='button' className=' id_area Suggested_Search' key={key_val.current} onClick={(e)=>{input_value.current.value = e.target.value;components_arr.current = null; setRender(7)}} value={value}></input>
    
                    );
                }
                else {
                    return null;
                }


            }
        );
        components_arr.current = props_arr;
        if(components_arr.current[components_arr.current.length - 1] !== null) {
            components_arr.current.push(<div className='bottom_name_input_area'></div>);
            input_value.current.style.borderRadius = '0';
            input_value.current.style.borderTopLeftRadius = '10px';
            input_value.current.style.borderTopRightRadius = '10px';
        }
        else {
            input_value.current.style.borderRadius = '10px';
        }
        console.log('_______________________',components_arr.current);
        setRender(render + 1);
        // console.log('components_arr : ', components_arr);
    }
    //-----------------------------------------------------------------------------
    //---------------------------로그인 되어있는지 확인--------------------
    // const login_checker = () => {
    //     cookie.ayo_user_id !== undefined ? setController(true) : setController(false)
    // }
    //----------------------------------------------------------------------------------
    const [cookie, setCookie, removeCookie] = useCookies();

    const show_result = () => {
        console.log('roomname : ',roomNameRef.current,num.current);
        axios({
            url : 'http://localhost:45509/queze_result',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                token : token,
                type  : type_.current,
                roomName : roomNameRef.current[num.current]
            },
            
        }).then((res)=>{
            let i = 0;
            queze_result.current = res.data.map(e=>{
                i = i+1;
                return(
                    <li className='show_reslut_li'>
                        <p className='show_result_p'>{i}등</p>
                        <p className='show_result_p2'>{e.name}</p>
                    </li>
                )
            })
            console.log('순위 3명',res.data);
            setRender(render + 1);

        })
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
        setCon('투표 완료');
        opacity_.current = 1;
        // setTimeout(() => {
        //     opacity_.current = 0;
        //     setCon('');
        // }, 500);
    }

    const navi_fun = () =>{
        navigate('/');
    }
    const votesuccess = () =>{
        setCon('');

    }
    return(
        <>  
            
            <div className='content_area'>
                

                <Queze_box num={num} roomNameRef={roomNameRef} type={type_} res_same_school_name_arr={res_same_school_name_arr}></Queze_box>

                <input type='button' className='btn_basic option' onClick={show_result} value="결과 보기"></input>
                
                <div className='result_screan'>
                    {
                        queze_result.current
                    }
                </div>
                

                <div className='line4'></div>

                <div className='name_input_area'>
                </div>

                <input type='text' onKeyUp={processChange} ref={input_value} className='Input_basic Border_radius name_input' placeholder='이름 입력'></input>
                 
                <div className='modal'>
                    {
                        components_arr.current
                    }
                </div>                
                
                <input type='button' onClick={vote} value="투표하기" className='Submit_btn Submit_btn_'></input>
                
                    
            </div>
            {/* {
                controller == true ? <Popup></Popup> : null
            } */}
            {
                con === "투표 완료" ? <Popup text={con} func={votesuccess} opacity_={opacity_}></Popup> : null
            }
        </>
    );
}



export default Queze;

