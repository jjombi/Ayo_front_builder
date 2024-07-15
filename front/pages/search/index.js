// "use client"
import React, { useEffect, useState, useRef } from "react";
import Header from "@header/ayo_world_rank_header";
import Quezeshow_main_content from "@quezeshow//Quezeshow_main_content";
import axios from "axios";
import Adfit from "@components/Adfit";
import { useParams, useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import {router, search_axios} from '@functions/WorldRank';
import useSWR from 'swr'

const Quezeshow_main= ({match}) => {

    const [content_state,setContent_state] = useState([]);
    // const params = useParams();
    const router_ = useRouter();
    // const searchParams = useSearchParams();
    const search_value_ref = useRef(null);
    // const search_tag = searchParams.get('tag');
    // console.log(router_.query);
    // const { data, error, isLoading } = useSWR(
    //     {query: router_.query},
    //     useEffect_func
    // )
    const id = router_.query.ty;
    const tag = router_.query.tag;
    const useEffect_func = async (key)=>{

        if(router_.isReady){
            if(typeof(tag) === 'string' && tag !== ''){
                const res = await search_axios(id === undefined ? 0 : id,null,null,tag);
                search_axios_then(res);
            }
            else {
                const res = await search_axios(id === undefined ? 0 : id,null,null,null);
                search_axios_then(res);
            }
        }
    };
    useEffect(()=>{useEffect_func()},[router_.query]);
    const search_axios_then = (res) => {
        setContent_state(content_state => [...res.data]);
    }
    const change_queze_likes = (index,value) => {
        const content_state_ = content_state;
        content_state_[index].likes_queze = value;
        setContent_state(content_state => [...content_state_]);
    }
    const search_enter = (e) => {
        if(e.key === 'Enter'){
            router(router_,'/search',{ty: id===null?0:id, tag:search_value_ref.current.value});
        }
    }
    const search_btn_enter = () => {
        router(router_,'/search',{ty: id===null?0:id, tag:search_value_ref.current.value});
    }
    const change_search_type_btn = (e) => {
        if(e.target.value === '최신순'){
            router(router_,'/search',{ty: 1, tag:search_value_ref.current.value});
        }else if(e.target.value === '인기순'){
            router(router_,'/search',{ty: 0, tag:search_value_ref.current.value});
        }
    }
    return(
        <div className="quezeshow_main_root">
            <Header></Header>
                <header className="Main2_a_queze_header quezeshow_main_header">
                    <input type="button" className="search_type_btn all_btn" id={id === undefined || id === null ? 0 : id} value={Number(id) === 1 ? '인기순' : Number(id) === 0 ? '최신순' : '최신순'} onClick={change_search_type_btn}></input>
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
                    content_state.map((e,i)=>{
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