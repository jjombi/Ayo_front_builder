import React, { useState, useRef, useEffect } from "react";
import '../css.css';
import Make_quezeshow_content from "./Make_quezeshow_content";
import Make_quezeshow_content_queze from "./Make_quezeshow_content_queze";
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import Loading_popup from "../Loading_popup";
import { useFormStatus } from 'react-dom';
import Header from "../ayo_world_rank_header";
import Adfit from "../Adfit";
import Make_quezeshow_modify_content from './Make_quezeshow_modify_content';
import axios from "axios";
import {chenge_textarea_height} from '../public/WorldRank';
// import Modify_password_popup from "../public/modify_password_popup";
import Make_quezeshow_content_text from './Make_quezeshow_content_text';
import { useSearchParams } from "react-router-dom";
const Make_quezeshow_basic = ({type, server_url, uuid_props, quezeshow_type_props, queze_type}) => {
    const [content_state,setContent_state] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();
    const file_ref = useRef([]);
    const canvas_ref = useRef();
    const queze_title_ref = useRef();
    const form_dom_ref = useRef();
    const [loading_popup_state,setLoading_popup_state] = useState(false);
    const [uuid,setUuid] = useState('');
    const [representative_img_state, setRepresentative_img_state] = useState(-1);
    const {pending} = useFormStatus();
    const [content_object, setContent_object] = useState([]);
    const [password, setPassword] = useState('');
    const [early_data, setEarly_data] = useState([]);
    const changed_object_ref = useRef([]);
    const last_num_ref = useRef(0);
    const [room_num,setRoom_num] = useState(null);
    const [clicked_btn, setClicked_btn] = useState('multiple_choice');
    const [quezeshow_type_clicked_btn, setQuezeshow_type_clicked_btn] = useState('queze');
    const content_type = searchParams.get('ty');
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
        if(type === 'modify'){
            console.log('quezeshow_type_props',quezeshow_type_props);
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/modify_quezeshow',
                data : {
                    uuid : uuid_props,
                    quezeshow_type : quezeshow_type_props
                },
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>{
                console.log('slect * from quezeshowcontent',res);
                setEarly_data(early_data => res.data);
                setRoom_num(room_num => res.data[0].roomnum);
                const changed_object_ref_ = res.data.map((e,i)=>{
                    let return_data;
                    if(quezeshow_type_props === 'vote'){
                        if(e.img_num !== ''){
                            const new_last_num = e.img_num.replace(/img|.jpg/g, '');
                            if(last_num_ref.current < new_last_num){
                                last_num_ref.current = new_last_num;
                            }
                        }
                        return_data = {
                            uuid : e.uuid2,
                            text : e.text,
                            title : e.title
                        }
                    }else if(quezeshow_type_props === 'queze'){
                        if(e.img_num !== ''){
                            const new_last_num = e.img_num.replace(/img|.jpg/g, '');
                            if(last_num_ref.current < new_last_num){
                                last_num_ref.current = new_last_num;
                            }
                        }
                        return_data = {
                            title : e.title,
                            uuid : e.uuid2,
                            text : e.text,
                            value1 : e.value1,
                            value2 : e.value2,
                            value3 : e.value3,
                            value4 : e.value4,
                            answer : e.answer
                        }
                    }else if(quezeshow_type_props === 'text'){
                        return_data = {
                            title : e.title,
                            uuid : e.uuid2,
                            answer : e.answer
                        }
                    }else{
                        console.log('quezeshow_type_props err');
                    }
                    
                    
                    return(return_data);
                })
                console.log('last num', last_num_ref.current);
                // console.log('changed_object_ref_ 빈값',changed_object_ref_);
                changed_object_ref.current = [...changed_object_ref_];
            })
        }
        else {
            const uuid_ = uuidv4();
            // console.log('uuid',uuid_);
            setUuid(uuid=> uuid_);
            // console.log('to str',toString(60));
            const random_modify_password = Math.random().toString(36).substr(2,10);
            console.log('random_modify_password',random_modify_password);
            setPassword(password => random_modify_password);
            // const htmlTitle = document.querySelector("title");
            // htmlTitle.innerHTML = '나락퀴즈쇼 당신도 나락에 갈수 있다';
        }
    },[])

    const add_content = () => {
        const content_state_ = [...content_state,content_state.length+1];
        setContent_state(content_state=>[...content_state_]);
        setContent_object(content_object => [...content_object,{src : '', title : '', text : ''}]);
    }
    const modify_upload = () => {
        console.log('modify upload in function',changed_object_ref.current);
        let changed_obj_filter; 
        if(quezeshow_type_props === 'vote'){
            changed_obj_filter = changed_object_ref.current.filter((e,i)=>{
                if(e.title !== early_data[i].title) return true
                else if(e.text !== early_data[i].text) return true
                else return false
            })
        }else if(quezeshow_type_props === 'text'){
            changed_obj_filter = changed_object_ref.current.filter((e,i)=>{
                if(e.title !== early_data[i].title) return true
                else if(e.text !== early_data[i].answer) return true
                else return false
            })
        }else if(quezeshow_type_props === 'queze'){
            changed_obj_filter = changed_object_ref.current.filter((e,i)=>{
                if(e.title !== early_data[i].title) return true
                else if(e.text !== early_data[i].answer) return true
                else return false
            })
        }
        console.log('changed_obj_filter',changed_obj_filter);

        axios({
            url : process.env.REACT_APP_SERVER_URL + '/modify_change_quezeshowqueze',
            method : 'POST',
            data : {
                changed_data   : changed_obj_filter,
                quezeshow_type : quezeshow_type_props
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            // console.log(res);
            alert('수정 되었습니다');
        })
    }
    const new_img_upload_func = () => {

        Promise.all([...file_ref.current].map((e,i)=>{
            // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,'e',e,' and body :',file_ref.current[i]);
            if(e !== ''){
                if(type === 'modify'){
                    console.log('img upload modify');
                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            ACL: 'public-read',
                            Bucket: bucket, // 버킷 이름
                            Key: `${uuid_props}/${Number(last_num_ref.current)+1}`+".jpg", // 유저 아이디
                            Body: file_ref.current[i], // 파일 객체
                        },
                    });
                    const promise = upload.promise();
                }else{
                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            ACL: 'public-read',
                            Bucket: bucket, // 버킷 이름
                            Key: `${uuid}/${i}`+".jpg", // 유저 아이디
                            Body: file_ref.current[i], // 파일 객체
                        },
                    });
                    const promise = upload.promise();
                }
                    // console.log('upload',upload);
                // }

            }
        })).then(()=>{
            setLoading_popup_state(true);
            // console.log('submint 회수','representative_img_state',representative_img_state);
            form_dom_ref.current.submit();  
        })  
    }
    const img_upload = async (e) => {
        e.preventDefault();
        // console.log('img upload',file_ref);
        if(type === 'modify'){
            new_img_upload_func();
        }
        else if(queze_title_ref.current.value === ''){
            alert('제목입력해 주세요');
        }   
        else if(quezeshow_type_clicked_btn === 'text'){
            setLoading_popup_state(true);
            form_dom_ref.current.submit();  
        }
        else{
            for(let i = 0;i < file_ref.current.length;i++){// 썸내일 고르기
                // console.log('for 문');
                if(file_ref.current[i] !== ''){
                    console.log('i',i);
                    setRepresentative_img_state(representative_img_state => i);
                    i = file_ref.current.length+1;
                }
            }
            new_img_upload_func();
        }
    }
    const queze_type_btn_onclick = (e) => {
        console.log('queze_type_btn_onclick clicked',quezeshow_type_clicked_btn,e.target.id);
        if(quezeshow_type_clicked_btn === 'vote' && e.target.id === 'descriptive'){
            alert('투표형식에서 서술형 문제는 만들 수 없습니다');
        }
        else{
            setClicked_btn(clicked_btn => e.target.id);
        }
    }
    const quezeshow_type_btn_onclick = (e) => {
        console.log('quezeshow_type_btn_onclick clicked');
        setQuezeshow_type_clicked_btn(quezeshow_type_clicked_btn => e.target.id);
        if(clicked_btn === 'descriptive'){
            setClicked_btn(clicked_btn => 'multiple_choice');
        }
    }
    return (
        <form className="make_quezeshow_root" ref={form_dom_ref} action={process.env.REACT_APP_SERVER_URL+"/"+server_url} method="POST" target="iframe">
            {/* {
                space_uuid !== null
                ?
                <h1 className="make_quezeshow_space_title">{space_title}</h1>
                :
                null
            } */}
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            {/* <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending} password={password}/> */}
            {loading_popup_state ? <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending} password={password}/> : null}
            {/* <Modify_password_popup top={"-7%"} left={"20%"} text={'asda'}></Modify_password_popup> */}
            <canvas ref={canvas_ref}></canvas>
            <p className="make_quezeshow_space_warrning">
                주의, 성적인 콘텐츠, 타인에 대한 욕설등 부적절한 콘텐츠는 게시할 수 없습니다.
            </p>
            {
                type === 'modify' ? 
                <>
                    <input type="text" hidden name="uuid" defaultValue={uuid_props} readOnly></input>
                    <input type="text" hidden name="room_num" value={room_num}></input>
                    <input type="number" hidden name="last_num" value={last_num_ref.current}></input>
                </> 
                : 
                <>  
                    <input type="text" name="quezeshow_type" hidden value={quezeshow_type_clicked_btn}></input>
                    <input type="text" name="queze_type" hidden value={clicked_btn}></input>
                    <input rows={1} type="text" ref={queze_title_ref} maxLength={80} name="queze_title" className="make_quezeshow_queze_title" placeholder="제목"></input>
                    <textarea onChange={chenge_textarea_height} rows={1} placeholder="문제 설명글" maxLength={200} name="quezeshowqueze_explain_text" className="make_quezeshow_queze_explain_text"></textarea>  
                    <div className="queze_type_btn">
                        {/* <button type="button" id="vote" style={quezeshow_type_clicked_btn === 'vote' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={quezeshow_type_btn_onclick}>투표 형식</button> */}
                        {
                            content_type === 'quezeshow'
                            ?
                            <>
                            <button type="button" id="queze" style={quezeshow_type_clicked_btn === 'queze' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={quezeshow_type_btn_onclick}>퀴즈 형식</button>
                            <button type="button" id="text" style={quezeshow_type_clicked_btn === 'text' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={quezeshow_type_btn_onclick}>문장 형식</button>
                            </>
                            :
                            null
                        }
                        
                    </div>
                    {
                        quezeshow_type_clicked_btn === 'text' 
                        ?
                        null
                        :
                        quezeshow_type_clicked_btn === 'vote'
                        ?
                        <div className="queze_type_btn">
                            <button type="button" id="multiple_choice" style={clicked_btn === 'multiple_choice' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={queze_type_btn_onclick}>객관식</button>
                        </div>
                        :
                        <div className="queze_type_btn">
                            <button type="button" id="multiple_choice" style={clicked_btn === 'multiple_choice' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={queze_type_btn_onclick}>객관식</button>
                            <button type="button" id="descriptive" style={clicked_btn === 'descriptive' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={queze_type_btn_onclick}>서술형</button>
                        </div>
                    }
                    {/* <div className="queze_type_btn">
                        <button type="button" id="multiple_choice" style={clicked_btn === 'multiple_choice' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={queze_type_btn_onclick}>객관식</button>
                        <button type="button" id="descriptive" style={clicked_btn === 'descriptive' ? {backgroundColor : 'rgb(126, 126, 126)'} : null} onClick={queze_type_btn_onclick}>서술형</button>
                    </div> */}
                    <input type="text" value={password} name="modify_password" hidden readOnly></input>   
                    <input type="number" hidden name="representativeimg" value={Number(representative_img_state)} readOnly></input>
                    <input type="text" hidden name="uuid" value={uuid} readOnly></input>
                </>     
            }                   
            <div className="queze_list">
            {
                quezeshow_type_clicked_btn === 'vote'//투표 형식
                ?
                <>
                {
                content_state.map((e,i)=>{
                    return(
                        <Make_quezeshow_content key={i} index={i} content_state={content_state} setContent_state={setContent_state} canvas_ref={canvas_ref} file_ref={file_ref} content_object={content_object} setContent_object={setContent_object}/>
                    )
                })
                }
                </>
                :   
                quezeshow_type_clicked_btn === 'queze'//퀴즈 형식
                ?
                <>
                {
                content_state.map((e,i)=>{
                    return(
                        <Make_quezeshow_content_queze key={i} index={i} content_state={content_state} setContent_state={setContent_state} canvas_ref={canvas_ref} file_ref={file_ref} content_object={content_object} setContent_object={setContent_object} queze_type={clicked_btn}/>
                    )
                })
                }
                </>
                :                                     //문장 형식
                <>
                {
                content_state.map((e,i)=>{
                    return(
                        <Make_quezeshow_content_text key={i}/>
                    )
                })
                }
                </>
            }   
            {
                quezeshow_type_props === 'vote' 
                ?
                early_data.map((e,i)=>{
                    return(//img,early_text, uuid, changed_object_ref, index
                        <Make_quezeshow_modify_content key={i} img={'data:image/jpeg;base64,'+e.img} early_title={e.title} early_text={e.text} uuid={e.uuid2} changed_object_ref={changed_object_ref} index={i} quezeshow_type={quezeshow_type_props}></Make_quezeshow_modify_content>
                    )
                })
                :
                quezeshow_type_props === 'queze'
                ?
                early_data.map((e,i)=>{
                    return(//img,early_text, uuid, changed_object_ref, index
                        <Make_quezeshow_modify_content key={i} img={'data:image/jpeg;base64,'+e.img} early_title={e.title} early_text={null} uuid={e.uuid2} changed_object_ref={changed_object_ref} index={i} v1={e.value1}v2={e.value2} v3={e.value3} v4={e.value4} answer={e.answer} quezeshow_type={quezeshow_type_props} queze_type={queze_type}></Make_quezeshow_modify_content>
                    )
                })
                :
                early_data.map((e,i)=>{
                    return(//img,early_text, uuid, changed_object_ref, index
                        <Make_quezeshow_modify_content key={i} early_title={e.title} answer={e.answer} uuid={e.uuid2} changed_object_ref={changed_object_ref} index={i} quezeshow_type={quezeshow_type_props}></Make_quezeshow_modify_content>
                    )
                })
            }
            </div>
            {/* {
                space_uuid !== null
                ?
                <>
                    <input type="text" hidden name="uuid" value={space_uuid} readOnly></input>
                    <input type="text" hidden name="uuid2" value={uuid} readOnly></input>
                </>
                : */}
            {/* } */}
            <input type="text" value={Date.now()} name="date" readOnly hidden></input>
            <input type="button" className="all_btn make_quezeshow_addbtn" onClick={add_content} value={'+'}></input>
            <input type="button" value="완료" className="all_btn make_quezeshow_submintbtn" onClick={(e)=>{
                // console.log('type',type);
                if(content_state.length !== 0){
                    // console.log('img upload');
                    img_upload(e);
                }if(type === 'modify'){
                    // console.log('modify upload');
                    modify_upload(e);
                }
            }}></input>
        </form>
    )
}
export default Make_quezeshow_basic;