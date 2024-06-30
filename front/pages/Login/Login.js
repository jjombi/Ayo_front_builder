import React, { useEffect, useRef } from "react";
import Header from '../ayo_world_rank_header';
import { customAxiosPost } from "../Custom_axios/Custom_axios";
import { useNavigate } from "react-router-dom";
import Adfit from "../Adfit";
const Login = () => {
    
    const navigate = useNavigate();

    const email_ref = useRef(null);
    const password1_ref = useRef(null);

    const submit = () => {
        customAxiosPost({
            url : '/login',
            data : {
                email : email_ref.current.value,
                password : password1_ref.current.value
            }
        }).then(res=>{
            if(res.data === 'email not exist'){
                alert('이메일이 존제하지 않습니다');
            }else if(res.data === 'password not same'){
                alert('비밀번호가 일치하지 않습니다');
            }else{
                window.localStorage.setItem('ay0-accessKey',res.data.accessToken);
                window.localStorage.setItem('ay0-refreshToken',res.data.refreshToken);
                window.localStorage.setItem('ay0-expiredAt',res.data.expiredAt);
                window.localStorage.setItem('ay0-user-id',res.data.userId);
                window.localStorage.setItem('ay0-user-email',res.data.userEmail);
                navigate('/');
            }
        })
    }

    return(
        <>
        <Header/>
        <section className="login_signup_root">
            <div className="login_signup_content_main">
                <aside className="login_signup_explain_main">
                    <h1>로그인</h1>
                    {/* <pre>
                        defaultasdf<br/>
                        로그인 장점, 비밀번호 없이 내 퀴즈 수정 가능, 
                        좋아요 누른 퀴즈 모아서 볼수 있음,

                    </pre> */}
                </aside>
                <section className="login_signup_input_main">
                    <div>
                        <p>이메일</p>
                        <input ref={email_ref} type="email" name="email" id="email"></input>
                    </div>
                    <div>
                        <p>비밀번호</p>
                        <input ref={password1_ref} name="password" id="password" type="password"></input>
                    </div>
                    <p className="all_btn" onClick={()=>{navigate('/signup')}}>회원가입 하러가기</p>
                    <button className="signup_submit_btn all_btn" type="button" onClick={submit}>다음</button>
                </section>
            </div>
            <footer>
                <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            </footer>
        </section>
        </>
    )
}
export default Login;