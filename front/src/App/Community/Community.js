import React, { useEffect, useRef, useState } from "react";
import Headers from "../ayo_world_rank_header";
import '../css.css';
import axios from "axios";
const Community = () => {
    const comment_input_ref = useRef();
    const [comment_state, setComment_state] = useState([]);

    useEffect(()=>{
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/',
            method : "GET",
        }).then((res)=>{ // 10개씩 끊어서 줌
            setComment_state(...res.data);
        })
    },[])

    const upload_comment = () => {

    }
    return(
        <div className="community_root">
            <Headers></Headers>
            <h1>개발자 또는 사용자에게 전할 말을 작성해 주세요</h1>

            <div className="comment_area">
                <div>
                    <input type="text" ref={comment_input_ref} id={1} placeholder="의견"></input>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>

            {
                comment_state.map((e,i)=>{

                })
            }

        </div>
    )
}

export default  Community;