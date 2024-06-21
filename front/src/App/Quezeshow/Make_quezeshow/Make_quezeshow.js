import React, { useContext, useState, useRef, useEffect } from "react";
import '../../css.css';
import Tag_area from "./Tag_area";
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import Loading_popup from "../../Loading_popup";
import Header from "../../ayo_world_rank_header";
import axios from "axios";
import {chenge_textarea_height, getUserId, isLogin, getUserEmail, getUserEmailKey, getAccessToken, get_new_accessToken,refreshToken_expiredAt_check} from '../../public/WorldRank';
import { useLocation, useNavigate} from "react-router-dom";
import Make_quezeshow_queze_option from "./Make_quezeshow_queze_option";
import Make_quezeshow_thumbnail from "./Make_quezeshow_thumbnail";
import Make_quezeshow_content from "./Make_quezeshow_content";
import { createBrowserHistory } from "history";

const Make_quezeshow = () => {
    // const history = createBrowserHistory();
    const location = useLocation();
    // const navigate  = useNavigate();

    const [uuid,setUuid] = useState('');
    const [quezeshow_type_clicked_btn, setQuezeshow_type_clicked_btn] = useState();
    const [password, setPassword] = useState('');
    const [content_state,setContent_state] = useState([]);
    const [content_object, setContent_object] = useState([]);
    const [time_checkbox,setTime_checkbox] = useState(false);
    const [choice,setChoice] = useState([]);
    const [correct_choice,setCorrect_choice] = useState([]);
    const [main_img,setMain_img] = useState([null, null]);
    const [password_popup, setPassword_popup] = useState(false);
    const [tag_arr, setTag_arr] = useState([]);

    const file_ref = useRef([]);
    const queze_title_ref = useRef();
    const form_dom_ref = useRef();
    const canvas_ref = useRef();
    const queze_explain_text_ref = useRef();
    const time_ref = useRef();
    const user_id_ref = useRef();

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
        const random_modify_password = Math.random().toString(36).substr(2,5);
        setUuid(uuid=> uuid_);
        setPassword(password => random_modify_password);
        setQuezeshow_type_clicked_btn(quezeshow_type_clicked_btn => location.state.quezeshow_type); // vote, multiple, descriptive, 투표, 객관, 서술
        refreshToken_expiredAt_check();
    },[])

    // const history_lisen = history.listen((location_) => {
    //     console.log(location_,history);
    //     if (history.action === "PUSH") {
    //         alert('push')
    //     }
    
    //     if (history.action === "POP") {
    //         const confirm_ = confirm('이전으로 돌아가시겠습니까? \n변경사항이 저장되지 않을 수 있습니다');
    //         if(!confirm_){
    //             console.log('뒤로가기 취소');
    //             history.push(location_);
    //             // history_state = history_state + 1;//---
    //             // navigate(1);
    //             // window.history.pushState(null,'','');
    //             // window.history.pushState(null, null, location.href);

    //         }else{

    //         }
    //     }
    // });

    // useEffect(() => {
    //     console.log('history change');
    //     const history_lisen_ = history_lisen();
    //     // history_state += 1;
    //     return history_lisen_;
    //   }, [history]);

    // const preventClose = (e) => {  
    //     e.preventDefault();  
    //     e.returnValue = "";
    // }
    // const useefffunc = () => {
    //     // window.addEventListener("popstate", function(event) {
    //     //     if(!confirm('이전으로 돌아가시겠습니까? \n변경사항이 저장되지 않을 수 있습니다')){
    //     //         navigate(1);
    //     //     }
    //     // });
    //     window.addEventListener("beforeunload", preventClose);
    //     return () => {    
    //     window.removeEventListener("beforeunload", preventClose);  
    //     // window.removeEventListener("popstate", function(event) {
    //     //     if(!confirm('이전으로 돌아가시겠습니까? \n변경사항이 저장되지 않을 수 있습니다')){
    //     //         navigate(1);
    //     //     }
    //     // });
    //     };
    // }
    // useEffect(() => {  
    //     useefffunc();
    // }, []);

    const delete_thumnail = (e) => {
        e.preventDefault();
        setMain_img(main_img => [null,null]);
    }

    const onpaste = (e,index,type) => {
        // console.log('onpaste');
        if (e.clipboardData.files.length) {
            basic_change_img(e.clipboardData.files,index,type);
        }
    }
    const change_img = (e,index,type) => {
        e.preventDefault();
        // console.log('클릭 후 이미지 선택');
        basic_change_img(e.target.files,index,type);
    }
    const basic_change_img = (files,index,type) => {
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

            image.onload = () => {
                imageSizeChange(image,index,type);
            };
            if(type !== 'main_img'){
                let content_object_ = [...content_object];
                content_object_[index].src = reader.result;
                setContent_object(content_object => [...content_object_]);
            }else{
                // console.log('type is main img');
                const main_img_ = main_img;
                main_img_[1] = reader.result;
                setMain_img(main_img => [...main_img_]);
            }
            
        }
    }

    const imageSizeChange = ( image,index,type ) => {
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
        const file = new File([bytes.buffer],image.name+'.jpg',{
            type : 'image/jpeg'
        });
        // console.log('type',type);
        if(type !== 'main_img'){
            file_ref.current[index] = file;
        }else {
            // console.log('type is main img');
            const main_img_ = main_img;
            main_img_[0] = file;
            setMain_img(main_img => [...main_img_]);
        }

    }

    const correct_choice_checker = () => {
        let tinyint = true;
        correct_choice.map((e,i)=>{
            if(e === ''){
                tinyint = false;
            }
        })
        return tinyint;
    }

    const img_upload = async (e) => {
        e.preventDefault();
        let tinyint = true;
        if(isLogin()) user_id_ref.current.value = getUserEmailKey();

        // const result = correct_choice_checker();
        if(queze_title_ref.current.value === ''){
            alert('제목입력해 주세요');
        }else if(user_id_ref.current.value === ''){
            alert('유저 아이디를 입력해 주세요');
        }
        else if(!correct_choice_checker()){
            alert('정답을 체크해 주세요');
        }
        else{
            const content_object_ = content_object.map((e,i)=>{
                if(e.data_type === 'image'){
                    if(e.src === '' || e.src === 'data:image/jpeg;base64,'){
                        return {data_type: e.data_type, hint : e.hint, title : e.title, text : e.text, img : false}
                    }else {
                        return {data_type: e.data_type, hint : e.hint, title : e.title, text : e.text, img : true}
                    }
                }else if(e.data_type === 'audio'){
                    if(e.src === '') tinyint = false
                    return {data_type : e.data_type, src : e.src, hint : e.hint, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
                }else if(e.data_type === 'video'){
                    if(e.src === '') tinyint = false
                    return {data_type : e.data_type, src : e.src, hint : e.hint, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
                }else if(e.data_type === 'text'){
                    return {data_type : e.data_type, src : e.src, hint : e.hint, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
                }
            })
            if(!tinyint) alert('영상 주소를 다시 확인해 주세요');
            else new_img_upload_func(content_object_);
            // setLoading_popup_state(true);
        }
    }

    const new_img_upload_func = (content_object_) => {
        // console.log('업로드',content_object_,content_object);
        // console.log('퀴즈쇼 업로드',[...file_ref.current],'퀴즈쇼 type',quezeshow_type_clicked_btn,'password',password,'queze_title',queze_title_ref.current.value,'queze_explain_text',queze_explain_text_ref.current.value,'content_object_',content_object_,'choice',choice,'correct_choice',correct_choice,'time_ref',time_ref.current.value,'main_img',main_img);
        Promise.all([...file_ref.current].map((e,i)=>{
            // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,'e',e,' and body :',file_ref.current[i]);
            if(e !== undefined){
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
        })).then(()=>{
            // form_dom_ref.current.submit();  
            // console.log(tag);
            let main_img_tinyint = false;
            if(main_img[0] !== null){
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: 'public-read',
                        Bucket: bucket, // 버킷 이름
                        Key: `${uuid}/main_img.jpg`, // 유저 아이디
                        Body: main_img[0], // 파일 객체
                    },
                });
                const promise = upload.promise();
                main_img_tinyint = true;
            }
            make_quezeshow_axios(content_object_,main_img_tinyint);
            // console.log(
            //     {
            //         quezeshow_type       : quezeshow_type_clicked_btn,
            //         password             : password,
            //         uuid                 : uuid,
            //         queze_title          : queze_title_ref.current.value,
            //         queze_explain_text   : queze_explain_text_ref.current.value,
            //         content_object       : content_object_, //콘텐츠 제못, 설명, 이미지 판별
            //         choice               : choice,
            //         correct_choice       : correct_choice,
            //         time                 : time_ref.current.value,
            //         main_img_tinyint     : main_img_tinyint,
            //         user_id              : user_id_ref.current.value,
            //         date                 : Date.now(),
            //         tag                  : tag_arr
            //     }
            // );
           
        })  
    }
    const make_quezeshow_axios = (content_object_,main_img_tinyint) => {
        axios({
            url : process.env.REACT_APP_SERVER_URL+"/make_quezeshow",
            method : 'POST',
            data   : {
                quezeshow_type       : quezeshow_type_clicked_btn,
                password             : password,
                uuid                 : uuid,
                queze_title          : queze_title_ref.current.value,
                queze_explain_text   : queze_explain_text_ref.current.value,
                content_object       : content_object_, //콘텐츠 제못, 설명, 이미지 판별
                choice               : choice,
                correct_choice       : correct_choice,
                time                 : time_ref.current.value,
                main_img_tinyint     : main_img_tinyint,
                user_id              : user_id_ref.current.value,
                date                 : Date.now(),
                tag                  : tag_arr
            }, 
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : getAccessToken()
            }

        }).then((res)=>{
            if(res.data === '토큰 만료'){
                get_new_accessToken((content_object_,main_img_tinyint)=>{make_quezeshow_axios(content_object_,main_img_tinyint)})
            }else{
                setPassword_popup(true);
                localStorage.setItem(uuid,password);
            }
        })
    }
    const add_content = (e,) => {
        e.preventDefault();
        const content_state_ = [...content_state,content_state.length+1];
        setContent_state(content_state=>[...content_state_]);
        setContent_object(content_object => [...content_object,{data_type : null,src : '', title : '', text : '', answer : '',start : 0, end : 0, hint : ''}]);
        // setContent_object(content_object => [...content_object,{
        if(quezeshow_type_clicked_btn === 'multiple'){
            setChoice(choice => [...choice,['','']]);
            setCorrect_choice(correct_choice => [...correct_choice,'']);
            // setHint(hint => [...hint,{data_type : null, }])
        }else if(quezeshow_type_clicked_btn === 'descriptive'){
            setCorrect_choice(correct_choice => [...correct_choice,[]]);
        }else if(quezeshow_type_clicked_btn === 'ox'){
            setCorrect_choice(correct_choice => [...correct_choice,0]);
        }
        
        // console.log('문제 추가하는 중 content object :',content_object,'quezeshow_type_clicked_btn',quezeshow_type_clicked_btn);
    }

    // const change_tag = (e) => {
    //     if(e.target.value === '없음'){
    //         setTag(tag => '');
    //     }else{
    //         setTag(tag => '('+e.target.value+')');
    //     }
    // }
    const addtag = (e) => {
        e.preventDefault();
        if(e.key === 'Enter'){
            const new_tag = e.target.value;
            e.target.value = '';
            setTag_arr(tag_arr => [...tag_arr,new_tag]);
        }
    }
    const droptag = (index) => {
        const tag_arr_ = tag_arr.filter((e,i)=>{return(i !== Number(index))});
        setTag_arr(tag_arr => [...tag_arr_]);
    }
    return(
        <form className="make_quezeshow_root" ref={form_dom_ref} action={process.env.REACT_APP_SERVER_URL+"/make_quezeshow"} method="POST" target="iframe">
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            {
                password_popup
                ?
                <Loading_popup pending={password_popup} password={password} setPassword_popup={setPassword_popup}></Loading_popup>
                :
                null
            }
            {/* <input type="text" name="quezeshow_type" value={quezeshow_type_clicked_btn}></input> */}
            <Header></Header>
            <canvas ref={canvas_ref} hidden></canvas>
            <section className="make_quezeshow_queze_title_explain_section">
                {
                    quezeshow_type_clicked_btn === 'multiple'
                    ?
                    <input className="title" placeholder="객관식 퀴즈 주제" ref={queze_title_ref} name="queze_title"></input>
                    :
                    quezeshow_type_clicked_btn === 'vote'
                    ?
                    <input className="title" placeholder="설문조사 주제" ref={queze_title_ref} name="queze_title"></input>
                    :
                    quezeshow_type_clicked_btn === 'descriptive'
                    ?
                    <input className="title" placeholder="서술형 퀴즈 주제" ref={queze_title_ref} name="queze_title"></input>
                    :
                    quezeshow_type_clicked_btn === 'ox'
                    ?
                    <input className="title" placeholder="O,X 퀴즈 주제" ref={queze_title_ref} name="queze_title"></input>
                    :
                    null
                }
                <textarea onChange={chenge_textarea_height} placeholder="부가 설명" rows={1} ref={queze_explain_text_ref} maxLength={200} name="quezeshowqueze_explain_text"></textarea>  
                {
                    isLogin()?
                    <textarea onChange={chenge_textarea_height} readOnly placeholder={getUserId()} rows={1} ref={user_id_ref} maxLength={30} name="quezeshowqueze_explain_text"></textarea>  :
                    <textarea onChange={chenge_textarea_height} placeholder="제작자 아이디 ex)developer" rows={1} ref={user_id_ref} maxLength={30} name="quezeshowqueze_explain_text"></textarea>  

                }
                {
                    
                }
                <input type="text" className="title" placeholder="테그 추가(엔터 클릭)" onKeyUp={(e)=>addtag(e)}></input>
                {
                    quezeshow_type_clicked_btn !== 'vote'
                    ?
                    <Tag_area tag_arr={tag_arr} droptag={droptag}></Tag_area>
                    :
                    null
                }
                <Make_quezeshow_queze_option quezeshow_type_clicked_btn={quezeshow_type_clicked_btn}time_ref={time_ref}time_checkbox={time_checkbox}setTime_checkbox={setTime_checkbox}/>
            </section>
            <Make_quezeshow_thumbnail main_img={main_img}change_img={change_img}onpaste={onpaste} delete_thumnail={delete_thumnail}/>
            {/* <div className="queze_list"> */}
            <div className="queze_list_v2">
                {
                    content_state.map((e,index)=>{
                        return(
                        <Make_quezeshow_content key={index} file_ref={file_ref} index={index}quezeshow_type_clicked_btn={quezeshow_type_clicked_btn}content_object={content_object}setContent_object={setContent_object}change_img={change_img}onpaste={onpaste}choice={choice}setChoice={setChoice}correct_choice={correct_choice}setCorrect_choice={setCorrect_choice} setContent_state={setContent_state}content_state={content_state}></Make_quezeshow_content>
                        )
                    })
                }
            </div>            
            <input type="button" className="all_btn make_quezeshow_addbtn" onClick={add_content} value={'+'} title="선택지 추가"></input>
            <input type="button" value="완료" className="all_btn make_quezeshow_submintbtn" onClick={(e)=>{
                if(content_state.length !== 0){
                    img_upload(e);
                }
            }}></input>
        </form>        

    )    
}
export default Make_quezeshow;