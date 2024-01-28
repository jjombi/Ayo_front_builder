import React, {useEffect, useRef, useState} from "react";
import Header from "../ayo_world_rank_header";
import '../css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Space_content from "./Space_content";
import Adfit from "../Adfit";
const Space = () => {
    const search_value_ref = useRef();
    const navigate = useNavigate();
    const [content_state, setContent_state] = useState([]);
    useEffect(()=>{
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/space',
            method : 'GET',
            params : {
                type : 'uuid'
            }
        }).then((res)=>{
            console.log(res);
            setContent_state(content_state => [...res.data]);
        })
    },[])

    const search_enter = (e) => {
        console.log('seach 중',search_value_ref.current.value,e.target.id);
        if(e.key === 'Enter'){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/search_space',
                method : 'GET',
                params : {
                    value : search_value_ref.current.value
                }
            }).then((res)=>{
                console.log(res);
                if(res.data !== false){
                    setContent_state(content_state => [...res.data]);
                }
            })
        }
    }
    const search_btn_enter = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/search_space',
            method : 'GET',
            params : {
                value : search_value_ref.current.value
            }
        }).then((res)=>{
            console.log(res);
            if(res.data !== false){
                setContent_state(content_state => [...res.data]);
            }        
        })
    }
    return(
    <>
        <Header></Header>
        <header className="Main2_a_queze_header">
            <button className="all_btn a_queze_header_btn" title="" onClick={()=>{navigate('/space')}}>스페이스</button>
            <button className="all_btn a_queze_header_btn" title="" onClick={()=>{navigate('/make_space')}}>스페이스 만들기</button>
            <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
            <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6" stroke="#222222"/>
                <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                </svg>
            </button>
        </header>
        <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
        {/* <h1 className="space_explain_text">스페이스는 특정 주제로 모인 사람들의 모임 입니다</h1> */}
        <section className="queze_list">
        {
            content_state.map((e,i)=>{
                return(
                    <Space_content key={i} src={'data:image/jpeg;base64,'+e.img} title={e.title} uuid={e.uuid} intro_text={e.intro_text}/>
                )
            })
        }       
        </section>
    
    </>
    )
}

export default Space;