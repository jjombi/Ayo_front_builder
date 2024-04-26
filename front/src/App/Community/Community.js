import React, { useEffect, useRef, useState } from "react";
import Headers from "../ayo_world_rank_header";
import '../css.css';
import axios from "axios";
import Community_content from "./Community_content";
import { Helmet } from "react-helmet-async";
const Community = () => {
    const comment_input_ref = useRef();
    const [community_content_state, setCommunity_content_state] = useState([]);

    useEffect(()=>{
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/community',
            method : "GET",
            params : {
                type : 'likes'
            }
        }).then((res)=>{ // 20개씩 끊어서 줌
            console.log(res);
            setCommunity_content_state(community_content_state => res.data);
        })
    },[])

    const upload_comment = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/community_plus',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                text : comment_input_ref.current.value,
                date : Date.now()
            }
        }).then(res=>{
            console.log(res);
        })
    }
    const chenge_comment_area_height = (e) => {
        comment_input_ref.current.style.height = 'auto'; //height 초기화
        comment_input_ref.current.style.height = comment_input_ref.current.scrollHeight + 'px';
    }
    return(
        <div className="community_root">
            <Helmet>
                <title>{"개발자에게 제안하기"}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content={"개발자에게 제안하거나 사용자와 소통할 수 있습니다"}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"개발자에게 제안하기"} />
                <meta property="og:site_name" content={"개발자에게 제안하기"} />
                <meta property="og:description" content={"개발자에게 제안하거나 사용자와 소통할 수 있습니다"} />

                <meta name="twitter:title" content={"개발자에게 제안하기"} />
                <meta name="twitter:description" content={"개발자에게 제안하거나 사용자와 소통할 수 있습니다"} />
            </Helmet>
            <Headers></Headers>
            <h1>
                개발자에게 전할 말을 작성해 주세요,<br/>
                빠른 시일 내에 공지사항을 통해 답변해 드립니다
            </h1>

            <div className="comment_area">
                <div className="quezeshow_result_div">
                    <textarea type="text" ref={comment_input_ref} id={1} placeholder="의견" onChange={chenge_comment_area_height}></textarea>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>

            {   
                community_content_state !== undefined ?
                community_content_state.map((e,i)=>{
                    return(
                        <Community_content uuid={e.uuid} text={e.text} date={e.uuid} likes={e.likes}></Community_content>
                    )
                }) :
                null
            }

        </div>
    )
}

export default  Community;