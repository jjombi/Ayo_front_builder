import React,{useState, useRef,useEffect} from "react";
import axios from 'axios'
import { useNavigate,useParams,useSearchParams } from "react-router-dom";
import Adfit from "./Adfit";
import Svg_bug from '/src/App/Img_folder/Bug_light.svg';


const MakeQueze = () => {
    const url_ = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';
    const input_value = useRef();
    const input_maker_ref = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const school_name = useRef();
    
    useEffect(()=> {
        school_name.current = searchParams.get('school_name');
        console.log('params id ; ',school_name.current);
        if(school_name.current === 'null'){
            alert('학교를 다시 선택해 주세요');
            navigate('/');
        }
        else{
            alert(`school Name : ${school_name.current}`);
        }
    },[])

    

    const makeQueze = () => {
        alert(`make queze start`);
        axios({
            //url     : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/create_queze',
            // url     : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/create_queze`,
            url     : '10.80.163.67:45509/create_queze',
            method  : 'POST',
            headers : {

                'Content-Type' : 'application/json'

            },
            data    : {
                queze          : input_value.current.value,
                school         : `${school_name.current}`,
                date           : Math.floor(Date.now() / 86400000),
                maker          : `${input_maker_ref.current.value}`
            }
        }).then((res)=>{
            console.log('질문 올림',res);
            navigate(`/A_queze?roomName=${res.data}&school_name=${school_name.current}`);
        })
        console.log(Math.floor(Date.now() / 86400000));
        
    }

    return(
        <>
            <div className='content_area'>
                <input type='text'   ref={input_value} className='makequeze_input Border_radius' placeholder='질문을 입력하세요'></input>
                <input type='button' onClick={makeQueze} value="질문 만들기" className='Submit_btn Submit_btn_'></input>
                <input className="Input_basic Border_radius" ref={input_maker_ref} type="text" placeholder="작성자 소개"></input>
            </div>
            {/* <div className='bug' title='버그 제보'>
                <Svg_bug/>
            </div> */}
            <a href="mailto:dlworjs6@dgsw.hs.kr?subject=버그 제보" className='bug' title='버그 제보'>
                <Svg_bug/>
            </a>
            <Adfit unit="DAN-pyEL8l54ynx8GrIr"></Adfit>
        </>
    );
}
export default MakeQueze