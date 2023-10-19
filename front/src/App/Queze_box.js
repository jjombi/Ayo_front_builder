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
        axios({
            // url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
            url : 'http://localhost:45509/queze_type',
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                school : `${school_name_params.current}`,
                // type : props.props.type.current,
                // token  : token
            }
        }).then((res)=>{
            console.log(res.data);
            queze_value.current = res.data.map(e => e.value);
            props.setQueze_length(res.data.length -1);
            props.props.roomNameRef.current = res.data.map(e=>{return(e.roomName)});
            console.log('roomNameRef in quezeBoc in Coo : ',props.props.roomNameRef.current,'ㅁㄴㅇ',queze_value.current,'sd',props.arr_chooser.current,queze_value.current[0]);
            setRender(render + 1);
        })

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
    useEffect(()=>{
        school_name_params.current = searchParams.get('school_name');
    },[])
    

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
        }   
            
    }


    return(
        <>            
            <div className="Q_main kind_wrap">

                <div className='Q_area kind_slider'>
                    <ul className="Q_ul slider">
                        <Coo arr_chooser={arr_chooser} queze_length= {queze_length} setQueze_length={setQueze_length} con={con} props={props}></Coo>
                    </ul>
                    <button className='btn1' onClick={btn1_click}>
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