import React from "react";
import '../css.css'
import { useNavigate } from "react-router-dom";
import Header from '../ayo_world_rank_header';
const Guide_main = () => {
    const navigate = useNavigate();
    return(
        <section className="Guide_main_root">
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