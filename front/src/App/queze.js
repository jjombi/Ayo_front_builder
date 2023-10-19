
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useParams, useLocation, useSearchParams } from "react-router-dom";
import './css.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Queze_box from './Queze_box';
import Adfit from './adfit';
import SelectBox from './Select_box';
import Popup from './Popup';
import Queze_result from './Queze_result';

const Queze = () => {

    const [searchParams, setSearchParams] = useSearchParams();

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

    const back = useRef([]);

    const [modal_state,setModal_state] = useState('0');

    const [selectbox_con,setSelectbox_con] = useState(false);

    const props_option = useRef([]);

    const btn_content_value_con = useRef(true);

    const back_con = useRef(true);

    const class_ = useRef();

    const number = useRef();

    const school_name_params = useRef();;
    useEffect(()=>{
        console.log('qeuze rendering');
    })
    
    const vote = () => {
        console.log(input_value.current);
        if(input_value.current.value == '' || input_value.current.value == null){
            alert('뽑는이를 적어주세요');
        }
        else{

        
            console.log('roomNameRef is : ',roomNameRef.current[num.current]);
            console.log('input val',input_value.current.value);
            axios({
                //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
                url : 'http://localhost:45509/vote',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    //방 번호
                    //뽑은 사람 이름
                    //학급,
                    //반
                    roomName : roomNameRef.current[num.current],
                    voteName : `${input_value.current.value}`,
                    class    : `${class_.current.value}`,
                    number   : `${number.current.value}`
                }
            }).then((res)=>{
                console.log('vote api res is',res);
                
            })
            setCon('투표 완료');
            opacity_.current = 1;
        }
    }

    const navi_fun = () =>{
        navigate('/');
    }
    const votesuccess = () =>{
        setCon('');

    }
    return(
        <div className='Main_root'>
            <div className='content_area'>
                {
                    back.current
                }

                <Queze_box num={num} roomNameRef={roomNameRef} type={type_} res_same_school_name_arr={res_same_school_name_arr}></Queze_box>

                <div className='line4'></div>

                {/* <div className='name_input_area'>
                </div> */}

                <input type='text' ref={input_value} className='Input_basic Border_radius name_input' placeholder='이름 입력'></input>
                
                <div className='Input_basic Border_radius'>

                    <select name="class" className=' Border_radius' ref={class_}>
                        <option value="-1">모름</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <select name="class" className=' Border_radius' ref={number}>
                        <option value="-1">모름</option>
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

                </div>
                
                <Queze_result></Queze_result>

                <input type='button' onClick={vote} value="투표하기" className='Submit_btn Submit_btn_'></input>
                
                    
            </div>
            {
                con === "투표 완료" ? <Popup text={con} func={votesuccess} opacity_={opacity_}></Popup> : null
            }
            <Adfit unit="DAN-moiryOKSlck2hjOA"></Adfit>
        </div>
    )
}





export default Queze;

