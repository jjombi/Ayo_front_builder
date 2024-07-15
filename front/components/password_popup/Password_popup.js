import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
import { router } from '@functions/WorldRank';
import { customAxiosPost } from '@functions/Custom_axios/Custom_axios';
const Password_popup = ({setPopup_state , uuid, roomnum, title, publicAccess, type, typeWhere, explain_text, quezeshow_type, queze_type}) => {
    const input_password_ref = useRef(window.localStorage.getItem(uuid));
    const router_ = useRouter();

    useEffect(()=>{
        const password = window.localStorage.getItem(uuid);
        if(password !== null) input_password_ref.current.value = window.localStorage.getItem(uuid);
    },[])

    const password_checker = () => {
        if(typeWhere === 'modify_password' && input_password_ref.current.value !== ''){
            if(localStorage.getItem(uuid) != null){
                router(router_,'/produce/modify',{uuid,title,explain_text,quezeshow_type,roomnum},{state:true});
            }
            else {
                customAxiosPost({
                    url : '/modify_quezeshowqueze_password_checker',
                    data : {
                        uuid : uuid,
                        password : input_password_ref.current.value
                    },
                }).then(res=>{
                    if(res.data === 'success'){
                        localStorage.setItem(uuid,input_password_ref.current.value);
                        router(router_,'/produce/modify',{uuid,title,explain_text,quezeshow_type,roomnum},{state:true});
                    }else{
                        alert('비번 불일치');
                    }
                })
            }
        }
        else{
            // axios({
            //     url : process.env.REACT_APP_SERVER_URL + '/password_checker',
            //     method : 'POST',
            //     data : {
            //         uuid : uuid,
            //         password : input_password_ref.current.value
            //     },
            //     headers : {
            //         'Content-Type' : 'application/json'
            //     }
            // }).then((res)=>{
            //     if(res.data){
            //         alert('성공');
            //         if(type === 'queze') router(router_,'/choosequezetype',{roomName,title,publicAccess});
            //         else if(type === 'result') router(router_,`/result?roomName=${roomName}&title=${title}`);
            //     }
            //     else{
            //         alert('비밀번호 불일치');
            //     }
            // })
        }
    }
    const change_popup_state = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <div className='password_popup_root' onClick={change_popup_state}>
            <section onClick={(e)=>e.stopPropagation()}>
                {/* <button onClick={change_popup_state} className='all_btn'>X</button> */}
                <p onClick={(e)=>e.stopPropagation()}>비밀번호</p>
                <input onClick={(e)=>e.stopPropagation()} type='password' ref={input_password_ref} placeholder='비밀번호를 입력해 주세요' autoFocus></input>
                <input  type='button' className='all_btn' onClick={(e)=>{e.stopPropagation();password_checker(e)}} value={'완료'}></input>
            </section>
            
        </div>
    )
}
export default Password_popup;