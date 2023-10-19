import React,{useState, useRef,useEffect} from "react";
import axios from 'axios'
import { useNavigate,useParams,useSearchParams } from "react-router-dom";
import Adfit from "./adfit";

const MakeQueze = () => {

    const input_value = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const school_name = useRef();
    
    useEffect(()=> {
        school_name.current = searchParams.get('school_name');
        console.log('params id ; ',school_name.current);
    },[])

    

    const makeQueze = () => {
        axios({
            //url     : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/create_queze',
            url     : 'http://localhost:45509/create_queze',
            method  : 'POST',
            headers : {

                'Content-Type' : 'application/json'

            },
            data    : {
                queze          : input_value.current.value,
                school         : `${school_name.current}`,
            }
        }).then((res)=>{
            console.log('질문 올림',res);
            navigate(`/A_queze?roomName=${res.data}&school_name=${school_name.current}`);
        })
    }

    return(
        <div className='content_area'>
            <input type='text'   ref={input_value} className='makequeze_input Border_radius' placeholder='질문을 입력하세요'></input>
            <input type='button' onClick={makeQueze} value="질문 만들기" className='Submit_btn Submit_btn_'></input>
            <Adfit unit="DAN-pyEL8l54ynx8GrIr"></Adfit>
        </div>
    );
}
export default MakeQueze