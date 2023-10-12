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
            if(localStorage.getItem('token') != undefined){
                if(localStorage.getItem('end_time') <= Date.now()){
                    localStorage.clear();
                }
            }else {
                
            }
            
        },[])

        const location = useLocation();

        const navigate = useNavigate();     

        const key_val = useRef(0);

        const input_value = useRef(); 

        const class_ = useRef();

        const number = useRef();

        const age = useRef();

        const school_name_ref = useRef([]);

        const export_school_name = useRef();

        const [render,setRender] = useState(0);

        const [modal_state,setModal_state] = useState('0');

        const back = useRef();


        const apifun = () => //회원 가입 완료 버튼
        {

            console.log('props, export_school_name',props, export_school_name);

            axios({ //          ayo 회원가입
                
                method           : 'Post',
                url              : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/infor',
                data             : 
                {

                    'userName'     : location.state.name,
                    'userid'       : location.state.id,
                    'userPassword' : location.state.pass,
                    'schoolName'   : input_value.current.value,
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
                localStorage.setItem('end_time',Date.now() + 7200000);
                console.log('success');
                navigate('/queze');
            })
            

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
        const fn = (e)=> {
            console.log('bluer');
            // export_school_name.current = [];
            setModal_state('0');
            back.current = null;
            input_value.current.style.borderRadius = '10px';
            setRender(render + 1);
            
        }
        const Axios_fn =() => /*--------------------------------------------------------------*/
        {   

            console.log('input 안에 뭐',<input></input>,'debounce로 실행 됨');
            setModal_state('15');
            console.log('ref : ',input_value.current.value);
            fetch(`https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${input_value.current.value}&Type=json&key=7bb28e84d18c4b3c9455a81e663d6e6e`)
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

                        <input type='button' className=' id_area Suggested_Search' key={key_val.current} onClick={(e)=>{input_value.current.value = e.target.value;fn()}} value={value}></input>


                    );

                });

                console.log('Line 230 props_arr value : ',props_arr);

                export_school_name.current = props_arr;
                console.log('export_school_name component배열 만든 직후 : ',export_school_name.current);


                if(export_school_name.current[export_school_name.current.length - 1] !== null) {
                    export_school_name.current.push(<div className='bottom_name_input_area'></div>);
                    input_value.current.style.borderRadius = '0';
                    input_value.current.style.borderTopLeftRadius = '10px';
                    input_value.current.style.borderTopRightRadius = '10px';
                }
                else {
                    input_value.current.style.borderRadius = '10px';
                }

                console.log('EXPORT ref',export_school_name.current,'props',props_arr);
                back.current = [<div className='back' onClick={fn}></div>]
                setRender(render + 1);

            })
            
             
    }

    return(
        
        <div className='Main_root'>
            <div className='content_area'>

                {back.current}

            <div className='Logo'><p>Ayo</p></div>

                <input type='select' className='Input_basic Border_radius z_index' placeholder='학교 검색' ref={input_value} onKeyUp={processChange} ></input>
                <div className='modal2' style={{height : `${modal_state}%`}}>
                    {
                        export_school_name.current
                    }
                </div>
                                            
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