import React, { useRef } from "react";
import Header from '@header/ayo_world_rank_header';
// import Adfit from "../../components/Adfit";
import { router } from "@functions/WorldRank";
import { submit } from "@functions/login/Login";
import { useRouter } from "next/router";
const Login = () => {
    const router_ = useRouter();
    const email_ref = useRef(null);
    const password1_ref = useRef(null);


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
                    <p className="all_btn" onClick={()=>{router(router_,'/signup')}}>회원가입 하러가기</p>
                    <button className="signup_submit_btn all_btn" type="button" onClick={()=>{submit(email_ref.current.value,password1_ref.current.value,router_)}}>다음</button>
                </section>
            </div>
            <footer>
                {/* <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit> */}
            </footer>
        </section>
        </>
    )
}
export default Login;
