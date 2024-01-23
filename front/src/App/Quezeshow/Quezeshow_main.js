import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import Quezeshow_main_content from "./Quezeshow_main_content";
import axios from "axios";
import Adfit from "../Adfit";
const Quezeshow_main= () => {
    const [content_state,setContent_state] = useState([]);
    useEffect(()=>{
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerHTML = '나락퀴즈쇼 당신도 나락에 갈수 있다';
        axios({// parma으로 최신순, 좋아요순 변경
            url : process.env.REACT_APP_SERVER_URL + '/quezeshow_main',
            method : 'GET',
            params : {
                type : 'likes'
            }
        }).then(res=>{ //res = [{src, uuid, title}]
            // console.log(res);
            const content_state_ = res.data.map((e,i)=>{
                return({
                    src : 'data:image/jpeg;base64,'+e.img,
                    uuid : e.uuid,
                    title : e.title,
                    likes : e.likes,
                    roomnum : e.roomnum
                })
            })
            setContent_state(content_state => [...content_state_]);
        })
    },[])

    return(
        <div className="quezeshow_main_root">
            <Header></Header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <div className="queze_list">
                {
                    content_state.map((e,i)=>{
                        return(
                            <Quezeshow_main_content key={i} index={i} src={e.src} uuid={e.uuid} title={e.title} roomnum={e.roomnum}></Quezeshow_main_content>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default Quezeshow_main;