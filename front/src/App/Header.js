import {useCookies} from 'react-cookie';
import React from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';

const Header = () => {

    const [cookie, setCookie, removeCookie] = useCookies();

    const logout = () => {
      
        console.log('쿠키 비우기',localStorage.getItem('kakao_411c89c5f5668a0cf386f9730723ec89'));
        removeCookie('ayo_cookie',{path: '/', domain: 'localhost'});
        localStorage.clear();
        window.location.href = "/";
        // if(cookie.kakao_login_access_token !== null){// access_token에 값이 있으면(카카오 로그인 되있는 상태)
        //     const access_token = cookie.kakao_login_access_token;
        //     console.log('카카오 로그아웃');
        //     removeCookie('kakao_login_access_token',{path: '/', domain: 'localhost'});
        //     window.location.href = 'https://kauth.kakao.com/oauth/logout?client_id=06a99c89dcf41c4f83132512d600f00d&logout_redirect_uri=http://localhost:8080';
        // }
      }

    return(
        <header>

          <div className='header_rogo'><p>Ayo</p></div>
          <div>
            <input type='button' onClick={logout} className='header_btn ' value="로그아웃"></input>
            <input type='button' onClick={()=>window.location.href = 'makequeze'} className='header_btn ' value="질문 만들기"></input>
            <input type='button' onClick={()=>window.location.href = 'queze'} className='header_btn ' value="투표하기"></input>
          </div>
          
        </header>
    )
}
export default Header;