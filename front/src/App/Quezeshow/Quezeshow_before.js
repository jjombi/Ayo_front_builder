// 퀴즈 들어가기전 댓글, 여러 정보 제공하는 화면
import React, { useEffect, useState, useRef } from "react";
import Result_comment from "../Result_comment";
import '../css.css'
import { useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";
import no_img from '../Img_folder/no_image.jpg';
import axios from "axios";
import Header from '../ayo_world_rank_header';
import Password_popup from "../Password_popup";
import {chenge_textarea_height} from '../public/WorldRank';
import Quezeshow_comment from "./Quezeshow_comment";
import {Helmet} from "react-helmet-async";
const Quezeshow_before = () => {
    const [result_comment_state, setResult_comment_state] = useState([]);
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const [uuid,setUuid] = useState();
    const [quezeshow_type, setQuezeshow_type] = useState();
    const [img,setImg] = useState('');
    const [quezeshow_title, setQuezeshow_title] = useState('');
    const [explain_text,setExplain_text] = useState('');
    const comment_input_ref = useRef();
    const comment_input_title_ref = useRef();
    const [popup_state, setPopup_state] = useState(false);
    const {roomnum} = useParams();
    const canvas_ref = useRef();
    useEffect(()=>{
        // const { param } = match;
        console.log('params',roomnum);
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowtitle',
            method : 'GET',
            params : { 
                type : 'likes',
                roomnum : roomnum
            }
        }).then(res=>{
            console.log(res);
            // if(res.data[0].img !== ''){
            //     const base64img = 'data:image/jpeg;base64,'+res.data[0].img;
            //     const binary = window.atob(base64img.split(',')[1]);
            //     const arraybuffer = new ArrayBuffer(binary.length);
            //     let bytes = new Uint8Array(arraybuffer);
            //     for(let i=0;i < binary.length; i++){
            //         bytes[i] = binary.charCodeAt(i);
            //     }
            //     const blob = new Blob([arraybuffer], { type: 'image/jpeg' });
            //     const url = window.URL.createObjectURL(blob);
            //     console.log(url);
                setImg(img => res.data[0].img);
            // }
            setQuezeshow_title(quezeshow_title => res.data[0].title);
            setExplain_text(explain_text => res.data[0].explain_text);
            setUuid(uuid => res.data[0].uuid);
            setQuezeshow_type(quezeshow_type => res.data[0].quezeshow_type);
        })
        // axios({
        //     url : process.env.REACT_APP_SERVER_URL+'/quezeshowcomment',
        //     method : 'get',
        //     params : {
        //         roomnum : roomnum
        //     }
        // }).then((res)=>{
        //     // console.log('main_a_queze_comments res : ',res);
        //     // let setResult_comment_state_ = [];
        //     const setResult_comment_state_ = res.data.map((e,i)=>{
        //         return {title : e.title, text : e.text, likes : e.likes, roomnum : roomnum, uuid : e.uuid, uuid2 : e.uuid2}
        //     })
        //     setResult_comment_state(result_comment_state => [...setResult_comment_state_]);
        // })
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
            method : 'GET',
            params : {roomnum : roomnum}
            
        }).then(res=>{
            // console.log('comment',res);
            setResult_comment_state( result_comment_state => [...res.data]);
        })
    },[])
    // console.log(roomnum,uuid,quezeshow_type,quezeshow_title,explain_text);
    const navi_to_quezeshow_queze = () => {
        console.log('navi',quezeshow_type);
        // if(quezeshow_type === 'Continue_speak'){
            navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}`);
        // }else if(quezeshow_type === 'New_word_queze'){
        //     navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}`);
        // }else if(quezeshow_type === 'queze'){
        //     navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}`);
        // }else if(quezeshow_type === 'vote'){
        //     navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}`);
        // }
    }
    const upload_comment = (e) => {
        e.preventDefault();
        // console.log('댓글 달기 함수 ',e);
        // axios({
        //     url : process.env.REACT_APP_SERVER_URL +'/main_a_queze_plus_comments',
        //     method : 'POST',
        //     data : {
        //         roomName : roomnum,
        //         type : Number(comment_input_ref.current.id),//부모인지 자식인지
        //         value : comment_input_ref.current.value
        //     },
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     }
        // }).then(res=>{
        //     // console.log(res);
        //     if(res.data == 'success') {
        //         // console.log('페이지 리로딩');
        //         // location.reload();
        //         const result_comment_state_ = {
        //             title    : 'title',//fix----------
        //             text     : comment_input_ref.current.value,
        //             likes    : 0,
        //             roomnum  : roomnum,
        //             uuid     : uuid,
        //             uuid2    : 'uuid2',//fix---------------

        //         }
        //         setResult_comment_state(result_comment_state => [result_comment_state_,...result_comment_state])
        //     }
        // })
        if(comment_input_title_ref.current.value === '' || comment_input_ref.current.value === ''){
            alert('아이디와 댓글 모두 입력해 주세요');
        }else{
            const today = new Date();

            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const seconds = ('0' + today.getSeconds()).slice(-2); 

            const timeString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            console.log(timeString);
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid    : uuid,
                    title   : comment_input_title_ref.current.value,
                    text    : comment_input_ref.current.value,
                    date    : timeString
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
                    setResult_comment_state( result_comment_state => [...res.data]);
                })
            })
        }
    }
    const password_checker = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        <section className="Quezeshow_before_root">
            <canvas ref={canvas_ref}></canvas>
            <Helmet>
                <title>{quezeshow_title}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content={explain_text}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={quezeshow_title} />
                <meta property="og:site_name" content={quezeshow_title} />
                <meta property="og:description" content={explain_text} />

                <meta name="twitter:title" content={quezeshow_title} />
                <meta name="twitter:description" content={explain_text} />
            </Helmet>
            {
                popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomnum={roomnum} title={quezeshow_title} publicAccess={null} type={null} typeWhere={'modify_password'} quezeshow_type={quezeshow_type}/> : null// queze_type={queze_type}
            }
            <Header></Header>
            <header className="Main2_a_queze_header">
                <button type="button" title="수정하기." className="all_btn a_queze_header_btn" onClick={password_checker}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                    <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                    수정하기
                </button>

            </header>
            <section className="Quezeshow_before_main">
                <img src={img === '' ? no_img : img}></img>
                <h1>{quezeshow_title}</h1>
                <p>{explain_text}</p>
                <button className="Quezeshow_before_start_btn" onClick={navi_to_quezeshow_queze}>시작하기</button>
            </section>
            <div className="comment_area">
                <div>
                    <input type="text" ref={comment_input_title_ref} placeholder="아이디 입력"></input>
                </div>  
                <div>
                    <textarea type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력" onChange={(e)=>{chenge_textarea_height(e)}}></textarea>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>
            
        {
            // result_comment_state.map((e,i)=>{
            //     return(<Result_comment key={i} text={e.text} likes={e.likes} roomName={e.roomName} uuid={e.uuid} ></Result_comment>)
            // })
            
            result_comment_state.map((e,i)=>{
                // console.log('comment',e);
                return(
                <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2} uuid3={e.uuid3} date={e.date}/>
                )
            })
            
        }
        </section>
    )
}
export default Quezeshow_before;