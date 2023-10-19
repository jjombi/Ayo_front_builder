import {useCookies} from 'react-cookie';
import React,{useRef} from 'react';
import { useLocation,useSearchParams,useNavigate } from 'react-router-dom';

const Header = () => {
  const roomNameRef = useRef();
  const school_name = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  roomNameRef.current = searchParams.get('roomName');
  school_name.current = searchParams.get('school_name');

  const go_to_queze = () =>{
    navigate(`/queze?roomName=${roomNameRef.current}&school_name=${school_name.current}`)
  }
  const go_to_make_queze = () => {
    navigate(`/makequeze?roomName=${roomNameRef.current}&school_name=${school_name.current}`)
  }
  const change_school = () => {
    navigate('/');
  }
    return(
        <header>

          <div className='header_rogo'><p>Ayo</p></div>
          <div>
            <input type='button' onClick={change_school} className='header_btn ' value="학교바꾸기"></input>
            <input type='button' onClick={go_to_make_queze} className='header_btn ' value="질문 만들기"></input>
            <input type='button' onClick={go_to_queze} className='header_btn ' value="투표하기"></input>
          </div>
          
        </header>
    )
}
export default Header;