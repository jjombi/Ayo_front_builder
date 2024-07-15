import React, { useState } from "react";
import Header from "@header/ayo_world_rank_header";
import descript  from '@image/Make_quezeshow_step1/description_queze.png';
import multiple  from '@image/Make_quezeshow_step1/multiple_queze.png';
import vote  from '@image/Make_quezeshow_step1/vote_queze.png';
import ox from '@image/Make_quezeshow_step1/ox.png';
import Adfit from "@components/Adfit";
import { router } from "@functions/WorldRank";
import Image from "next/image";
import { useRouter } from "next/router";

const Make_quezeshow_step1 = () => {

    const router_ = useRouter();
    const click_func = (e) => {
        router(router_,`/produce/${e.target.id}`);
    }

    return(
        <div className="Make_quezeshow_step1_root">
            <Header/>
                    
            <section>
                <div id="vote" onClick={click_func} className="all_btn">
                    <Image width={320} id="vote" src={vote}></Image>
                    <h1 id="vote">설문조사</h1>
                    <p id="vote">여러가지 선택지 중 하나를 선택해 사용자의 의견을 들을 수 있습니다.</p>
                </div>
                <div id="multiple" onClick={click_func} className="all_btn">
                    <Image width={320} id="multiple" src={multiple}></Image>
                    <h1 id="multiple">객관식 퀴즈</h1>
                    <p id="multiple">선택지 중 하나의 정답을 맞출 수 있습니다.</p>
                </div>
                <div id="descriptive" onClick={click_func} className="all_btn">
                    <Image width={320} id="descriptive" src={descript}></Image>
                    <h1 id="descriptive">서술형 퀴즈</h1>
                    <p id="descriptive">정답을 입력해 맞출 수 있습니다.</p>
                </div>
                <div id="ox" onClick={click_func} className="all_btn">
                    <Image width={320} id="ox" src={ox}></Image>
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