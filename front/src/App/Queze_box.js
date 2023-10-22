import React, { useEffect,useRef, useState } from "react";
import axios from 'axios';

import Svg_ from '/src/App/Img_folder/arrow_figma.svg';
import { useSearchParams } from "react-router-dom";

const Coo = (props) => {
    const [render,setRender] = useState(0);
    const queze_value = useRef([]);
    const school_name_params = useRef();
    const [searchParams,setSearchParams] = useSearchParams();


    console.log(props);
    useEffect(()=>{// 학교, 반으로 나누지 않고 학교로만 나눠서 보여줌
        school_name_params.current = searchParams.get('school_name');
        if(school_name_params.current === 'null'){
            alert('학교를 다시 선택해 주세요');
            
        }
        else {
            axios({
                // url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
                url : 'http://localhost:45509/queze_option', //select * from queze where scn = schoolname
                method : "post",
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    school_name : `${school_name_params.current}`,
                    sequence : props.select_ref.current.value
                }
            }).then((res)=>{
                console.log('queze_option : ',res.data);
                res.data.map((e)=>{
                    props.roomName_arr.current.push(e.roomName);
                })
                console.log('roomName 배열 초기 값 : ',props.roomName_arr.current);
                setSearchParams({
                    roomName : `${props.roomNameRef.current[arr_chooser.current]}`,
                    school_name : `${school_name_params.current}`
                });
            })
        }

    },[])

    return(
        <>
            <li className='Queze_li ' >
                <p className="Queze_p">{queze_value.current[props.arr_chooser.current]}</p>
            </li>
        </>
    )
}

const Queze_box = (props) =>{
    const [render,setRender] = useState(0);
    const [searchParams,setSearchParams] = useSearchParams();
    const arr_chooser = useRef(0); 
    const [queze_length, setQueze_length] = useState(0);
    const con = useRef(false);
    const school_name_params = useRef();
    const queze_result_ref = useRef();
    const roomName_ref = searchParams.get('roomName');
    const [queze_result, setQueze_result] = useState();
    const select_ref = useRef();
    const roomName_arr = useRef([]);
    useEffect(()=>{
        school_name_params.current = searchParams.get('school_name');

        axios({
            url      : 'http://localhost:45509/queze_result',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },  
            data     : {
                roomName : roomName_ref               
            }
        }).then((res)=>{

            console.log('res queze result',res);
            let queze_result_value;

            if(res.data === '없음'){
                queze_result_value = '없음';
                queze_result_ref.current = [
                    <button  className='show_reslut_li' >
                        <p className='show_result_p'>...</p>
                        <p className='show_result_p2'>없음</p>
                    </button>
                ]
            }else{
                queze_result_ref.current = [];
                for(let i=1; i <= res.data.length;i++){
                    console.log(i);
                    queze_result_value = res.data[i-1].id;
                    queze_result_ref.current.push(
                        <button onClick={()=>{console.log('bbbbb')}} className='show_reslut_li' key={i}>
                            <p className='show_result_p'>{i}등</p>
                            <p className='show_result_p2'>{queze_result_value}</p>
                        </button>
                    )
                }
            }
            axios({
                url      : 'http://localhost:45509/queze_popularity',
                method   : 'POST',
                headers  : {
                    'Content-Type' : 'application/json'
                },  
                data     : {
                    roomName : roomName_ref           
                }
            }).then((res)=>{
                console.log(res);
            })
        
            console.log('result 받고 usestate 바꾸기 전 queze_result_Ref 값 : ',queze_result_ref.current);
            setQueze_result(queze_result_ref.current);
            console.log('result 받고 usestate 바꾼후 queze_result 값 : ',queze_result);
            props.queze_result_con.current = true;
        })
    },[arr_chooser.current])
    

    const btn1_click = () => { // 왼쪽으로 가는 버튼 -해줘
        console.log('left clicked',arr_chooser.current,queze_length);
        if(arr_chooser.current > 0){

            arr_chooser.current -= 1;
            props.num.current = arr_chooser.current;
            setRender(render + 1);
            console.log('roomName : Ref',props.roomNameRef.current[arr_chooser.current],'arrchooser : ',arr_chooser.current,school_name_params.current);
            setSearchParams({
                roomName : `${props.roomNameRef.current[arr_chooser.current]}`,
                school_name : `${school_name_params.current}`
            });
            props.queze_result_con.current = true;
        }   

    }
    const btn2_click = () => {
        console.log('right clicked',arr_chooser.current,queze_length);
        if(queze_length > arr_chooser.current){

            arr_chooser.current += 1;
            props.num.current = arr_chooser.current;
            setRender(render + 1);
            console.log('roomName : Ref',props.roomNameRef.current[arr_chooser.current],'arrchooser : ',arr_chooser.current,school_name_params.current);
            setSearchParams({
                roomName : `${props.roomNameRef.current[arr_chooser.current]}`,
                school_name : `${school_name_params.current}`
            });
            props.queze_result_con.current = true;

        }   
            
    }
    const popularity_order = () => { // 좋아요 누르기
        axios({
            url      : 'http://localhost:45509/up_queze_popularity',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },  
            data     : {
                roomName : roomName_ref        
            }
        }).then((res)=>{
            console.log('좋아요 누른뒤 axios요청 후 res : ',res);
        })
    }

    const quze_sequence = () => {
        axios({
            url      : 'http://localhost:45509/Q_queze_value',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },
            data     : {
                roomName : roomName_ref,
                sequence : select_ref.current.value
            }
        }).then((res)=>{
            console.log('res a queze value',res.data[0].value);
            setQueze_value(res.data[0].value);
        })
    }
    return(
        <>            
            <div className="Q_main kind_wrap">

                <div className='Q_area kind_slider'>
                    <ul className="Q_ul slider">
                    <Coo arr_chooser={arr_chooser} queze_length= {queze_length} setQueze_length={setQueze_length} con={con} props={props} select_ref={select_ref} roomName_arr={roomName_arr}></Coo>
                    </ul>
                    <button className='btn1' onClick={btn1_click}>
                        <Svg_   className="svg_"></Svg_>
                    </button>
                    <button className='btn2' onClick={btn2_click}>
                        <Svg_   className="svg_2"></Svg_>
                    </button>
                    
                </div>
            </div>
            <div className="B" >
                <select ref={select_ref} onChange={quze_sequence}> 
                    <option value="date desc">최신순</option>
                    <option value="likes desc">인기순</option>
                    <option value="date arc">날짜순</option>
                </select>
                <p>12</p>
                <button onClick={popularity_order}>asd</button>
            </div>
            <div className="A">
                {
                    queze_result
                }
            </div>
        </>

    );
}
export default Queze_box;