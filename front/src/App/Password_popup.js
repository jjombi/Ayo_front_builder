import axios from 'axios';
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';

const Password_popup = ({setPopup_state , uuid, roomName, title, publicAccess, type}) => {
    const input_password_ref = useRef();
    const navigate = useNavigate();

    const password_checker = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/password_checker',
            method : 'POST',
            data : {
                uuid : uuid,
                password : input_password_ref.current.value
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            if(res.data){
                alert('성공');
                if(type === 'queze') navigate(`/choosequezetype?roomName=${roomName}&title=${title}&publicAccess=${publicAccess}`);
                else if(type === 'result') navigate(`/result?roomName=${roomName}&title=${title}`);
            }
            else{
                alert('비밀번호 불일치');
            }
        })
    }
    const change_popup_state = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <div className='password_popup_root'>
            <section>
                <button onClick={change_popup_state} className='all_btn'>X</button>
                <p>비밀번호</p>
                <input type='password' ref={input_password_ref} placeholder='비밀번호를 입력해 주세요'></input>
                <input type='button' className='all_btn' onClick={password_checker} value={'완료'}></input>
            </section>
            
        </div>
    )
}
export default Password_popup;