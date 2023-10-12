import React, { useEffect,useRef, useState } from "react";

import axios from 'axios';
// import {ReactComponent as svg_} from '../img/arrow.svg';
// import svg_ from './arrow.svg';
import Svg_ from '/src/App/Img_folder/arrow_figma.svg';

const Coo = (props) => {
    const [render,setRender] = useState(0);
    const key = useRef(0);
    const arr_components = useRef();
    const token = localStorage.getItem('token');
    const queze_value = useRef([]);
    console.log(props);
    useEffect(()=>{
        
        if(token !== null){
            axios({
                url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
                method : "post",
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    type : props.props.type.current,
                    token  : token
                }
            }).then((res)=>{
                console.log(res.data);
                queze_value.current = res.data.map(e => e.value);
                props.setQueze_length(res.data.length - 2);
                props.props.roomNameRef.current = res.data.map(e=>{return(e.roomName)});
                console.log('roomNameRef in quezeBoc in Coo : ',props.props.roomNameRef.current);
                // props.roomNameRef.current = res.data.map(e => e.roomName);
                // setRender(render + 1);
            })
            

        }

    },[])
    if(props.con.current === true){
        axios({
            url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                type : props.props.type.current,
                token  : token
            }
        }).then((res)=>{
            console.log(res.data);
            queze_value.current = res.data.map(e => e.value);
            props.setQueze_length(res.data.length - 1);
            props.props.roomNameRef.current = res.data.map(e=>{return(e.roomName)});
            console.log('roomNameRef',props.props.roomNameRef.current);
            // props.roomNameRef.current = res.data.map(e => e.roomName);
            // setRender(render + 1);
            console.log('받은 갖ㅅ ', queze_value.current);
        })
        props.con.current = false;
    }
    return(
        <>
            <li className='Queze_li Border_radius' >
                <p className="Queze_p">{queze_value.current[props.arr_chooser.current]}</p>
            </li>
        </>
    )
}

const Queze_box = (props) =>{
    // console.log(props);
    const [render,setRender] = useState(0);
    // const key = useRef(0);
    // const arr_components = useRef();
    const token = localStorage.getItem('token');
    // const mount = useRef();

    const arr_chooser = useRef(0); 
    const [queze_length, setQueze_length] = useState(0);
    const con = useRef(false);

    
    const btn1_click = () => { // 왼쪽으로 가는 버튼 -해줘
        console.log('left clicked',arr_chooser.current,queze_length);
        if(arr_chooser.current > 0){

            arr_chooser.current -= 1;
            props.num.current = arr_chooser.current;
            setRender(render + 1);
        }   
            

        // console.log('trans after right_btn click',trans_state);


    }
    const btn2_click = () => {
        console.log('right clicked',arr_chooser.current,queze_length);
        if(queze_length > arr_chooser.current){

            arr_chooser.current += 1;
            props.num.current = arr_chooser.current;
            setRender(render + 1);
        }   
            

        // console.log('trans after right_btn click',trans_state);

    }
    

    const switch_ = (e)=>{
        props.type.current = e.value;
        console.log('바뀐 type : ',props.type.current);
        con.current = true;
        arr_chooser.current = 0;
        change_take_name();
        setRender(render + 1);
    }

    const change_take_name = () => {
        axios({
            url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/api/take_name',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                token : token,
                type  : props.type.current
            },
            
        }).then((res)=>{
            props.res_same_school_name_arr.current =  res.data;
            console.log('같은 힉교 친구들 이름',props.res_same_school_name_arr.current);
        })
    }

    return(
        <>
            <div className='Q_chooser2 Border_radius' title = "문제 범위를 설정할 수 있습니다">

                공개 범위 선택
                <select className='Border_radius' onChange={(e)=>{switch_(e.target)}}>
                    <option value="학교">학교 공개</option>
                    <option value="학급">학급 공개</option>
                    <option value="반">반 공개</option>
                </select>
            </div>
            
            <div className="Q_main kind_wrap">

                <div className='Q_area kind_slider'>
                    <ul className="Q_ul slider">
                        <Coo arr_chooser={arr_chooser} queze_length= {queze_length} setQueze_length={setQueze_length} con={con} props={props}></Coo>
                    </ul>
                    <button className='btn1' onClick={btn1_click}>
                        {/* <svg_ className="svg_"></svg_> */}
                        <Svg_   className="svg_"></Svg_>
                    </button>
                    <button className='btn2' onClick={btn2_click}>
                        <Svg_   className="svg_2"></Svg_>
                    </button>
                    
                </div>
            </div>
        </>

    );
}
export default Queze_box;