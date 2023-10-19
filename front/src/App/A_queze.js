
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useParams, useLocation,useSearchParams } from "react-router-dom";
import './css.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Queze_box from './Queze_box';
import Adfit from './adfit';
import SelectBox from './Select_box';
import Popup from './Popup';
import Queze_result from './Queze_result';

const A_queze = () => {
    const [con, setCon] = useState('');

    const navigate = useNavigate();

    const input_value = useRef();

    const roomNameRef = useRef();

    const opacity_ = useRef();

    const back = useRef([]);

    const class_ = useRef();

    const number = useRef();

    const [searchParams, setSearchParams] = useSearchParams();

    const school_name = useRef();

    const [queze_value, setQueze_value] = useState('없음');
    useEffect(()=>{
        roomNameRef.current = searchParams.get('roomName');
        school_name.current = searchParams.get('school_name');
        console.log(roomNameRef,school_name); 

        axios({
            url      : 'http://localhost:45509/Q_queze_value',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },
            data     : {
                roomName : roomNameRef.current                
            }
        }).then((res)=>{
            console.log('res a queze value',res.data[0].value);
            setQueze_value(res.data[0].value);
        })

    },[])

    
    const vote = () => {
        console.log(input_value.current);
        if(input_value.current == '' || input_value.current == null){
            alert('뽑는이를 적어주세요');
        }
        else{

            axios({
                //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
                url : 'http://localhost:45509/vote',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    //방 번호
                    //뽑은 사람
                    roomName : roomNameRef.current,
                    voteName : `${input_value.current.value}`,
                    class    : Number(class_.current.value),
                    number   : Number(number.current.value)
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

            <div className="A_queze_content">
                <p>{queze_value}</p>
            </div>                

                <div className='line4'></div>

                <input type='text' ref={input_value} className='Input_basic Border_radius name_input' placeholder='이름 입력'></input>
                
                <div className='Input_basic Border_radius select_parents_div'>

                    <select name="class" className='Border_radius select_basic' ref={class_}>
                        <option value="-1">모름</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <select name="class" className=' Border_radius select_basic' ref={number}>
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

                <Queze_result roomNameRef={roomNameRef}></Queze_result>

                <input type='button' onClick={vote} value="투표하기" className='Submit_btn Submit_btn_'></input>
                
                    
            </div>
            {
                con === "투표 완료" ? <Popup text={con} func={votesuccess} opacity_={opacity_}></Popup> : null
            }
            <Adfit unit="DAN-moiryOKSlck2hjOA"></Adfit>
        </div>
    )
}





export default A_queze;

