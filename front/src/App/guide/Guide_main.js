import React from "react";
import '../css.css'
import { useNavigate } from "react-router-dom";
import Header from '../ayo_world_rank_header';
import { Helmet } from "react-helmet-async";
const Guide_main = () => {
    const navigate = useNavigate();
    return(
        <section className="Guide_main_root">
            <Helmet>
                <title>{"사이트 가이드 및 공지사항"}</title>
                <meta charset="UTF-8"/>
                <meta name="title" content="adjhbdlgbleln"/>
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="description" content={"ayo 사이트에 대한 가이드와 공지사항를 안내 받을 수 있습니다"}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"사이트 가이드 및 공지사항"} />
                <meta property="og:site_name" content={"사이트 가이드 및 공지사항"} />
                <meta property="og:description" content={"ayo 사이트에 대한 가이드와 공지사항를 안내 받을 수 있습니다"} />

                <meta name="twitter:title" content={"사이트 가이드 및 공지사항"} />
                <meta name="twitter:description" content={"ayo 사이트에 대한 가이드와 공지사항를 안내 받을 수 있습니다"} />
            </Helmet>
            <Header></Header>
            <button className="all_btn" onClick={()=>{navigate('/guide?type=1')}}>
                <p>퀴즈쇼 제작 방법</p>
                <p>2024/03/11</p>
            </button>
            {/* <button>
                <p>퀴즈쇼 제작 방법</p>
                <p>2024/03/11</p>
            </button>
            <button>
                <p>퀴즈쇼 제작 방법</p>
                <p>2024/03/11</p>
            </button>             */}
        </section>
    )
}
export default Guide_main;