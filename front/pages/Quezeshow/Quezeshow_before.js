// 퀴즈 들어가기전 댓글, 여러 정보 제공하는 화면
import React, { useEffect, useState, useRef } from "react";
import no_img from '@image/Img_folder/no_image.jpg';
import axios from "axios";
import Header from '@header/ayo_world_rank_header';
import Password_popup from "@password_popup/Password_popup";
import {chenge_textarea_height, getUsertype, isLogin, getUserId, getUserEmailKey, getQuezeshowComments} from '@functions/WorldRank';
import Quezeshow_comment from "@quezeshow/Quezeshow_comment";
import {Helmet} from "react-helmet-async";
import Declaration from "../../components/declaraion/Declaration"; 
import { customAxiosPost } from "@functions/Custom_axios/Custom_axios";
import { router } from "@functions/WorldRank";

const Quezeshow_before = () => {
    const [result_comment_state, setResult_comment_state] = useState([]);
    const [uuid,setUuid] = useState();
    const [quezeshow_type, setQuezeshow_type] = useState();
    const [img,setImg] = useState('');
    const [quezeshow_title, setQuezeshow_title] = useState('');
    const [explain_text,setExplain_text] = useState('');
    const [declaration,setDeclaration] = useState(false);
    const comment_input_ref = useRef();
    const comment_input_title_ref = useRef();
    const [popup_state, setPopup_state] = useState(false);
    const {roomnum} = useParams();

    const useEffectFunc = async ()=>{

        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshowtitle',
            method : 'GET',
            params : { 
                type : 'likes',
                roomnum : roomnum
            }
        }).then(res=>{
            setImg(img => res.data[0].img);
            setQuezeshow_title(quezeshow_title => res.data[0].title);
            setExplain_text(explain_text => res.data[0].explain_text);
            setUuid(uuid => res.data[0].uuid);
            setQuezeshow_type(quezeshow_type => res.data[0].quezeshow_type);
        })
        const comments = await getQuezeshowComments(roomnum);
        console.log('3',comments);
        setResult_comment_state( result_comment_state => comments);

    }
    useEffect( ()=>{useEffectFunc()},[]);

    const navi_to_quezeshow_queze = () => {
        router(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}`);
    }
    const upload_comment = (e) => {
        e.preventDefault();
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
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid    : uuid,
                    title   : comment_input_title_ref.current.value,
                    text    : comment_input_ref.current.value,
                    date    : timeString,
                    usertype: getUsertype(),
                },
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(async res=>{
                const comments = await getQuezeshowComments(roomnum);
                setResult_comment_state( result_comment_state => comments);
            })
        }
    }
    const password_checker = () => {
        if(isLogin()){
            customAxiosPost({
                url : '/check_queze_is_mine',
                data : {
                    uuid,
                    email : getUserEmailKey()
                }
            }).then(res=>{
                if(res.data == true){
                    navigate(`/makequezeshowmodify?uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}&roomnum=${roomnum}`,{state:{tinyint : true}});
                }else{
                    setPopup_state(popup_state => !popup_state);
                }
            })
        }else{
            setPopup_state(popup_state => !popup_state);
        }
    }
    const change_declaration = (e) => {
        setDeclaration(declaration => !declaration); 
    }
    return(
        <section className="Quezeshow_before_root">
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
            {
                declaration ? <Declaration change_declaration={change_declaration} roomnum={roomnum} uuid={uuid}/> : null
            }
            <Header></Header>
            <header className="Main2_a_queze_header">
                <button type="button" title="수정하기." className="all_btn a_queze_header_btn" onClick={password_checker}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="white"/>
                    <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="white" strokeLinecap="round"/>
                    </svg>
                    수정하기
                </button>
                <button type="button" title="신고하기." className="all_btn a_queze_header_btn" onClick={change_declaration}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.14939 7.8313C8.57654 5.92179 10.0064 4 12 4V4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14V14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.8313Z" stroke="white"/>
                    <circle cx="12" cy="19" r="2" stroke="white"/>
                    </svg>
                    신고하기
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
                    {
                        isLogin() ?
                        <input type="text" ref={comment_input_title_ref} readOnly value={getUserId()}></input>:
                        <input type="text" ref={comment_input_title_ref} placeholder="아이디 입력"></input>
                    }
                </div>  
                <div>
                    <textarea type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력" onChange={(e)=>{chenge_textarea_height(e)}}></textarea>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>
            
        {   
            result_comment_state.map((e,i)=>{
                return(
                    <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2} uuid3={e.uuid3} date={e.date} usertype={e.usertype}/>
                )
            })
            
        }
        </section>
    )
}
export default Quezeshow_before;