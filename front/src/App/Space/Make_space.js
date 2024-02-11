import React, { useEffect, useRef, useState } from "react";
import '../css.css';
import { useNavigate } from "react-router-dom";
import img from '../Img_folder/no_image.jpg';
import Header from "../ayo_world_rank_header";
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import axios from "axios";
import Loading_popup from "../Loading_popup";
import Adfit from "../Adfit";
const Make_space= () => {
    const navigate = useNavigate();
    const [help_message_state, setHelp_message_state] = useState(false);
    const [src, setSrc] = useState(img);
    const [file, setFile] = useState('');
    const [uuid, setUuid] = useState('');
    const canvas_ref = useRef();
    const title_ref = useRef();
    const intriduce_text_ref = useRef();
    const password_ref = useRef();
    const [loading_popup_state,setLoading_popup_state] = useState(false);

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
        setUuid(uuid => uuid_);
    },[])
    // const change_help_message_state = () => {
    //     setHelp_message_state(help_message_state => !help_message_state);
    // }
    const img_upload = async (e) => {
        console.log(uuid,file);
        e.preventDefault();
        if(title_ref.current.value === ''){
            alert('제목입력해 주세요');
        }
        else{
            if(file === ''){
                axios({
                    url : process.env.REACT_APP_SERVER_URL+'/make_space',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    data : {
                        uuid : uuid,
                        title : title_ref.current.value,
                        intro_text : intriduce_text_ref.current.value,
                        img : ''
                        // password : password_ref.current.value
                    }
                }).then(res=>{
                    console.log(res);
                    alert('완료');
                })
            }
            else{
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: 'public-read',
                        Bucket: bucket, // 버킷 이름
                        Key: `space/${uuid}.jpg`, // 유저 아이디
                        Body: file, // 파일 객체
                    },
                });
                // console.log('upload',upload);
                const promise = upload.promise();
    
                axios({
                    url : process.env.REACT_APP_SERVER_URL+'/make_space',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    data : {
                        uuid : uuid,
                        title : title_ref.current.value,
                        intro_text : intriduce_text_ref.current.value,
                        img : `space/${uuid}.jpg`
                        // password : password_ref.current.value
                    }
                }).then(res=>{
                    console.log(res);
                    alert('완료');
                    
                })
            }
        }
        
    }
    const change_img = (e) => {
        e.preventDefault();
        // console.log('클릭 후 이미지 선택',e.target.files.length);
        if(e.target.files.length === 1){
            basic_change_img(e.target.files);
        }
    }
    const onpaste = (e) => {
        // console.log('onpaste');
        if (e.clipboardData.files.length) {
            basic_change_img(e.clipboardData.files);
        }
    }
    const basic_change_img = (files) => {
        // console.log(files);
        const file = [...files];
        // console.log(file,index);
        // if(file.length === 0) return null;
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (ev) => {

            const image = new Image();
            image.src = reader.result;
            image.name = ev.name;
            setSrc(src => reader.result);
            image.onload = () => {
                imageSizeChange(image);
            };

        }
    }
    const imageSizeChange = ( image ) => {
        // console.log('image',image.alt,image.name);
        const canvas = canvas_ref.current

        let width = image.width;
        let height = image.height;
        // console.log(image.width,image.height);
        if(width > height){ // 가로가 더 길때
            // console.log(width / height);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(width > 4000){
                    width = image.width / 2;
                    height = image.height / 2;
                }
            }
        }else{              // 세로가 더 길때
            // console.log(height / width);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(height > 4000){
                    width = image.width / 2;
                    height = image.height / 2;
                }
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        const imgUrl = canvas.toDataURL("image/jpeg", 0.5);
        // console.log('결과물 imgUrl : ',imgUrl);
        const binary = window.atob(imgUrl.split(',')[1]);
        // console.log('binary',binary);
        const arraybuffer = new ArrayBuffer(binary.length);
        let bytes = new Uint8Array(arraybuffer);
        for(let i=0;i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }
        // console.log('arrbuffer',bytes.buffer);
        const file_ = new File([bytes.buffer],image.name+'.jpg',{
            type : 'image/jpeg'
        });
        setFile(file => file_);
    }
    return(
        <>
        <canvas ref={canvas_ref}></canvas>
        {/* {loading_popup_state ? <Loading_popup/>} */}
        <Header></Header>
        <header className="Main2_a_queze_header">
            <button className="all_btn a_queze_header_btn" title="" onClick={()=>{navigate('/space')}}>스페이스</button>
            <button className="all_btn a_queze_header_btn" title="" onClick={()=>{navigate('/make_space')}}>스페이스 만들기</button>
            
        </header>
        <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
        <section className="make_space_section">
            <div className="img">
                <p>프로필 이미지</p>
            </div>
            <input type="file" className="file" onChange={change_img}></input>
            <div className="file allbtn" onPaste={onpaste}>
                <p className="allbtn">이미지 붙여 넣기</p>
            </div>
            <img src={src}></img>
            <div className="pass">
                <p>스페이스 제목(이름)</p>
                <button></button>
            </div>
            <input ref={title_ref} className="text" type="text" placeholder="제목"></input>
            <div className="pass">
                <p>스페이스 소개</p>
                <button></button>
            </div>
            <textarea ref={intriduce_text_ref} className="introduce_text" type="text" placeholder="소개"></textarea>
            {/* <div className="pass">
                <p>관리자 비밀번호</p>
                {
                help_message_state
                ?
                <>
                    <svg onClick={change_help_message_state} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 10.5H11.5C11.7761 10.5 12 10.7239 12 11V15C12 15.2761 12.2239 15.5 12.5 15.5H13M12 8.5H12.01" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.3892 19.8785C14.4238 19.696 15.4124 19.3116 16.2984 18.7471C17.1844 18.1827 17.9506 17.4492 18.5532 16.5886C19.1558 15.728 19.583 14.7572 19.8104 13.7315C20.0378 12.7058 20.0609 11.6454 19.8785 10.6108C19.696 9.5762 19.3116 8.58765 18.7471 7.7016C18.1827 6.81556 17.4492 6.04937 16.5886 5.44678C15.728 4.8442 14.7572 4.41702 13.7315 4.18963C12.7058 3.96225 11.6454 3.93911 10.6108 4.12154C9.5762 4.30397 8.58765 4.6884 7.7016 5.25287C6.81556 5.81734 6.04937 6.55081 5.44678 7.41139C4.8442 8.27197 4.41702 9.24281 4.18963 10.2685C3.96225 11.2942 3.93911 12.3546 4.12154 13.3892C4.30397 14.4238 4.6884 15.4124 5.25287 16.2984C5.81734 17.1844 6.55081 17.9506 7.41139 18.5532C8.27197 19.1558 9.24281 19.583 10.2685 19.8104C11.2942 20.0378 12.3546 20.0609 13.3892 19.8785L13.3892 19.8785Z" stroke="#7E869E" strokeOpacity="0.25"/>
                    </svg>
                    <section>
                        <p>나중에 프로필 사진 변경, 스페이스 제목을 변경 할때 사용할 비밀번호 입니다.</p>
                    </section>
                </>
                :
                <svg onClick={change_help_message_state} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="8" transform="matrix(-1 0 0 1 20 4)" fill="#7E869E" fillOpacity="0.25"/>
                <path d="M11 10.5H11.5C11.7761 10.5 12 10.7239 12 11V15C12 15.2761 12.2239 15.5 12.5 15.5H13M12 8.5H12.01" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                }
            </div>
            <input ref={password_ref} className="text" type="password" placeholder="비밀번호"></input> */}
            <input type="button" value="완료" className="all_btn make_quezeshow_submintbtn" onClick={img_upload}></input>
        </section>
        </>
    )

}
export default Make_space;