import React, { useEffect, useState, useRef } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import Quezeshow_main_content from "../Quezeshow/Quezeshow_main_content";
import axios from "axios";
import Adfit from "../Adfit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Machugi= () => {
    const [content_state,setContent_state] = useState([]);
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
    useEffect(()=>{

        axios({
            url : process.env.REACT_APP_SERVER_URL + '/quezeshow_main',
            method : 'GET',
            params : { 
                type : 'likes',
                quezeshow_type : "&& quezeshow_type = 'queze' || quezeshow_type = 'text'"
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
            <Header></Header>
            <Helmet>
                <title>{"재미있는 문제와 퀴즈를 맞춰보세요"}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content={"재미있는 문제와 퀴즈를 맞춰보세요 로그인 없이 문제를 만들고 풀어볼수 있습니다"}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"재미있는 문제와 퀴즈를 맞춰보세요"} />
                <meta property="og:site_name" content={"재미있는 문제와 퀴즈를 맞춰보세요"} />
                <meta property="og:description" content={"재미있는 문제와 퀴즈를 맞춰보세요 로그인 없이 문제를 만들고 풀어볼수 있습니다"} />

                <meta name="twitter:title" content={"재미있는 문제와 퀴즈를 맞춰보세요"} />
                <meta name="twitter:description" content={"재미있는 문제와 퀴즈를 맞춰보세요 로그인 없이 문제를 만들고 풀어볼수 있습니다"} />
            </Helmet>
            <header className="Main2_a_queze_header">
                <button className="all_btn a_queze_header_btn" type="button" onClick={()=>navigate('/make_quezeshow?ty=quezeshow')}>문제 제작</button>
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
export default Machugi;