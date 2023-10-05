import React,{useState, useRef} from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";

const MakeQueze = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const [controller, setController] = useState(false);
    const input_value = useRef();
    const [swich_btn_controller,setSwich_btn_controller] = useState(false); 
    const datalist = useRef([false,false,false]);
    const token = localStorage.getItem('token');
    const [chooser_translate_state,chooser_setTranslate_state] = useState(0);


    const login_checker = () => {
        cookie.ayo_user_id !== undefined ? setController(true) : setController(false)
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

        makeQueze();
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
        <div className='content_area'>
            <input type='text' onClick={login_checker}  ref={input_value} className='submit_btn' placeholder='이름 입력'></input>
            <p className='guid_message'>범위 선택</p>
            {/* <input className="submit_btn" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={0} value="학교"></input>
            <input className="submit_btn" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={1} value="학급"></input>
            <input className="submit_btn" type="button" onClick={(e)=>{switch_btn(e.target)}} style={{}} name={2} value="반"></input> */}
            <div className='Q_chooser Border_radius Top'>
                    <ul className="Q_chooser_ul">
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={0} >학교 전체</li>
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={1} >학급 전체</li>
                        <li className='Q_chooser_li'  style={{transform : `translateX(${chooser_translate_state}%)`}} onClick={(e)=>{switch_btn(e.target)}}  title={2} >우리 반 전체</li>
                    </ul>
                    <button className='btn1' onClick={chooser_r_btn}></button>
                    <button className='btn2' onClick={chooser_l_btn}></button>
                    
                </div>
            <input type='button' onClick={makeQueze} value="질문 만들기" className='submit_btn'></input>
            
        </div>
    );
}
export default MakeQueze