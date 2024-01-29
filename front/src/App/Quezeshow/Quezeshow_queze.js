import React, { useEffect, useRef, useState } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Quezeshow_queze_content from "./Quezeshow_queze_content";
import Quezeshow_comment from "./Quezeshow_comment";
import Adfit from "../Adfit";
import Shar_content from "./Shar_content";
const Quezeshow_queze= () => {
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
    const roomnum = seachParams.get('roomnum');
    const space_uuid = seachParams.get('uuid');
    const uuid2 = seachParams.get('uuid2');
    // const type = seachParams.get('type');
    const quezeshow_title = useRef('');
    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    const [submit_state, setSubmit_state] = useState(false);
    const [submit_object_state, setSubmit_object_state] = useState({img : 'data:image/jpeg;base64,', title : '', text : ''})
    const [clicked, setClicked] = useState(null);
    const uuid = useRef('');
    const [shar_state, setShar_state] = useState(false);
    const comment_input_ref = useRef();
    const search_value_ref = useRef();
    const [shar_content_state, setShar_content_state] = useState([]);
    useEffect(()=>{ // 오른쪽이동 무한, 투표후 결과창에서 새로고침시 투표화면으로 되돌아감.
        // console.log('utl : ',window.location.href);
        console.log(roomnum,space_uuid,uuid2);
        if(uuid2 != 'undefined'){
            console.log('uuid2 !== null');
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowtitle',
                method : 'GET',
                params : {
                    roomnum : roomnum,
                    uuid : space_uuid,
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
                    uuid : space_uuid,

                }
                
            }).then(res=>{
                console.log('content',res);
                if(res.data.length === 0){
                    alert('마지막 입니다');
                    navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}&uuid=${space_uuid}&uuid2=${uuid2}`);
                }else{
                    setContent_state( content_state => [...res.data]);
                    uuid.current = res.data[0].uuid;
                }
            })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
                method : 'GET',
                params : {
                    roomnum : roomnum,
                    uuid : space_uuid,
                    uuid2 : uuid2
                }
                
            }).then(res=>{
                console.log('comment',res);
                setComment_state( content_state => [...res.data]);
            })
        }
        else{
            console.log('uuid2 === null');
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
                    // alert('마지막 입니다');
                    // navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}`);
                }else{
                    setContent_state( content_state => [...res.data]);
                    uuid.current = res.data[0].uuid;
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
    const l_btn_click = () => {
        if(uuid2 != 'undefined'){
            if(Number(roomnum) > 1){
                navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}&uuid=${space_uuid}&uuid2=${uuid2}`);
            }
            else{
                // alert('처음입니다');
            }
        }
        else{
            if(Number(roomnum) > 1){
                navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}`);
            }
            else{
                // alert('처음입니다');
            }
        }
    }
    const r_btn_click = () => {
        if(uuid2 != 'undefined'){
            if(Number(roomnum) !== 100){ // 마지막에 오른쪽으로 못 가게 수정 필요 1 20 12 40
                navigate(`/quezeshow_queze?roomnum=${Number(roomnum)+1}&uuid=${space_uuid}&uuid2=${uuid2}`);
            }
            else{
                //맨 오른쪽 까지 옴
            }
        }
        else{
            if(Number(roomnum) !== 100){ // 마지막에 오른쪽으로 못 가게 수정 필요 1 20 12 40
                navigate(`/quezeshow_queze?roomnum=${Number(roomnum)+1}`);
            }
            else{
                //맨 오른쪽 까지 옴
            }
        }
    }
    const submit_click = () => {
        // console.log('submit clicked');
        if(clicked !== null){
            console.log(content_state[clicked].uuid3);
            if(uuid2 != 'undefined'){ // space
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowqueze_plus_value',
                    method : 'POST',
                    data : {
                        uuid : content_state[clicked].uuid3
                    }
                    
                }).then(res=>{
                    // console.log(res);
                    
                })
                setSubmit_state(submit_state => !submit_state);
                const obj = {img : 'data:image/jpeg;base64,'+content_state[clicked].img , title : content_state[clicked].title, text : content_state[clicked].text};
                setSubmit_object_state(submit_object_state => obj);
            }
            else{
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze_plus_value',
                    method : 'POST',
                    data : {
                        uuid2 : content_state[clicked].uuid2,
                    }
                    
                }).then(res=>{
                    // console.log(res);
                    
                })
                setSubmit_state(submit_state => !submit_state);
                const obj = {img : 'data:image/jpeg;base64,'+content_state[clicked].img , title : content_state[clicked].title, text : content_state[clicked].text};
                setSubmit_object_state(submit_object_state => obj);
            }
        }
    }
    
    const navi_to_quezeshowresult = () => {
        if(uuid2 != 'undefined'){
            navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${space_uuid}&uuid2=${uuid2}`);
        }
        else{
            navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid.current}`);
        }
    }
    const upload_comment = () => {
        // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
        console.log(uuid2);
        if(uuid2 != 'undefined'){
            console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid : uuid.current,
                    uuid2 : uuid2,
                    title : content_state[clicked].title,
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
                        uuid : space_uuid,
                        uuid2 : uuid2,
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
                    title : content_state[clicked].title,
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
    const shar = () => {
        setShar_state(shar_state => !shar_state);
    }
    const search_enter = (e) => {
        console.log('seach 중',search_value_ref.current.value,e.target.id);
        if(e.key === 'Enter'){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/shar_quezeshow',
                method : 'GET',
                params : {
                    value : search_value_ref.current.value
                }
            }).then((res)=>{
                console.log(res);
                if(res.data !== false){
                    setShar_content_state(shar_content_state => [...res.data]);
                }
            })
        }
    }
    const search_btn_enter = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/shar_quezeshow',
            method : 'GET',
            params : {
                value : search_value_ref.current.value
            }
        }).then((res)=>{
            console.log(res);
            if(res.data !== false){
                setShar_content_state(shar_content_state => [...res.data]);
            }        
        })
    }
    return(
        <div className="quezeshow_queze_root">
            <Header></Header>
            {/* {
                shar_state ? 
                <section className="shar_popup_section">
                    <section>
                        <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
                        <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="6" stroke="#222222"/>
                            <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                            </svg>
                        </button>
                        {
                            shar_content_state.map((e,i)=>{
                                console.log('shar content' ,e);
                                return(
                                    <Shar_content uuid={e.uuid} title={e.title}></Shar_content>
                                )
                            })
                        }
                    </section>
                </section> : null
            } */}
            {/* {
                uuid2 === 'undefined'?
                <header className="Main2_a_queze_header">
                    <button className="all_btn a_queze_header_btn" title="" onClick={shar}>스페이스에 현재 나락퀴즈 공유하기</button>
                </header>
                : null
            } */}
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <h1>{quezeshow_title.current}</h1>
            {
                submit_state
                ?   
                <>
                    <section className="quezeshow_after_submit_root">
                        <div className="quezeshow_after_submit_submited_object">
                            {
                                submit_object_state.img === 'data:image/jpeg;base64,' ? null : <img src={submit_object_state.img}></img>
                            }
                            <p className="quezeshow_after_submit_submited_object_title">{submit_object_state.title}</p>
                            <p className="quezeshow_after_submit_submited_object_text">{submit_object_state.text}</p>
                        </div>
                        <div className="comment_area quezeshow_after_submi_comment_area">
                            <div>
                                <input type="text" ref={comment_input_ref} id={1} placeholder={`${submit_object_state.title}을/를 선택한 이유`}></input>
                                <button onClick={upload_comment} className="all_btn" >^</button>
                            </div>
                        </div>
                        
                    </section>
                    <section className="quezeshow_after_submit_comment_root">
                    {
                        comment_state.map((e,i)=>{
                            // console.log('comment',e);
                            return(
                            <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2} uuid3={e.uuid3}/>
                            )
                        })
                    }
                        <div className="main2_a_queze_btn_area">
                            <button onClick={()=>{setSubmit_state(submit_state => !submit_state);}}>다시하기</button>
                            <button onClick={navi_to_quezeshowresult}>결과 보기</button>
                        </div>
                    </section>
                    
                    {/* <section className="quezeshow_after_submit_root">
                        
                    </section> */}
                </>
                    
                : 
                <>
                    <div className="queze_list">
                    {
                        content_state.map((e,i)=>{
                            return(
                                <Quezeshow_queze_content key={i} index={i} img={'data:image/jpeg;base64,'+e.img} text={e.text} title={e.title} uuid={e.uuid} clicked={clicked} setClicked={setClicked} uuid2={e.uuid2} value={null}/>
                            )
                        })
                    }
                    </div>
                    {/* <button className="quezeshow_queze_submitbtn" onClick={submit_click}>완료</button>
                    <button className="quezeshow_queze_submitbtn" onClick={navi_to_quezeshowresult}>결과 보기</button> */}
                    <div className="main2_a_queze_btn_area">
                        <button onClick={submit_click}>완료</button>
                        <button onClick={navi_to_quezeshowresult}>결과 보기</button>
                    </div>
                </> 
            }
            
            <button className="quezeshow_queze_leftbtn all_btn" onClick={l_btn_click}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M7 1L1 7L7 13" stroke="#222222"/>
                </svg>
            </button>
            <button className="quezeshow_queze_rightbtn all_btn" onClick={r_btn_click}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="#222222"/>
                </svg>
            </button>
        </div>
    )

}
export default Quezeshow_queze;