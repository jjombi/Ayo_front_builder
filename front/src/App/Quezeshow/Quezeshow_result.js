import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Quezeshow_queze_content from "./Quezeshow_queze_content";
import Quezeshow_comment from "./Quezeshow_comment";
import Header from "../ayo_world_rank_header";
import Adfit from "../Adfit";   
const Quezeshow_result = () => {
    const [seachParams, setSearchParams] = useSearchParams();
    const roomnum = seachParams.get('roomnum');
    const uuid = seachParams.get('uuid'); //  space, queze
    const uuid2 = seachParams.get('uuid2');// queze, null
    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    const quezeshow_title = useRef('');
    const comment_input_ref = useRef();
    const allvalue = useRef(0);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(uuid,uuid2,roomnum);
        if(uuid2 !== null){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowtitle',
                method : 'GET',
                params : {
                    roomnum : roomnum,
                    uuid : uuid,
                }
            }).then(res=>{
                if(res.data.length !== 0){
                    quezeshow_title.current = res.data[0].title;
                }
            })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowqueze',
                method : 'GET',
                params : {
                    roomnum : roomnum,
                    uuid : uuid,
                }
                
            }).then(res=>{
                console.log('content',res);
                if(res.data.length === 0){
                    alert('나락 퀴즈쇼 없음');
                }else{
                    setContent_state( content_state => [...res.data]);
                    res.data.map((e,i)=>{
                        allvalue.current += e.value;
                    })
                }
            })
            console.log(roomnum,uuid2);
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
                method : 'GET',
                params : {
                    roomnum : roomnum,
                    uuid : uuid,
                    uuid2 : uuid2
                }
                
            }).then(res=>{
                console.log('comment',res);
                setComment_state( content_state => [...res.data]);
            })
        }
        else{
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
                console.log('content',res);
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
        }
    },[roomnum])
    const upload_comment = () => {
        // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
        console.log(uuid2);
        if(uuid2 !== null){
            console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid : uuid.current,
                    uuid2 : uuid2,
                    title : '없음',
                    text : comment_input_ref.current.value
                },
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>{
                console.log('comment upload rres',res);
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
                    method : 'GET',
                    params : {
                        roomnum : roomnum,
                        uuid : uuid.current,
                        uuid2 : uuid2,
                        text : comment_input_ref.current.value
                    }
                    
                }).then(res=>{
                    console.log('comment',res);
                    setComment_state( content_state => [...res.data]);
                    // return(
                    //   res.data
                    // )
                })
            })
        }
        else{
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
        }
      }
    const navi = () => {
        if(uuid2 !== null){
            navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=${uuid2}`);
        }else{
            navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=undefined`);
        }
    }
    return(
        <>
        <Header/>
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