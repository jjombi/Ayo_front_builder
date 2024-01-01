import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./ayo_world_rank_header";
import './css.css';
import likes_img from '/src/App/Img_folder/thumb_up-1.svg'; //x
import Footer from "./Footer";
import Result_content from "./Result_content";
import Result_comment from "./Result_comment";
import img from './Img_folder/zzal2.jpg';

// import {great_icon} from './Img_folder/great_icon.svg';
const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const comment_input_ref = useRef();
    const roomName_ref = useRef();
    const title_ref = useRef();
    const [result_content_state,setResult_content_state] = useState([]);
    const [result_comment_state,setResult_comment_state] = useState([]);

    const [render, setRender] = useState(0);

    // const [boolean,setBoolean] = useState([]);
    useEffect(()=>{
        roomName_ref.current = searchParams.get('roomName');
        title_ref.current = searchParams.get('title');
        axios({
            url : process.env.REACT_APP_SERVER_URL +'/main_result',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                roomName : roomName_ref.current
            }

        }).then(res=>{
            let setResult_content_state_ = [];
            // console.log(res);
            res.data.map((e,i)=>{   
                setResult_content_state_[i] = {img : 'data:image/jpeg;base64,'+e.img, text : e.text}
                // console.log('result content state 만드는 중');
            })
            setResult_content_state([...setResult_content_state_]);
        })
        axios({
            url : process.env.REACT_APP_SERVER_URL+'/main_a_queze_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            // console.log('main_a_queze_comments res : ',res);
            let setResult_comment_state_ = [];
            res.data.map((e,i)=>{
                setResult_comment_state_[i] = {text : e.value, likes : e.likes, roomName : roomName_ref.current, uuid : e.parentsKey}
            })
            setResult_comment_state([...setResult_comment_state_]);
        })
        // setResult_content_state([{img : img, text : 'asdasdas'}]);
    },[])


    const upload_comment = (e) => {
        e.preventDefault();
        // console.log('댓글 달기 함수 ',e);
        axios({
            url : process.env.REACT_APP_SERVER_URL +'/main_a_queze_plus_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current,
                type : Number(comment_input_ref.current.id),//부모인지 자식인지
                value : comment_input_ref.current.value
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            // console.log(res);
            if(res.data == 'success') {
                // console.log('페이지 리로딩');
                location.reload();
            }
        })
    }
    return(
        <>
            <Header></Header>
            <h3 className="result_title">
                {title_ref.current}
            </h3>
            {
                //console.log('result_content_state',result_content_state)
                result_content_state.map((e,i)=>{
                    return (<Result_content key={i} text={e.text} img={e.img} rankNum={i}></Result_content>)
                })
            }

            <div className="comment_area">
                <div>
                    <input type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력"></input>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>
            {
                result_comment_state.map((e,i)=>{
                    return(<Result_comment key={i} text={e.text} likes={e.likes} roomName={e.roomName} uuid={e.uuid}></Result_comment>)
                })
            }
            <Footer></Footer>
        </>
    )
}
export default Result;