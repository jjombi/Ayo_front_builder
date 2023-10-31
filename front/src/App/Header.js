import {useCookies} from 'react-cookie';
import React,{forwardRef, useEffect, useRef} from 'react';
import { useLocation,useSearchParams,useNavigate } from 'react-router-dom';

const Header = forwardRef((props,ref)=>{
  const roomNameRef = useRef();
  const school_name = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  roomNameRef.current = searchParams.get('roomName');
  school_name.current = searchParams.get('school_name');

  useEffect(()=>{
    console.log('Header Ref : ',ref);
  })

  const go_to_queze = () =>{
    // navigate(`/queze?roomName=${roomNameRef.current}&school_name=${school_name.current}`)
    ref[2].current.scrollIntoView()
  }
  const go_to_make_queze = () => {
    // navigate(`/makequeze?roomName=${roomNameRef.current}&school_name=${school_name.current}`)
    ref[1].current.scrollIntoView()

  }
  const change_school = () => {
    // navigate(`/School_choose?roomName=${roomNameRef.current}&school_name=${school_name.current}`);
    console.log(props,ref);
    ref[0].current.scrollIntoView()
  }
    return(
      <header>

        <div className='header_rogo' onClick={()=>navigate(`/?roomName=${roomNameRef.current}&school_name=${school_name.current}`)}><p>Ayo</p></div>
        <div>
          <input type='button' onMouseDown={(e) => {e.preventDefault()}} onClick={change_school} className='header_btn ' value="학교바꾸기"></input>
          <input type='button' onMouseDown={(e) => {e.preventDefault()}} onClick={go_to_make_queze} className='header_btn ' value="학교 질문 만들기"></input>
          <input type='button' onMouseDown={(e) => {e.preventDefault()}} onClick={go_to_queze} className='header_btn ' value="학교 질문 보기"></input>
        </div>
      {/* <div className='line'></div> */}
      </header>
    )
})
export default Header;