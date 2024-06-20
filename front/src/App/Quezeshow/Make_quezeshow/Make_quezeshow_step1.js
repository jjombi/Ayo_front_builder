import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Header from "../../ayo_world_rank_header";
import '../../css.css';
import no_img from '../../Img_folder/no_image.jpg';
import descript  from '../../Img_folder/Make_quezeshow_step1/description_queze.png';
import multiple  from '../../Img_folder/Make_quezeshow_step1/multiple_queze.png';
import vote  from '../../Img_folder/Make_quezeshow_step1/vote_queze.png';
import Adfit from "../../Adfit";
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
                    <img id="vote" src={vote}></img>
                    <h1 id="vote">설문조사</h1>
                    <p id="vote">여러가지 선택지 중 하나를 선택해 사용자의 의견을 들을 수 있습니다.</p>
                </div>
                <div id="multiple" onClick={click_func} className="all_btn">
                    <img id="multiple" src={multiple}></img>
                    <h1 id="multiple">객관식 퀴즈</h1>
                    <p id="multiple">선택지 중 하나의 정답을 맞출 수 있습니다.</p>
                </div>
                <div id="descriptive" onClick={click_func} className="all_btn">
                    <img id="descriptive" src={descript}></img>
                    <h1 id="descriptive">서술형 퀴즈</h1>
                    <p id="descriptive">정답을 입력해 맞출 수 있습니다.</p>
                </div>
                <div id="ox" onClick={click_func} className="all_btn">
                    <img id="ox" src={no_img}></img>
                    <h1 id="ox">O,X 퀴즈</h1>
                    <p id="ox">O,X중 하나를 선택하여 정답을 맞출수 있습니다.</p>
                </div>
            </section>
            <footer>
                <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            </footer>
            {/* <button>다음</button> */}
        </div>
    )
}
export default Make_quezeshow_step1;