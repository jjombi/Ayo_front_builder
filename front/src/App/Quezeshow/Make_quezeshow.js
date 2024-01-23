import React, { useState, useRef, useEffect } from "react";
import '../css.css';
import Make_quezeshow_content from "./Make_quezeshow_content";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import Loading_popup from "../Loading_popup";
import { useFormStatus } from 'react-dom';
import Header from "../ayo_world_rank_header";
import Adfit from "../Adfit";
const Make_quezeshow = () => {
    const [content_state,setContent_state] = useState([]);
    const file_ref = useRef([]);
    const canvas_ref = useRef();
    const queze_title_ref = useRef();
    const form_dom_ref = useRef();
    const [loading_popup_state,setLoading_popup_state] = useState(false);
    const [uuid,setUuid] = useState('');
    const [representative_img_state, setRepresentative_img_state] = useState(null);
    const {pending} = useFormStatus();
    const [content_object, setContent_object] = useState([]);

    const region = "ap-northeast-2";
    const bucket = "dlworjs";
    const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    
    AWS.config.update({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    });

    useEffect(()=>{
        const uuid_ = uuidv4();
        // console.log('uuid',uuid_);
        setUuid(uuid=> uuid_);
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerHTML = '나락퀴즈쇼 당신도 나락에 갈수 있다';
    },[])

    const add_content = () => {
        const content_state_ = [...content_state,content_state.length+1];
        setContent_state(content_state=>[...content_state_]);
        setContent_object(content_object => [...content_object,{src : '', title : '', text : ''}]);
    }
    const img_upload = async (e) => {
        e.preventDefault();
        if(queze_title_ref.current.value === ''){
            alert('제목입력해 주세요');
        }   
        else{
            for(let i = 0;i < file_ref.current.length;i++){
                // console.log('for 문');
                if(file_ref.current[i] !== ''){
                    // console.log('i',i);
                    setRepresentative_img_state(i);
                    i = file_ref.current.length+1;
                }
            }
            Promise.all([...file_ref.current].map((e,i)=>{
                // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,'e',e,' and body :',file_ref.current[i]);
                // if(e !== ''){
                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            ACL: 'public-read',
                            Bucket: bucket, // 버킷 이름
                            Key: `${uuid}/`+i+".jpg", // 유저 아이디
                            Body: file_ref.current[i], // 파일 객체
                        },
                    });
                    // console.log('upload',upload);
                    const promise = upload.promise();
                    // promise.then(()=>{
                        // console.log('success upload',upload,i);
                    // });
                // }
            })).then(()=>{
                setLoading_popup_state(true);
                // console.log('submint 회수','representative_img_state',representative_img_state);
                form_dom_ref.current.submit();
            })  
        }
    }
    return (
        <form className="make_quezeshow_root" ref={form_dom_ref} action={process.env.REACT_APP_SERVER_URL+"/make_quezeshow"} method="POST" target="iframe">
            <Header></Header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            {loading_popup_state ? <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending}/> : null}
            <canvas ref={canvas_ref}></canvas>
            <input type="text" ref={queze_title_ref} name="queze_title" className="make_quezeshow_queze_title" placeholder="제목"></input>
            {
                content_state.map((e,i)=>{
                    return(
                        <Make_quezeshow_content key={i} index={i} content_state={content_state} setContent_state={setContent_state} canvas_ref={canvas_ref} file_ref={file_ref} content_object={content_object} setContent_object={setContent_object}/>
                    )
                })
            }
            <input type="number" hidden name="representativeimg" value={Number(representative_img_state)} readOnly></input>
            {
                // console.log('representative_img_state',representative_img_state)
            }
            <input type="text" hidden name="uuid" value={uuid} readOnly></input>
            <input type="text" value={Date.now()} name="date" readOnly hidden></input>
            <input type="button" className="all_btn make_quezeshow_addbtn" onClick={add_content} value={'+'}></input>
            <input type="button" value="완료" className="all_btn make_quezeshow_submintbtn" onClick={img_upload}></input>
        </form>
    )
}
export default Make_quezeshow;