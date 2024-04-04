import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import Quezeshow_main_content from "../Quezeshow/Quezeshow_main_content";
import axios from "axios";
import Adfit from "../Adfit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Continue_speaking= () => {
    const [content_state,setContent_state] = useState([]);
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
    useEffect(()=>{

        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshow_main',
            method : 'GET',
            params : { 
                type : 'likes',
                quezeshow_type : "&& quezeshow_type = 'Continue_speak'"
            }
        }).then(res=>{
            console.log(res);
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
    },[])

    return(
        <div className="quezeshow_main_root">
            <Helmet>
                <title>{"이어말하기"}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content={"4세대 아이돌 이어말하기 애니 이어말하기 유튜버 이어말하기 중국음식 이어말하기 등 주어진 시간안에 주어진 단어를 이어말하는 게임입니다"}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"이어말하기"} />
                <meta property="og:site_name" content={"이어말하기"} />
                <meta property="og:description" content={"4세대 아이돌 이어말하기 애니 이어말하기 유튜버 이어말하기 중국음식 이어말하기 등 주어진 시간안에 주어진 단어를 이어말하는 게임입니다"} />

                <meta name="twitter:title" content={"이어말하기"} />
                <meta name="twitter:description" content={"4세대 아이돌 이어말하기 애니 이어말하기 유튜버 이어말하기 중국음식 이어말하기 등 주어진 시간안에 주어진 단어를 이어말하는 게임입니다"} />
            </Helmet>
            <Header></Header>
            <header className="Main2_a_queze_header">
                <button className="all_btn a_queze_header_btn" type="button" onClick={()=>navigate('/make_quezeshow?ty=Continue_speaking')}>문제 제작</button>
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
export default Continue_speaking;