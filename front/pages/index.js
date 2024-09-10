import React, { useEffect, useState, useRef } from "react";
import Header from "@header/ayo_world_rank_header";
import Quezeshow_main_content from "@quezeshow/Quezeshow_main_content";
import Adfit from "@components/Adfit";
import {search_axios, search_axios_public, router, isLogin, getUserEmailKey} from '@functions/WorldRank';
import {useRouter} from "next/router";
import useSWR from "swr";
import { customAxiosGet } from "@functions/Custom_axios/Custom_axios";
import { SWRConfig } from "swr";
// const Header = dynamic(() => import('@header/ayo_world_rank_header'), { ssr: false })

export async function getStaticProps() {

    const type = 0;//인기순
    const res = await search_axios(type,null,null,null);
    return {
      props: {
        fallback: {
            '/search_quezeshow': res.data
        }
      },
    };
}
const fetcher = async (url) => {
    const res = isLogin() ? await customAxiosGet({url,params:{type:0,user_email:getUserEmailKey()}}) : await customAxiosGet({url,parmas:{type:0}});
    return res.data;
}
 
const Queze_contnet = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR( '/search_quezeshow', fetcher,{
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    console.log('queze content reload',data);
    const change_queze_likes = (index,value) => {
        //미완성
    }
    return <div className="queze_list">
    {   
        isLoading ?
        <p className="loading_message">
        Loading...
        </p> :
        data.map((e,i)=>{
            console.log(e);
            return(
                <Quezeshow_main_content key={i} index={i} src={'data:image/jpeg;base64,'+e.img} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text} likes_queze={e.likes_queze} change_queze_likes={change_queze_likes}></Quezeshow_main_content>
            )
        })
    }
    </div>
  }
const Quezeshow_main= ({/*data_p*/fallback }) => {

    const router_ = useRouter();
    const search_value_ref = useRef(null);
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
        <SWRConfig value={{fallback}}>
        <div className="quezeshow_main_root">
            {
                console.log('re rendered')
            }
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
            <Queze_contnet></Queze_contnet>
        </div>
        </SWRConfig>
    )

}
export default Quezeshow_main;
