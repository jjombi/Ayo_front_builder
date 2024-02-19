import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Header from "./ayo_world_rank_header";
import './css.css';
import Footer from "./Footer";
import Result_content from "./Result_content";
import Result_comment from "./Result_comment";
import Adfit from "./Adfit";
import Password_popup from "./Password_popup";

// import {great_icon} from './Img_folder/great_icon.svg';
const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const comment_input_ref = useRef();
    const roomName_ref = useRef();
    const title_ref = useRef();
    const [result_content_state,setResult_content_state] = useState([]);
    const [result_comment_state,setResult_comment_state] = useState([]);
    const navigate = useNavigate();
    const [popup_state,setPopup_state] = useState(false);
    // const [publicAccess,setPublicAccess] = useState(false);

    // const [boolean,setBoolean] = useState([]);
    useEffect(()=>{
        roomName_ref.current = searchParams.get('roomName');
        title_ref.current = searchParams.get('title');
        // const publicAccess_ = searchParams.get('publicAccess');

        axios({
            url : process.env.REACT_APP_SERVER_URL +'/main_result',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                roomName : roomName_ref.current
            }

        }).then(res=>{
            let setResult_content_state_ = [];
            console.log(res);
            res.data.map((e,i)=>{   
                setResult_content_state_[i] = {img : 'data:image/jpeg;base64,'+e.img, text : e.text, length : res.data.length}
                // console.log('result content state 만드는 중');
            })
            setResult_content_state([...setResult_content_state_]);
        })
        axios({
            url : process.env.REACT_APP_SERVER_URL+'/main_a_queze_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            // console.log('main_a_queze_comments res : ',res);
            let setResult_comment_state_ = [];
            res.data.map((e,i)=>{
                setResult_comment_state_[i] = {text : e.value, likes : e.likes, roomName : roomName_ref.current, uuid : e.parentsKey}
            })
            setResult_comment_state([...setResult_comment_state_]);
        })
        // setResult_content_state([{img : img, text : 'asdasdas'}]);
        // if(publicAccess_ === 1 || publicAccess_){
        //     setPublicAccess(true);
        // }
    },[])


    const upload_comment = (e) => {
        e.preventDefault();
        // console.log('댓글 달기 함수 ',e);
        axios({
            url : process.env.REACT_APP_SERVER_URL +'/main_a_queze_plus_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current,
                type : Number(comment_input_ref.current.id),//부모인지 자식인지
                value : comment_input_ref.current.value
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            // console.log(res);
            if(res.data == 'success') {
                // console.log('페이지 리로딩');
                location.reload();
            }
        })
    }
    const password_check = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <>  
            {
                popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={null} roomName={roomName_ref.current} title={title_ref.current} publicAccess={null} type={null} typeWhere={'modify_password'}/> : null
            }
            <Header></Header>
            <header className="Main2_a_queze_header">
                {/* <button title="이상형 월드컵 수정하기." className="all_btn a_queze_header_btn" onClick={()=>{ window.open(`http://localhost:8080/makeaquezemodify?roomName=${roomName_ref.current}&title=${title_ref.current}`, "_blank", "noopener, noreferrer");}}> */}
                <button title="이상형 월드컵 수정하기." className="all_btn a_queze_header_btn" onClick={password_check}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                    <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                    이상형 월드컵 수정 하기
                </button>
                
                {/*<h3>{title_ref.current}</h3>*/}
                {/* <h3>test title text</h3> */}
            </header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <h3 className="result_title">
                {title_ref.current}
            </h3>
            {
                //console.log('result_content_state',result_content_state)
                result_content_state.map((e,i)=>{
                    return (<Result_content key={i} text={e.text} img={e.img} rankNum={i} length={e.length}></Result_content>)
                })
            }

            <div className="comment_area">
                <div>
                    <input type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력"></input>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>
            {
                result_comment_state.map((e,i)=>{
                    return(<Result_comment key={i} text={e.text} likes={e.likes} roomName={e.roomName} uuid={e.uuid} ></Result_comment>)
                })
            }
            <Footer tinyint={false}></Footer>
        </>
    )
}
export default Result;