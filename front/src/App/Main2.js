import React, { useEffect, useState,useRef } from "react";
import './css.css';
import axios from "axios";
import Header from "./ayo_world_rank_header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Main2_content from "./Main2_content";
import img1 from "./Img_folder/zzal2.jpg";

const Main2 = () => {
    const [img_base64_arr,setImg_base64_arr] = useState();
    const a_ref = useRef(); 
    const [render, setRender] = useState(0);
    const search_value_ref = useRef();
    const [main_content_state,setMain_content_state] = useState([]);
    useEffect(()=>{
        // console.log('render');
    })
    useEffect(()=>{
        axios({
            url          : process.env.REACT_APP_SERVER_URL + '/main_select_queze',
            method       : 'GET',
            headers      : {
                'Content-Type' : 'application/json'
            } 
        }).then((res)=>{
            // console.log('메인 이미지 res : ',res.data);

            let content_arr = [];
            if(res.data){
                res.data.result.map((e,i)=>{
                    // console.log(e);
                    content_arr[i] = {roomName : e.roomName, existence : e.existence, title : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid, publicAccess : e.publicAccess}
                })
    
            }
            // console.log('res',res.data);
            setMain_content_state([...content_arr]);
        })
        // setMain_content_state([{roomName : "A", existence : 1, title : '제목이요', src : img1, uuid : 'bhaglabiluaenfaen'}]);
    },[])

    const search_enter = (e) => {
        console.log('seach 중',search_value_ref.current.value);
        if(e.key === 'Enter'){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/search_queze',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    value : search_value_ref.current.value
                }
            }).then((res)=>{
                console.log(res);
                let content_arr = [];
                if(res.data){
                    res.data.result.map((e,i)=>{
                        // console.log(e);
                        content_arr[i] = {roomName : e.roomName, existence : e.existence, title : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid, publicAccess : e.publicAccess}
                    })
                }
                setMain_content_state([...content_arr]);
            })
        }
    }

    return(
        <div className="Main2_root">
            <Header></Header>
            <header className="Main2_a_queze_header">
                <input type="text" placeholder="검색 창" ref={search_value_ref} onKeyUp={search_enter}></input>
                <button className="all_btn"></button>
            </header>
            {/* <article>
                <p></p>
            </article> */}
            {/* <input type="toggle"></input> */}
            {/* <header>
                <button className="Main2_toogle all_btn">좋아요순</button>
                <button className="Main2_toogle all_btn">최신순</button>
                <input type="text"></input>
            </header> */}
            <div className="queze_list">
                {
                    main_content_state.map((e,i)=>{
                        return(
                            <Main2_content key={i} title={e.title} roomName={e.roomName} existence={e.existence} src={e.src} uuid={e.uuid} publicAccess={e.publicAccess}></Main2_content>
                        )
                    })
                }
            </div>
            <Footer/> 
        </div>
    )
}
export default Main2;