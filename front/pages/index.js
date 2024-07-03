import React, { useEffect, useState, useRef } from "react";
import Header from "@header/ayo_world_rank_header";
import Quezeshow_main_content from "@quezeshow/Quezeshow_main_content";
import axios from "axios";
import Adfit from "@components/Adfit";
import { Helmet } from "react-helmet-async";
import {search_axios, router} from '@functions/WorldRank';
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'

const Quezeshow_main= () => {

    const [content_state,setContent_state] = useState([]);
    const params = useParams();
    const searchParams = useSearchParams();
    const search_value_ref = useRef(null);
    const search_tag = searchParams.get('tag');
        

    const asd = searchParams.get('tag');
    console.log('asd',asd);

    useEffect(()=>{
        // const asd = searchParams.get('tag');
        // console.log('asd',asd);
    },[])
    const useEffect_func = async ()=>{
        console.log('searsh tag',search_tag,'params',params);
        if(typeof(search_tag) === 'string' && search_tag !== ''){
            const res = await search_axios(params.type === undefined ? 0 : params.type,null,null,search_tag);
            search_axios_then(res);
        }
        else {
            const res = await search_axios(params.type === undefined ? 0 : params.type,null,null,null);
            search_axios_then(res);
        }
    };
    useEffect(()=>{useEffect_func()},[search_tag,params.type]);
    const search_axios_then = (res) => {
        const content_state_ = res.data.map((e,i)=>{
            return({
                src : 'data:image/jpeg;base64,'+e.img,
                uuid : e.uuid,
                title : e.title,
                likes : e.likes,
                roomnum : e.roomnum,
                quezeshow_type : e.quezeshow_type,
                explain_text : e.explain_text,
                likes_queze : e.likes_queze
            })
        })
        setContent_state(content_state => [...content_state_]);
        
    }
    const change_queze_likes = (index,value) => {
        const content_state_ = content_state;
        content_state_[index].likes_queze = value;
        setContent_state(content_state => [...content_state_]);
    }
    const search_enter = (e) => {
        if(e.key === 'Enter'){
            searchParams.set('tag',search_value_ref.current.value);
            setSearchParams(searchParams);
        }
    }
    const search_btn_enter = () => {
        searchParams.set('tag',search_value_ref.current.value);
        setSearchParams(searchParams);
    }
    const change_search_type_btn = (e) => {
        if(e.target.value === '최신순'){
            router(`/1?tag=${search_tag === null ? '' : search_tag}`);
        }else if(e.target.value === '인기순'){
            router(`/0?tag=${search_tag === null ? '' : search_tag}`);
        }
    }
    return(
        // typeof window === 'undefined' ?
        <div className="quezeshow_main_root">
            <Header></Header>
            <header className="Main2_a_queze_header quezeshow_main_header">
                <input type="button" className="search_type_btn all_btn" onClick={change_search_type_btn}></input>
                <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
                <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6" stroke="#222222"/>
                    <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                </button>
            </header>
        </div>
        // :
        // <div className="quezeshow_main_root">
        //     <Header></Header>
        //         <header className="Main2_a_queze_header quezeshow_main_header">
        //             <input type="button" className="search_type_btn all_btn" id={params.type === undefined || params.type === null ? 0 : params.type} value={Number(params.type) === 1 ? '인기순' : Number(params.type) === 0 ? '최신순' : '최신순'} onClick={change_search_type_btn}></input>
        //             <input type="text" className="Main2_a_queze_header_input" placeholder="검색 창(입력 후 엔터)" ref={search_value_ref} onKeyUp={search_enter}></input>
        //             <button className="all_btn main2_header_btn" onClick={search_btn_enter}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        //                 <circle cx="11" cy="11" r="6" stroke="#222222"/>
        //                 <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
        //                 </svg>
        //             </button>
        //         </header>
        //     {/* {
        //         window.innerWidth <= '400px' ?  */}
        //         <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit> 
        //         {/* : */}
        //         {/* <Adfit unit="DAN-vrRyUVVRZ2GLJyIR" position_type={'kakao_adfit_aside'}></Adfit>
        //     } */}
        //     <div className="queze_list">
        //         {
        //             content_state.map((e,i)=>{
        //                 return(
        //                     <Quezeshow_main_content key={i} index={i} src={e.src} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text} likes_queze={e.likes_queze} change_queze_likes={change_queze_likes}></Quezeshow_main_content>
        //                 )
        //             })
        //         }
        //     </div>
        // </div>
    )

}
export default Quezeshow_main;

// {
//     src : 'data:image/jpeg;base64,',
//     uuid : 'uuid',
//     title : 'title',
//     likes : 'likes',
//     roomnum : 'roomnum',
//     quezeshow_type : 'quezeshow_type',
//     explain_text : 'explain_text',
//     likes_queze : 'likes_queze'
// },
// {
//     src : 'data:image/jpeg;base64,',
//     uuid : 'uuid',
//     title : 'title',
//     likes : 'likes',
//     roomnum : 'roomnum',
//     quezeshow_type : 'quezeshow_type',
//     explain_text : 'explain_text',
//     likes_queze : 'likes_queze'
// },
// {
//     src : 'data:image/jpeg;base64,',
//     uuid : 'uuid',
//     title : 'title',
//     likes : 'likes',
//     roomnum : 'roomnum',
//     quezeshow_type : 'quezeshow_type',
//     explain_text : 'explain_text',
//     likes_queze : 'likes_queze'
// }