import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Quezeshow_queze_content from "./Quezeshow_queze_content";
import Quezeshow_comment from "./Quezeshow_comment";
import Header from "../ayo_world_rank_header";

const Quezeshow_result = () => {
    const [seachParams, setSearchParams] = useSearchParams();
    const roomnum = seachParams.get('roomnum');
    const uuid = seachParams.get('uuid');
    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    const quezeshow_title = useRef('');
    const comment_input_ref = useRef();
    const allvalue = useRef(0);
    const navigate = useNavigate();
    useEffect(()=>{
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowtitle',
            method : 'GET',
            params : {roomnum : roomnum}
        }).then(res=>{
            if(res.data.length !== 0){
                quezeshow_title.current = res.data[0].title;
            }
        })
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze',
            method : 'GET',
            params : {roomnum : roomnum}
            
        }).then(res=>{
            // console.log('content',res);
            if(res.data.length === 0){
                alert('나락 퀴즈쇼 없음');
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
    },[roomnum])
    const upload_comment = () => {
        // console.log('roomnum',roomnum,'uuid',uuid,'comment_input_ref',comment_input_ref.current.value);
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
            method : 'POST',
            data : {
                roomnum : Number(roomnum),
                uuid : uuid,
                title : '',
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
    }
    return(
        <>
        <Header/>
        <div className="quezeshow_result_root">
            <section className="content">
            {
                content_state.map((e,i)=>{
                    return(
                        <Quezeshow_queze_content key={i} index={i} img={'data:image/jpeg;base64,'+e.img} text={e.text} title={e.title} uuid={e.uuid} clicked={''} setClicked={''} uuid2={e.uuid2} value={Math.floor(e.value / allvalue.current * 100)}/>
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
                        <Quezeshow_comment title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2}/>
                        )
                    })
                }
                <div className="main2_a_queze_btn_area">
                    <button onClick={()=>{navigate(`/quezeshow_queze?roomnum=${roomnum}`);}}>퀴즈쇼 참여하기</button>
                    {/* <button >결과 보기</button> */}
                </div>
            </section>
        </div>
        </>
    )
}
export default Quezeshow_result;