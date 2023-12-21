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
    const [main_content_state,setMain_content_state] = useState([]);
    useEffect(()=>{
        console.log('render');
    })
    useEffect(()=>{
        axios({
            url          : process.env.REACT_APP_SERVER_URL + '/main_select_queze',
            method       : 'GET',
            headers      : {
                'Content-Type' : 'application/json'
            } 
        }).then((res)=>{
            console.log('메인 이미지 res : ',res.data);

            let content_arr = [];
            if(res.data){
                res.data.result.map((e,i)=>{
                    console.log(e);
                    content_arr[i] = {roomName : e.roomName, existence : e.existence, titie : e.title, src : 'data:image/jpeg;base64,'+res.data.base64_img_arr[i], uuid : e.uuid}
                })
    
            }
            console.log('res',res.data);
            setMain_content_state([...content_arr]);
        })
        // setMain_content_state([{roomName : "A", existence : 1, title : '제목이요', src : img1, uuid : 'bhaglabiluaenfaen'}]);
    },[])
    return(
        <div className="Main2_root">
            <Header></Header>
            {/* <article>
                <p></p>
            </article> */}
            {/* <input type="toggle"></input> */}
            <header>
                {/* <button className="Main2_toogle all_btn">좋아요순</button> */}
                {/* <button className="Main2_toogle all_btn">최신순</button> */}

            </header>
            <div className="queze_list">
                {
                    main_content_state.map((e,i)=>{
                        return(
                            <Main2_content title={e.title} roomName={e.roomName} existence={e.existence} src={e.src} uuid={e.uuid}></Main2_content>
                        )
                    })
                }
            </div>
            <Footer/> 
        </div>
    )
}
export default Main2;