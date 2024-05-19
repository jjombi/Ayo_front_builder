import axios from 'axios';
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';

const Password_popup = ({setPopup_state , uuid, roomnum, title, publicAccess, type, typeWhere, explain_text, quezeshow_type, queze_type}) => {
    const input_password_ref = useRef();
    const navigate = useNavigate();

    const password_checker = () => {
        if(typeWhere === 'modify_password'){
            // if(roomnum === ''){ // 나락퀴즈쇼 수정
            if(localStorage.getItem(uuid) != null){
                navigate(`/makequezeshowmodify?uuid=${uuid}&title=${title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}&roomnum=${roomnum}`,{state:{tinyint : true}});
            }
            else {
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/modify_quezeshowqueze_password_checker',
                    method : 'POST',
                    data : {
                        uuid : uuid,
                        password : input_password_ref.current.value
                    },
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then(res=>{
                    // console.log(res);
                    if(res.data === 'success'){
                        // alert('비번 일치 성공');
                        // console.log('queze_type, quezeshow_type in password check',queze_type, quezeshow_type);
                        // if(Number(queze_type) === 1 ||Number(queze_type) === 0){
                        //     navigate(`/makequezeshowmodify?uuid=${uuid}&title=${title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}&queze_type=${queze_type}`,{state:{tinyint : true}});
                        // }else {
                            localStorage.setItem(uuid,input_password_ref.current.value);
                            navigate(`/makequezeshowmodify?uuid=${uuid}&title=${title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}&roomnum=${roomnum}`,{state:{tinyint : true}});
                        // }
                    }else{
                        alert('비번 불일치');
                    }
                })
            }
        //     }else{
        //         axios({
        //             url : process.env.REACT_APP_SERVER_URL + '/modify_password_checker',
        //             method : 'POST',
        //             data : {
        //                 roomName : roomName,
        //                 password : input_password_ref.current.value
        //             },
        //             headers : {
        //                 'Content-Type' : 'application/json'
        //             }
        //         }).then(res=>{
        //             console.log(res);
        //             if(res.data === 'success'){
        //                 navigate(`/makeaquezemodify?roomName=${roomName}&title=${title}&explain_text=${explain_text}`,{state:{tinyint : true}});
        //             }else{
        //                 alert('비번 불일치');
        //             }
        //         })
        //     }
        }
        else{
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
    }
    const change_popup_state = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <div className='password_popup_root'>
            <section>
                <button onClick={change_popup_state} className='all_btn'>X</button>
                <p>비밀번호</p>
                <input type='password' ref={input_password_ref} placeholder='비밀번호를 입력해 주세요' autoFocus></input>
                <input type='button' className='all_btn' onClick={password_checker} value={'완료'}></input>
            </section>
            
        </div>
    )
}
export default Password_popup;