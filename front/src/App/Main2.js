import React, { useEffect, useState,useRef } from "react";
import './css.css';
import axios from "axios";
import Header from "./ayo_world_rank_header";
import Footer from "./Footer";
import Main2_content from "./Main2_content";
import Adfit from "./Adfit";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Main2 = () => {
    const search_value_ref = useRef();
    const [main_content_state,setMain_content_state] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log('render');
    })
    useEffect(()=>{
        // const htmlTitle = document.querySelector("title");
        // htmlTitle.innerHTML = 'ayo, 최애 티어표 나의 최애 티어를 만들어보세요';
        axios({
            url          : process.env.REACT_APP_SERVER_URL + '/main_select_queze',
            method       : 'GET',
            headers      : {
                'Content-Type' : 'application/json'
            } 
        }).then((res)=>{
            console.log('메인 이미지 res : ',res.data);
            
            let content_arr = [];
            if(res.data){
                res.data.result.map((e,i)=>{
                    // console.log(e);
                    content_arr[i] = {roomName : e.roomName, existence : e.existence, title : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid, password : e.password, explain_text : e.explainText}
                })
    
            }
            // console.log('res',res.data);
            setMain_content_state([...content_arr]);
        })
        // setMain_content_state([{roomName : "A", existence : 1, title : '제목이요', src : img1, uuid : 'bhaglabiluaenfaen'}]);
    },[])

    const search_enter = (e) => {
        console.log('seach 중',search_value_ref.current.value,e.target.id);
        if(e.key === 'Enter'){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/search_queze',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    value : search_value_ref.current.value
                }
            }).then((res)=>{
                // console.log(res);
                let content_arr = [];
                if(res.data){
                    res.data.result.map((e,i)=>{
                        // console.log(e);
                        content_arr[i] = {roomName : e.roomName, existence : e.existence, title : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid, password : e.password}
                    })
                }
                setMain_content_state([...content_arr]);
            })
        }
    }
    const search_btn_enter = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/search_queze',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                value : search_value_ref.current.value
            }
        }).then((res)=>{
            // console.log(res);
            let content_arr = [];
            if(res.data){
                res.data.result.map((e,i)=>{
                    // console.log(e);
                    content_arr[i] = {roomName : e.roomName, existence : e.existence, title : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid, password : e.password}
                })
            }
            setMain_content_state([...content_arr]);
        })
    }
    return(
        <div className="Main2_root">
            <Header></Header>
            <Helmet>
                <title>이상형 월드컵</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content=""></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="이상형 월드컵" />
                <meta property="og:site_name" content="이상형 월드컵" />
                <meta property="og:description" content="이상형월드컵을 토너먼드로 진행하거나 티어 나누기로 진행할 수 있습니다" />

                <meta name="twitter:title" content={'이상형 월드컵'} />
                <meta name="twitter:description" content="이상형월드컵을 토너먼드로 진행하거나 티어 나누기로 진행할 수 있습니다" />
            </Helmet>
            <header className="Main2_a_queze_header">
                <button className="all_btn a_queze_header_btn" title="" onClick={()=>{navigate('/ayoworldrankmakequeze')}}>이상형 월드컵 만들기</button>
            </header>
            <header className="Main2_header2">
                <h1>이상형 월드컵, 내 최애 순위를 선택해 보세요!</h1>
            </header>
            <header className="Main2_header2">
                <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
                <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6" stroke="#222222"/>
                    <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                </button>
            </header>
            {/* <article>
                <p></p>
            </article> */}
            {/* <input type="toggle"></input> */}
            {/* <header>
                <button className="Main2_toogle all_btn">좋아요순</button>
                <button className="Main2_toogle all_btn">최신순</button>
                <input type="text"></input>
            </header> */}
            <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
            <div className="queze_list">
                {
                    main_content_state.map((e,i)=>{
                        return(
                            <Main2_content key={i} title={e.title} roomName={e.roomName} existence={e.existence} src={e.src} uuid={e.uuid} password={e.password} explain_text={e.explain_text}></Main2_content>
                        )
                    })
                }
            </div>
            <Footer tinyint={false}/> 
        </div>
    )
}
export default Main2;