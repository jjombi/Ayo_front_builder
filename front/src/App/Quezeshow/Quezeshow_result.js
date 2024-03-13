import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Quezeshow_queze_content from "./Quezeshow_queze_content";
import Quezeshow_comment from "./Quezeshow_comment";
import Header from "../ayo_world_rank_header";
import Adfit from "../Adfit";   
import Password_popup from "../Password_popup";
const Quezeshow_result = () => {
    const [seachParams, setSearchParams] = useSearchParams();
    const roomnum = seachParams.get('roomnum');
    const uuid = seachParams.get('uuid'); //  space, queze
    // const uuid2 = seachParams.get('uuid2');// queze, null
    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    const quezeshow_title = useRef('');
    const quezeshow_explain_text = useRef('');
    const comment_input_ref = useRef();
    const allvalue = useRef(0);
    const [popup_state, setPopup_state] = useState(false);
    const [quezeshow_type, setQuezeshow_type] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log(uuid,uuid2,roomnum);
        // if(uuid2 !== null){
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowtitle',
        //         method : 'GET',
        //         params : {
        //             roomnum : roomnum,
        //             uuid : uuid,
        //         }
        //     }).then(res=>{
        //         if(res.data.length !== 0){
        //             quezeshow_title.current = res.data[0].title;
        //         }
        //     })
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowqueze',
        //         method : 'GET',
        //         params : {
        //             roomnum : roomnum,
        //             uuid : uuid,
        //         }
                
        //     }).then(res=>{
        //         console.log('content',res);
        //         if(res.data.length === 0){
        //             alert(' 퀴즈쇼 없음');
        //         }else{
        //             setContent_state( content_state => [...res.data]);
        //             res.data.map((e,i)=>{
        //                 allvalue.current += e.value;
        //             })
        //         }
        //     })
        //     console.log(roomnum,uuid2);
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
        //         method : 'GET',
        //         params : {
        //             roomnum : roomnum,
        //             uuid : uuid,
        //             uuid2 : uuid2
        //         }
                
        //     }).then(res=>{
        //         console.log('comment',res);
        //         setComment_state( content_state => [...res.data]);
        //     })
        // }
        // else{
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowtitle',
                method : 'GET',
                params : {roomnum : roomnum}
            }).then(res=>{
                // console.log('select * from quezeshowqueze',res);
                if(res.data.length !== 0){
                    quezeshow_title.current = res.data[0].title;
                    quezeshow_explain_text.current = res.data[0].explainText;
                    setQuezeshow_type(quezeshow_type => res.data[0].quezeshow_type);
                }
            })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze',
                method : 'GET',
                params : {roomnum : roomnum}
                
            }).then(res=>{
                console.log('content',res);
                if(res.data.length === 0){
                    alert('퀴즈쇼 없음');
                }else{
                    setContent_state( content_state => [...res.data]);
                    res.data.map((e,i)=>{
                        allvalue.current += e.value;
                    })
                }
            })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                method : 'GET',
                params : {roomnum : roomnum}
                
            }).then(res=>{
                // console.log('comment',res);
                setComment_state( content_state => [...res.data]);
            })
        // }
    },[roomnum])
    const upload_comment = () => {
        // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
        // console.log(uuid2);
        // if(uuid2 !== null){
        //     console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
        //         method : 'POST',
        //         data : {
        //             roomnum : roomnum,
        //             uuid : uuid.current,
        //             uuid2 : uuid2,
        //             title : '없음',
        //             text : comment_input_ref.current.value
        //         },
        //         headers : {
        //             'Content-Type' : 'application/json'
        //         }
        //     }).then(res=>{
        //         console.log('comment upload rres',res);
        //         axios({
        //             url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
        //             method : 'GET',
        //             params : {
        //                 roomnum : roomnum,
        //                 uuid : uuid.current,
        //                 uuid2 : uuid2,
        //                 text : comment_input_ref.current.value
        //             }
                    
        //         }).then(res=>{
        //             console.log('comment',res);
        //             setComment_state( content_state => [...res.data]);
        //             // return(
        //             //   res.data
        //             // )
        //         })
        //     })
        // }
        // else{
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid : uuid.current,
                    title : '없음',
                    text : comment_input_ref.current.value
                },
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>{
                // console.log('comment upload rres',res);
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                    method : 'GET',
                    params : {roomnum : roomnum}
                    
                }).then(res=>{
                    // console.log('comment',res);
                    setComment_state( content_state => [...res.data]);
                })
            })
        // }
      }
    const navi = () => {
        // if(uuid2 !== null){
        //     navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=${uuid2}`);
        // }else{
            navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=undefined`);
        // }
    }
    const password_checker = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <>
        {
            popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomName={''} title={quezeshow_title.current} publicAccess={null} type={null} typeWhere={'modify_password'} explain_text={quezeshow_explain_text.current} quezeshow_type={quezeshow_type}/> : null
        }
        <Header/>
        <header className="Main2_a_queze_header">
            {/* <button title="이상형 월드컵 수정하기." className="all_btn a_queze_header_btn" onClick={()=>{ window.open(`http://localhost:8080/makeaquezemodify?roomName=${roomName_ref.current}&title=${title_ref.current}`, "_blank", "noopener, noreferrer");}}> */}
            <button title="퀴즈쇼 수정하기." className="all_btn a_queze_header_btn" onClick={password_checker}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" strokeLinecap="round"/>
                </svg>
                퀴즈쇼 수정하기
            </button>
            
            {/*<h3>{title_ref.current}</h3>*/}
            {/* <h3>test title text</h3> */}
        </header>
        <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
        <div className="quezeshow_result_root">
            <section className="content">
            {
                content_state.map((e,i)=>{
                    return(
                        <Quezeshow_queze_content key={i} index={i} img={'data:image/jpeg;base64,'+e.img} text={e.text} title={e.title} uuid={e.uuid} clicked={''} setClicked={''} uuid2={e.uuid2} value={isNaN(Math.floor(e.value / allvalue.current * 100)) ? 0 : Math.floor(e.value / allvalue.current * 100)}/>
                    )
                })
            }
            </section>
            <section className="comment">
                <div className="comment_area">
                    <div>
                        <input type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력"></input>
                        <button onClick={upload_comment} className="all_btn" >^</button>
                    </div>
                </div>
                {
                    comment_state.map((e,i)=>{
                        // console.log('comment',e);
                        return(
                        <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2} uuid3={e.uuid3}/>
                        )
                    })
                }
                <div className="main2_a_queze_btn_area">
                    <button onClick={navi}>퀴즈쇼 참여하기</button>
                    {/* <button >결과 보기</button> */}
                </div>
            </section>
        </div>
        </>
    )
}
export default Quezeshow_result;