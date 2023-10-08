import React,{useState, useRef} from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";

const MakeQueze = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const [controller, setController] = useState(false);
    const input_value = useRef();
    const [swich_btn_controller,setSwich_btn_controller] = useState(false); 
    const datalist = useRef([true,false,false]);
    const token = localStorage.getItem('token');
    const [chooser_translate_state,chooser_setTranslate_state] = useState(0);
    const type = useRef();

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
    const switch_ = (e)=>{
        console.log('e.value : ',e.value);
        if(e.value == 0){
            datalist.current[0] = true;
        }
        else if(e.value == 1){
            datalist.current[0] = true;
            datalist.current[1] = true;
        }
        else if(e.value == 2){
            datalist.current[0] = true;
            datalist.current[1] = true;
            datalist.current[2] = true;
        }
        console.log('datalist : ',datalist.current);
    }
    return(
        <div className='content_area'>
            <input type='text' onClick={login_checker}  ref={input_value} className='makequeze_input Border_radius' placeholder='질문을 입력하세요'></input>
            <p className='guid_message'>범위 선택</p>
            
            <div className='Q_chooser2 Border_radius' title = "문제 범위를 설정할 수 있습니다">

                공개 범위 선택
                <select className='Border_radius' onChange={(e)=>{switch_(e.target)}}>
                    <option value={0}>학교 공개</option>
                    <option value={1}>학급 공개</option>
                    <option value={2}>반 공개</option>
                </select>
            </div>
            <input type='button' onClick={makeQueze} value="질문 만들기" className='Submit_btn Submit_btn_'></input>
            
        </div>
    );
}
export default MakeQueze