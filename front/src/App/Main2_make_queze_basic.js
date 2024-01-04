import React,{useEffect, useRef,useState} from "react";
import { useForm } from "react-hook-form"
import './css.css';
import { useHref, useNavigate } from "react-router-dom";
import { useFormStatus } from 'react-dom';
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import { dragenter, dragover, processChange } from "./public/WorldRank";
import AWS from "aws-sdk";
import Adfit from "./Adfit";
import Footer from "./Footer";
import jimp from "jimp";
import Loading_popup from "./Loading_popup";
import Make_queze_img from "./Make_queze_img";
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
    const img_src_arr = useRef([]);
    const last_num_ref = useRef('');
    const [loading_popup_state,setLoading_popup_state] = useState(false);
    const {pending} = useFormStatus();
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
                last_num_ref.current = res.data[res.data.length-1].originalname[3];
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
                        Body: file_ref.current.files[file_ref.current.files.length-i-1], // 파일 객체
                    },
                });
                // console.log('upload',upload);
                const promise = upload.promise();
                promise.then(()=>{
                    // console.log('success upload',upload,i,img_src_arr.current.length-1);
                });
            })).then(()=>{
                const submit = form_dom_ref.current.submit();
                // console.log(submit);
                alert('완료');
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
        let max_size = 1280; //1980 1080 -> 495 , 270
        let width = image.width;
        let height = image.height;
        // console.log(image.width,image.height);
        if(width > height){ // 가로가 더 길때
            // console.log(width / height);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(width > 1600){
                    width = image.width / 4;
                    height = image.height / 4;
                }
                else if(width > 800){
                    width = image.width / 3;
                    height = image.height / 3;
                }

            }
        }else{              // 세로가 더 길때
            // console.log(height / width);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(height > 1600){
                    width = image.width / 4;
                    height = image.height / 4;
                }
                else if(height > 800){
                    width = image.width / 3;
                    height = image.height / 3;
                }

            }

        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        const imgUrl = canvas.toDataURL("image/jpeg", 0.5);
        console.log('결과물 imgUrl : ',imgUrl);
        const binary = window.atob(imgUrl.split(',')[1]);
        console.log('binary',binary);
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
    return(
        <>  
            {loading_popup_state ? <Loading_popup setLoading_popup_state={setLoading_popup_state} pending={pending}/> : null}
            <canvas ref={canvas_ref}></canvas>
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            <form encType="multipart/form-data" ref={form_dom_ref} className="form_main2" method="POST" action={process.env.REACT_APP_SERVER_URL+serverurl} target="iframe"> {/* action="http://localhost:45509/upload_img" method="POST" action={process.env.REACT_APP_SERVER_URL+'/upload_img'} */}
                {/* {
                    type === 'modify' ? <><button onClick={(e)=>{e.preventDefault(); setModify(false)}}>X</button> <input type="hidden" value={roomName} name="roomName"></input><input type="hidden" name="last_num" value={last_num_ref.current}></input></>: null
                } */}
                {type === 'modify'?
                null :
                <>
                    <div className="main_title">
                        <input type="text" placeholder="제목" name="title" ref={title_ref}></input>
                    </div>
                    <label>
                        <p>수정 가능 : </p>
                        <input type="checkbox" value="수정가능" name="publicAccess"></input> 
                        <button title="최애 티어을 누구나 수정 할 수 있도록 허용">!</button> 
                        <p>최애 티어을 누구나 수정 할 수 있도록 허용</p>
                    </label>
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
