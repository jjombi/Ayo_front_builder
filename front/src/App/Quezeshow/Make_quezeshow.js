import React, { useState, useRef } from "react";
import '../css.css';
import Make_quezeshow_content from "./Make_quezeshow_content";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import Loading_popup from "../Loading_popup";
import { useFormStatus } from 'react-dom';

const Make_quezeshow = () => {
    const [content_state,setContent_state] = useState([]);
    const file_ref = useRef([]);
    const canvas_ref = useRef();
    const queze_title_ref = useRef();
    const form_dom_ref = useRef();
    const [loading_popup_state,setLoading_popup_state] = useState(false);
    const uuid = uuidv4();
    const {pending} = useFormStatus();

    const region = "ap-northeast-2";
    const bucket = "dlworjs";
    const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    
    AWS.config.update({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    });

    const add_content = () => {
        const content_state_ = [...content_state,content_state.length+1];
        setContent_state(content_state=>[...content_state_]);
    }
    const img_upload = () => {
        if(queze_title_ref.current.value === ''){
            alert('제목입력해 주세요');
        }   
        else{
            Promise.all([...file_ref.current].map((e,i)=>{
                console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,' and body :',file_ref.current[i]);
                if(e !== ''){
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
                    promise.then(()=>{
                        // console.log('success upload',upload,i,img_src_arr.current.length-1);
                    });
                }
            })).then(()=>{
                setLoading_popup_state(true);
                form_dom_ref.current.submit();
            })  
        }
    }
    return (
        <form className="make_quezeshow_root" ref={form_dom_ref} action={process.env.REACT_APP_SERVER_URL+"/make_quezeshow"} method="POST">
            {loading_popup_state ? <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending}/> : null}
            <canvas ref={canvas_ref}></canvas>
            <input type="text" ref={queze_title_ref} name="queze_title" className="make_quezeshow_queze_title" placeholder="제목"></input>
            {
                content_state.map((e,i)=>{
                    return(
                        <Make_quezeshow_content key={i} index={i} content_state={content_state} setContent_state={setContent_state} canvas_ref={canvas_ref} file_ref={file_ref}/>
                    )
                })
            }
            <input type="texy" hidden name="uuid" value={uuid}></input>
            <input type="text" value={Date.now()} name="date" hidden></input>
            <input type="button" className="all_btn make_quezeshow_addbtn" onClick={add_content} value={'+'}></input>
            <input type="button" value="완료"  onClick={img_upload}></input>
        </form>
    )
}
export default Make_quezeshow;