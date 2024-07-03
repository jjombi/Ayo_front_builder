import React from "react";
// import { useNavigate } from "react-router-dom";
import Header from '@header/ayo_world_rank_header';
import { Helmet } from "react-helmet-async";
import Adfit from "@components/Adfit";
import { router } from "@functions/WorldRank";
const Guide_main = () => {
    // const navigate = useNavigate();
    
    return(
        <section className="Guide_main_root">
            <Header></Header>
            <button className="all_btn" onClick={()=>{router('/guide?type=1')}}>
                <p>퀴즈쇼 제작 방법</p>
                <p>2024/03/11</p>
            </button>
            <footer>
                <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            </footer>
        </section>
    )
}
export default Guide_main;
