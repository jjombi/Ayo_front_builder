import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Header from "../../ayo_world_rank_header";
import '../../css.css';
import no_img from '../../Img_folder/no_image.jpg';
const Make_quezeshow_step1 = () => {
    const navigate = useNavigate();
    const click_func = (e) => {
        navigate('/make_quezeshow',{state : {'quezeshow_type' : e.target.id}});
    }

    return(
        <div className="Make_quezeshow_step1_root">
            <Header/>
            <section>
                <div id="vote" onClick={click_func} className="all_btn">
                    <img id="vote" src={no_img}></img>
                    <h1 id="vote">설문조사</h1>
                    <p id="vote">여러가지 선택지 중 하나를 선택해 사용자의 의견을 들을 수 있습니다.</p>
                </div>
                <div id="multiple" onClick={click_func} className="all_btn">
                    <img id="multiple" src={no_img}></img>
                    <h1 id="multiple">객관식 퀴즈</h1>
                    <p id="multiple">4개의 선택지 중 하나의 정답을 맞출 수 있습니다.</p>
                </div>
                <div id="descriptive" onClick={click_func} className="all_btn">
                    <img id="descriptive" src={no_img}></img>
                    <h1 id="descriptive">서술형 퀴즈</h1>
                    <p id="descriptive">정답을 입력해 맞출 수 있습니다.</p>
                </div>
            </section>
            <button>다음</button>
        </div>
    )
}
export default Make_quezeshow_step1;