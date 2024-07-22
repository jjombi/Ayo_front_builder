import React, { useRef, useState } from "react";
import Header from '@header/ayo_world_rank_header';
import {customAxiosPost, customAxiosGet} from '@functions/Custom_axios/Custom_axios';
// import { useNavigate } from "react-router-dom";
import Adfit from "@components/Adfit";
import { router } from "@functions/WorldRank";
import { useRouter } from "next/router";
import Footer from "@components/footer/footer";
// import {ReactComponent as Check} from '../Img_folder/Check_ring_light.svg';
export default function Signup () {
    const router_ = useRouter();

    const [password_match, setPassword_match] = useState('');
    const [email_code_state, setEmail_code_state]= useState(false);
    const [email_done, setEmail_done] = useState(false);

    const email_code = useRef(null);
    const id_ref = useRef(null);
    const email_ref = useRef(null);
    const password1_ref = useRef(null);
    const password2_ref = useRef(null);
    const email_code_ref = useRef(null)

    const submit = () => {
        if(id_ref.current.value === ''){
            alert('아이디를 입력해 주세요');
        }
        else if(!email_done){
            alert('이메일을 인증해 주세요');
        }
        else if(password_match !== '비밀번호 일치'){
            alert('비밀번호가 일치하지 않거나 옮바른 형식이 아닙니다');
        }
        else{
            // console.log('submit');
            customAxiosPost({
                url : '/signup',
                data : {
                    id       : id_ref.current.value,
                    email    : email_ref.current.value,
                    password : password1_ref.current.value
                }
            }).then(res=>{
                // console.log('회원가입 완료',res);
            })
        }
    }

    const check_password_match_func = () => {
        const regex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\\d)(?=.*[~․!@#\$%^&*()_\\-+=|\\\\;:‘“<>,.?/]).{8,16}\$');
        if(!regex.test(password1_ref.current.value)){
            setPassword_match(password_match => '비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
        }else if(password1_ref.current.value.trim() !== password2_ref.current.value.trim()){
            setPassword_match(password_match => '비밀번호 불일치');
        }else if(password1_ref.current.value.trim() === password2_ref.current.value.trim()){
            setPassword_match(password_match => '비밀번호 일치');

        }
        else{
            alert('check_password_match_func err');
        }
    }

    const email_check = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if(!regex.test(email_ref.current.value)){
            alert('이메일 형식이 잘못 되었습니다');
        }else{
            setEmail_code_state(email_code_state => true);
            customAxiosGet({
                url : 'signup/email_ckeck',
                params : {
                    email : email_ref.current.value
                }
            }).then(res=>{
                // console.log('이메일 코드 : ',res);
                email_code.current = res.data;
            })
        }
    }

    const email_code_check = () => {
        if(email_code_ref.current.value === email_code.current){
            setEmail_done(email_done => true);
        }else{
            alert('코드가 일치하지 않습니다');
        }
    }
    return(
        <>
        <Header/>
        <section className="login_signup_root">
            <div className="login_signup_content_main">
                <aside className="login_signup_explain_main">
                    <h1>회원가입</h1>
                </aside>
                <section className="login_signup_input_main">
                    <div className="margin_top_50px">
                        <p>아이디</p>
                        <input ref={id_ref} type="text"></input>
                    </div>
                    <div>
                        <p>이메일</p>
                        <input ref={email_ref} type="email"></input>
                        <button type="button" className="all_btn" onClick={email_check}>확인</button>
                    </div>
                    {
                        email_code_state ?
                        <div>
                            <p>이메일 확인</p>
                            <input ref={email_code_ref} type="email"></input>
                            {
                                email_done ?
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="#00FF29"/>
                                <path d="M8 12L11 15L16 9" stroke="#00FF29"/>
                                </svg> :
                                <button type="button" className="all_btn" onClick={email_code_check}>완료</button>
                            }
                        </div>:
                        null
                    }
                    <div>
                        <p>비밀번호</p>
                        <input ref={password1_ref} onChange={check_password_match_func} type="password"></input>
                    </div>
                    <pre style={password_match === "비밀번호 일치" ? {color : '#10ff28'} : null}>{password_match}</pre>
                    <div className="last_margin">
                        <p>비밀번호 확인</p>
                        <input ref={password2_ref} onChange={check_password_match_func} type="password"></input>
                    </div>
                    <p className="all_btn" onClick={()=>{router(router_,'/login')}}>로그인 하러가기</p>
                    <button className="signup_submit_btn all_btn" type="button" onClick={submit}>다음</button>
                </section>
            </div>
        </section>
        <Footer position={'absolute'}></Footer>

        </>
    )
}
