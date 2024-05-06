import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import Quezeshow_main_content from "./Quezeshow_main_content";
import axios from "axios";
import Adfit from "../Adfit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Quezeshow_main= ({match}) => {
    const [content_state,setContent_state] = useState([]);
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
    const search_value_ref = useRef(null);
    // const space_uuid = seachParams.get('space_uuid');
    // const space_title = seachParams.get('space_title');
    const intro_text = seachParams.get('intro_text');
    useEffect(()=>{
        // const htmlTitle = document.querySelector("title");
        // htmlTitle.innerHTML = '나락퀴즈쇼 당신도 나락에 갈수 있다';
        // console.log('useeffect',space_uuid);
        axios({// parma으로 최신순, 좋아요순 변경
            url : process.env.REACT_APP_SERVER_URL + '/quezeshow_main',
            method : 'GET',
            params : { 
                type : 'likes',
                quezeshow_type : "&& quezeshow_type = 'vote'"
                // space_uuid : space_uuid,
            }
        }).then(res=>{ //res = [{src, uuid, title}]
            // console.log(res);
            const content_state_ = res.data.map((e,i)=>{
                return({
                    src : 'data:image/jpeg;base64,'+e.img,
                    uuid : e.uuid, //    space  queze
                    // uuid2 : e.uuid2, //  queze  null
                    title : e.title,
                    likes : e.likes,
                    roomnum : e.roomnum,
                    quezeshow_type : e.quezeshow_type,
                    explain_text : e.explain_text
                })
            })
            setContent_state(content_state => [...content_state_]);
        })
    },[])
    const search_axios = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/search_quezeshow',
            method : 'GET',
            params : {
                value : search_value_ref.current.value
            }
            // headers : {
            //     'Content-Type' : 'application/json'
            // },
            // data : {
            //     value : search_value_ref.current.value
            // }
        }).then((res)=>{
            // console.log(res);
            const content_state_ = res.data.map((e,i)=>{
                return({
                    src : 'data:image/jpeg;base64,'+e.img,
                    uuid : e.uuid,
                    title : e.title,
                    likes : e.likes,
                    roomnum : e.roomnum,
                    quezeshow_type : e.quezeshow_type,
                    explain_text : e.explain_text
                })
            })
            setContent_state(content_state => [...content_state_]);
        })
    }
    const search_enter = (e) => {
        // console.log('seach 중',search_value_ref.current.value,e.target.id);
        if(e.key === 'Enter'){
            search_axios();
        }
    }
    const search_btn_enter = () => {
        search_axios();
    }
    return(
        <div className="quezeshow_main_root">
            <Helmet>
                <title>{"예능 게임 퀴즈쇼"}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade"/>
                <meta name="description" content={"예능 게임 퀴즈쇼! 나락퀴즈쇼 아이돌퀴즈쇼 애니퀴즈쇼 상식퀴즈쇼 인물퀴즈쇼 등 웃기고 재미있는 퀴즈쇼를 만나보세요"}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"예능 게임 퀴즈쇼"} />
                <meta property="og:site_name" content={"예능 게임 퀴즈쇼"} />
                <meta property="og:description" content={"나락퀴즈쇼 아이돌퀴즈쇼 애니퀴즈쇼 상식퀴즈쇼 정치퀴즈쇼 등 웃기고 재미있는 퀴즈쇼를 만나보세요"} />

                <meta name="twitter:title" content={"예능 게임 퀴즈쇼"} />
                <meta name="twitter:description" content={"나락퀴즈쇼 아이돌퀴즈쇼 애니퀴즈쇼 상식퀴즈쇼 정치퀴즈쇼 등 웃기고 재미있는 퀴즈쇼를 만나보세요"} />
            </Helmet>
            <Header></Header>
                <header className="Main2_a_queze_header">
                    <button className="all_btn a_queze_header_btn" type="button" onClick={()=>navigate('/produce')}>퀴즈쇼 제작</button>
                    <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
                    <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="6" stroke="#222222"/>
                        <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                        </svg>
                    </button>
                </header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <div className="queze_list">
                {
                    content_state.map((e,i)=>{
                        return(
                            <Quezeshow_main_content key={i} index={i} src={e.src} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text}></Quezeshow_main_content>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default Quezeshow_main;