import {useCookies} from 'react-cookie';
import React from 'react';

const Header = () => {

    const logout = () => {
      localStorage.clear();
      window.location.href = '/';
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