import React,{useEffect, useRef,useState} from "react";
import './css.css';
import { useNavigate } from "react-router-dom";
import { useFormStatus } from 'react-dom';
import axios from "axios";
import { dragenter, dragover, processChange } from "./public/WorldRank";
import AWS from "aws-sdk";
import Loading_popup from "./Loading_popup";
import Make_queze_img from "./Make_queze_img";
import Explain_popup from "./Explain_popup";
import Guide_popup from "./Guide_popup";
const Main2_make_queze_basic = ({type, roomName, serverurl}) => {
    const navigate = useNavigate();
    const [img_arr, setImg_arr] = useState([]); 
    const text_ref = useRef([]);
    const img_arr_ref = useRef([]);
    const form_dom_ref = useRef();
    const file_ref = useRef(); // input type file dom
    const title_ref = useRef();
    const lastest_i = useRef(0);
    const explain_text_ref = useRef([]); // 이미지 업로드후 이미지에 대한 설명글 ['서명1','설명2',...]
    const canvas_ref = useRef();
    const last_num_ref = useRef('');
    const [explain_popup_state, setExplain_popup_state] = useState(false);
    const [explain_popup_state2, setExplain_popup_state2] = useState(false);
    const [loading_popup_state,setLoading_popup_state] = useState(false);
    const {pending} = useFormStatus();
    const [passtinyint, setPasstinyint] = useState(false);
    const password_ref = useRef();
    const [password_preview_state,setPassword_preview_state] = useState('password');
    const [guide_state, setGuide_state] = useState(false);
    // const history = useHistory();


    const region = "ap-northeast-2";
    const bucket = "dlworjs";
    const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;


    AWS.config.update({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    });

    // console.log('assecc kry',AWS.config.credentials,accessKey,secretAccessKey);

    useEffect(()=>{
        // console.log('render');
        if(loading_popup_state){
            // console.log('popup 창 보이는 중');
        }else{
            // console.log('popup창 안 보이는 중');
        }
    })
    useEffect(()=>{
        // console.log(type,roomName,serverurl);
        if(type === 'modify'){
            axios({
                method : "POST",
                url : process.env.REACT_APP_SERVER_URL+'/make_queze_modify',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    roomName : roomName
                }
            }).then((res)=>{
                last_num_ref.current = res.data[res.data.length-1].originalname.replace(/img|.jpg/g, '');
                // console.log(last_num_ref);
            })
        }    
        // setLoading_popup_state(true);
    },[])
    const upload_checker = () => {
        let return_message = {
            title    : '',
            img_text : ''
        };
        title_ref.current.value === '' ? return_message.title = '제목을 입력해 주세요' : return_message.title = '';
        return return_message;
    }
    const img_upload = async (e) => {
        e.preventDefault();
        // console.log('u이미지 업로드 함수 시작',type,typeof(type),roomName);
        const datatransfer = new DataTransfer();
        img_arr_ref.current.map((ev,i)=>{
            datatransfer.items.add(img_arr_ref.current[i]);
        })//5,4,3,2,1
        file_ref.current.files = datatransfer.files;
        // console.log(file_ref.current.files);
        if(type === 'modify'){ // public access O
            
            Promise.all([...file_ref.current.files].map((e,i)=>{
                // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',' and body :',file_ref.current.files[i]);
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: 'public-read', 
                        Bucket: bucket, // 버킷 이름
                        Key: `${roomName}/img${(Number(last_num_ref.current)+i+1)}.jpg`, // 유저 아이디
                        Body: file_ref.current.files[i], // 파일 객체
                    },
                });
                // console.log('upload',upload);
                const promise = upload.promise();
                promise.then(()=>{
                    // console.log('success upload',upload,i,img_src_arr.current.length-1);
                });
            })).then(()=>{
                form_dom_ref.current.submit();
                // console.log(submit);
                // alert('완료');
                setLoading_popup_state(true);

            }) 
            
        }else{ // public access X
            const message = upload_checker()
            if(message.title !== '') {alert(message.title);}
            else if([...file_ref.current.files].length === 0){
                alert('만들어진 문제가 없습니다. 이미지와 설명글을 작성해 주세요');
            }
            else {
                // console.log('이미지 업로드 시작',process.env.REACT_APP_SERVER_URL+'/selectroomname');
                axios({
                    method : "GET",
                    url : process.env.REACT_APP_SERVER_URL+'/selectroomname',
                }).then((res)=>{    
                    Promise.all([...file_ref.current.files].map((e,i)=>{
                        // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,' and body :',file_ref.current.files[i]);
                        const upload = new AWS.S3.ManagedUpload({
                            params: {
                                ACL: 'public-read',
                                Bucket: bucket, // 버킷 이름
                                Key: `${res.data}/img`+i+".jpg", // 유저 아이디
                                Body: file_ref.current.files[i], // 파일 객체
                            },
                        });
                        // console.log('upload',upload);
                        const promise = upload.promise();
                        promise.then(()=>{
                            // console.log('success upload',upload,i,img_src_arr.current.length-1);
                        });
                    })).then(()=>{
                        setLoading_popup_state(true);
                        form_dom_ref.current.submit();
                    })    
                })
                // const submit = form_dom_ref.current.submit();
                
            }    
        }
           
    
    }
    const preventDefault = (e) => {
        // console.log('preventDefault and clicked this input');
        if(e.keyCode === 13){
            // console.log('preventDefault and clicked enter');
            e.preventDefault();
            e.target.value += '\n';
        }
        if(e.target.value.length > 40) {
            alert('40자 이하로 작성 하세요');
            e.target.value = e.target.value.slice(0,40);
        }
        
    }
    const change_text = (e) => {
        const index = e.target.id;
        text_ref.current[index] = e.target.value;
    }
    const change_img_drop = (e) => {
        e.preventDefault();
        basic_change_img(e.dataTransfer.files,false );
        e.target.style.backgroundColor = "white"
        
    }
    const change_img = (e) => {
        e.preventDefault();
        // console.log('클릭 후 이미지 선택');
        basic_change_img(e.target.files,true);
    }
    const onpaste = (e) => {
        // console.log('onpaste');
        if (e.clipboardData.files.length) {
            basic_change_img(e.clipboardData.files,false);
        }
    }
    
    const basic_change_img = (files,type) => {
        // console.log('basic change img 에서 files : ',files.length);
        // files 는 배열이 아님 배열로 바꿔서 map
        let files_to_arr = [...files];
        let img_arr_ = [...img_arr]; //element 담고 있는 배열
        // console.log('basic change img 에서 files_to_arr : ',files_to_arr,);

        files_to_arr.map((ev,i)=>{ 
            // console.log('file ev',ev,ev.name);
            const reader = new FileReader();
            reader.readAsDataURL(ev);
            reader.onload = () => {
                // console.log('img arr : ',img_arr_,'explain_text_ref.current',explain_text_ref.current   );
                img_arr_ = [
                    ...img_arr_ ,
                    {
                        img : reader.result,
                        img_name : ev.name,
                    },
                ];
                const image = new Image();
                // console.log(reader.result);
                image.src = reader.result;
                image.name = ev.name;
                // console.log('image object',image);
                image.onload = function() {
                    imageSizeChange(image);
                };
                // console.log('리사이징 함수 끝 난뒤 img arr ref',img_arr_ref.current);
                
                setImg_arr([...img_arr_]);
                lastest_i.current = lastest_i.current + 1;
                // console.log('index 값 들어 가기 전 lastest_i : ',lastest_i.current,'img arr : ',img_arr_);
                // console.log('img arr : ',img_arr,'file ref, files : ',file_ref.current.files,'datatransfer.files');
            }
        })
        
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
        const file = new File([bytes.buffer],image.name+'.jpg',{
            type : 'image/jpeg'
        });
        // console.log('file : ',file);
        img_arr_ref.current = [...img_arr_ref.current,file];
        console.log(img_arr_ref);
    }

    const file_size_checker = (ev) => {
        if(ev.size > 1024) { //1024 * 1024
        alert('이미지 파일 1MB 이상 !!');
        return false;
        }
        else return true;
    }
    
    const delete_img = (e) => {
        // console.log('delete img 함수 시작',e.target.id);
        const num = e.target.id;
        let img_arr_ = [...img_arr];
        img_arr_ref.current = img_arr_ref.current.filter((e,i)=>{return(i !== Number(num))});
        img_arr_ = img_arr_.filter((e,i)=>{return(i !== Number(num))});
        explain_text_ref.current = explain_text_ref.current.filter((e,i)=>{return(i !== Number(num))});
        const file_filter = [...file_ref.current.files].filter((e,i)=>{return(i !== Number(num))});
        const datatransfer = new DataTransfer();
        file_filter.map((e,i)=>{
            datatransfer.items.add(e);
        })
        file_ref.current.files = datatransfer.files;
        // console.log('img arr 자른뒤',img_arr_,datatransfer.files,explain_text_ref.current);
        setImg_arr([...img_arr_]);

        
    }
    const change_pass_tinyint = (e) => {
        setPasstinyint(!passtinyint);

        if(passtinyint){
            // console.log(password_ref);
            password_ref.current.value = '';
        }
    }
    const change_password_preview_state = () => {
        password_preview_state === 'text' ? setPassword_preview_state('password')
        : setPassword_preview_state('text')
    }
    const change_explain_popup_state = (e,type) => {
        e.preventDefault();
        // console.log('explain popup state change');
        if(type === 1){
            setExplain_popup_state(explain_popup_state => !explain_popup_state);
        }
        else if(type === 2){
            setExplain_popup_state2(explain_popup_state2 => !explain_popup_state2);
        }
    }
    const change_guide_state = () => {
        setGuide_state(guide_state => !guide_state);
    }
    return(
        <>  
            {loading_popup_state ? <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending}/> : null}
            {guide_state ? <Guide_popup setGuide_state={setGuide_state}/> : null}
            <canvas ref={canvas_ref}></canvas>
            <input type="button" className="make_queze_guide_input all_btn" value="설명서" onClick={change_guide_state}></input>
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            
            <form encType="multipart/form-data" ref={form_dom_ref} className="form_main2" method="POST" action={process.env.REACT_APP_SERVER_URL+serverurl} target="iframe"> {/* action="http://localhost:45509/upload_img" method="POST" action={process.env.REACT_APP_SERVER_URL+'/upload_img'} */}
                {type === 'modify'?
                <>
                <input type="hidden" value={roomName} name="roomName"></input>
                <input type="hidden" name="last_num" value={Number(last_num_ref.current)}></input> 
                </> :
                <>
                    <div className="main_title">
                        <input type="text" placeholder="제목" name="title" ref={title_ref}></input>
                    </div>
                    <div className="label">
                        <p title="모든 사용자가 티어표를 수정할 수 있습니다">
                            공개 수정 허용
                            <svg className="all_btn" onClick={(e)=>{change_explain_popup_state(e,1)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.14939 7.8313C8.57654 5.92179 10.0064 4 12 4V4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14V14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.8313Z" stroke="#222222"/>
                            <circle cx="12" cy="19" r="2" stroke="#222222"/>
                            </svg>
                        </p>
                        {explain_popup_state ? <Explain_popup text={"이 티어표를 참여한 모든 사람이 새로운 선택지를 추가하는 등 현재 티어표를 수정할 수 있습니다."} top={"-7%"} left={"20%"}></Explain_popup> : null}
                        <input type="checkbox" value="수정가능" name="publicAccess"></input> 

                    </div>
                    <div className="label">
                        <p title="비밀번호를 설정하여 일부만 참여할 수 있게합니다.">일부 공개
                            <svg className="all_btn" onClick={(e)=>{change_explain_popup_state(e,2)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.14939 7.8313C8.57654 5.92179 10.0064 4 12 4V4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14V14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.8313Z" stroke="#222222"/>
                            <circle cx="12" cy="19" r="2" stroke="#222222"/>
                            </svg>
                        </p>
                        {explain_popup_state2 ? <Explain_popup text={"비밀번호를 아는 사람들만 참여할 수 있습니다, 검색창에서 검색하거나 공유 링크를 통해 접속후 비밀번호를 입력해야 참여할 수 있습니다."} top={"-7%"} left={"20%"}></Explain_popup> : null}
                        <input type="checkbox" onChange={change_pass_tinyint}></input>
                        {
                            passtinyint ? 
                            <>
                                <input type={password_preview_state} name="password" ref={password_ref} placeholder="비밀번호"></input>
                                <span type="button" onClick={change_password_preview_state}>
                                    {
                                        password_preview_state === 'text' ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="3.5" stroke="#222222"/>
                                        <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#222222"/>
                                        </svg>
                                      :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.1239 9.00251C13.6822 9.06583 14.9342 10.3178 14.9975 11.8761L15.9202 12.7988ZM9.39311 10.5143C9.14295 10.9523 9 11.4595 9 12C9 13.6569 10.3431 15 12 15C12.5405 15 13.0477 14.857 13.4857 14.6069L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.39311 10.5143Z" fill="#222222"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.1537 17.2751L15.4193 16.5406C14.3553 17.1196 13.1987 17.5 12 17.5C10.3282 17.5 8.73816 16.7599 7.36714 15.7735C6.00006 14.79 4.89306 13.5918 4.19792 12.7478C3.77356 12.2326 3.72974 12.1435 3.72974 12C3.72974 11.8565 3.77356 11.7674 4.19792 11.2522C4.86721 10.4396 5.9183 9.29863 7.21572 8.33704L6.50139 7.62271C5.16991 8.63072 4.10383 9.79349 3.42604 10.6164L3.36723 10.6876C3.03671 11.087 2.72974 11.4579 2.72974 12C2.72974 12.5421 3.0367 12.913 3.36723 13.3124L3.42604 13.3836C4.15099 14.2638 5.32014 15.5327 6.78312 16.5853C8.24216 17.635 10.0361 18.5 12 18.5C13.5101 18.5 14.9196 17.9886 16.1537 17.2751ZM9.18993 6.06861C10.0698 5.71828 11.0135 5.5 12 5.5C13.9639 5.5 15.7579 6.365 17.2169 7.41472C18.6799 8.46727 19.849 9.73623 20.574 10.6164L20.6328 10.6876C20.9633 11.087 21.2703 11.4579 21.2703 12C21.2703 12.5421 20.9633 12.913 20.6328 13.3124L20.574 13.3836C20.0935 13.9669 19.418 14.721 18.5911 15.4697L17.883 14.7617C18.6787 14.0456 19.3338 13.3164 19.8021 12.7478C20.2265 12.2326 20.2703 12.1435 20.2703 12C20.2703 11.8565 20.2265 11.7674 19.8021 11.2522C19.107 10.4082 18 9.21001 16.6329 8.22646C15.2619 7.24007 13.6718 6.5 12 6.5C11.3056 6.5 10.6253 6.62768 9.96897 6.84765L9.18993 6.06861Z" fill="#222222"/>
                                        <path d="M5 2L21 18" stroke="#222222"/>
                                        </svg> 
                                    }
                                </span>
                            </>
                            :
                            <input type="password" disabled></input>
                        }
                    </div>    
                </>
                }

                <div className="drop_img_area">
                    <input className="all_btn" type="file" accept="image/*" ref={file_ref}  multiple placeholder="이미지 선택" id={0} onChange={e=>{change_img(e)}} onDrop={change_img_drop} onDragEnter ={dragenter} onDragLeave={dragover} name="img"></input>
                    <p>이미지 드레그 or 클릭</p>
                    <div onPaste={onpaste} className="all_btn">
                        <p>이미지 붙여넣기</p>
                    </div>
                </div>
                {/* <input type="text" onPaste={onpaste}></input> */}
                <div className="queze_area">
                    {   
                    img_arr.map((e,i)=>{
                        return(
                            <Make_queze_img key={i} img={e.img} i={i} explain_text_ref={explain_text_ref} delete_img={delete_img} img_name={e.img_name} ></Make_queze_img>
                        )
                    })
                    }
                </div>
                    
                <div className="Main2_sumit_btn">
                    <input type="button" value="완료"  onClick={img_upload}></input>
                </div>
            </form>
        </>
    )
}
export default Main2_make_queze_basic;
// onChange={processChange(change_text)}
