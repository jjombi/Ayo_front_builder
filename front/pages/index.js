import React, { useEffect, useState, useRef } from "react";
import Header from "@header/ayo_world_rank_header";
import Quezeshow_main_content from "@quezeshow/Quezeshow_main_content";
import Adfit from "@components/Adfit";
import {search_axios, router} from '@functions/WorldRank';
import {useRouter} from "next/router";
import Head from "next/head";
// const Header = dynamic(() => import('@header/ayo_world_rank_header'), { ssr: false })

export async function getStaticProps(context) {

    const type = 0;//인기순
    const res = await search_axios(type,null,null,null);

    return {
      props: {
        data : res.data,
      },
    };
}

const Quezeshow_main= ({data}) => {

    const router_ = useRouter();
    const search_value_ref = useRef(null);
    
    const change_queze_likes = (index,value) => {
        // i dont know how can i do
        // const content_state_ = content_state;
        // content_state_[index].likes_queze = value;
        // setContent_state(content_state => [...content_state_]);
    }
    const search_enter = (e) => {
        if(e.key === 'Enter'){
            router(router_,`/search`,{tag:search_value_ref.current.value});
        }
    }
    const search_btn_enter = () => {
        router(router_,`/search`,{tag:search_value_ref.current.value});
    }
    const change_search_type_btn = (e) => {
        router(router_,'/search',{ty:0});
    }
    return(
        <div className="quezeshow_main_root">
            <Header suppressHydrationWarning></Header>
                <header className="Main2_a_queze_header quezeshow_main_header">
                    <input type="button" className="search_type_btn all_btn" value={'인기순'} onClick={change_search_type_btn}></input>
                    <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
                    <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="6" stroke="#222222"/>
                        <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                        </svg>
                    </button>
                </header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit> 
            <div className="queze_list">
                {
                    data.map((e,i)=>{
                        // console.log('e',e);
                        return(
                            <Quezeshow_main_content key={i} index={i} src={'data:image/jpeg;base64,'+e.img} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text} likes_queze={e.likes_queze} change_queze_likes={change_queze_likes}></Quezeshow_main_content>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default Quezeshow_main;
