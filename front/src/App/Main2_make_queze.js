import React,{useEffect, useRef,useState} from "react";
import { useForm } from "react-hook-form"
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import { dragenter, dragover, processChange } from "./public/WorldRank";
import AWS from "aws-sdk";
import Adfit from "./Adfit";
import Footer from "./Footer";
import jimp from "jimp";
const Main2_make_queze = () => {
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
    })
    const upload_checker = () => {
        let return_message = {
            title    : '',
            img_text : ''
        };
        title_ref.current.value === '' ? return_message.title = '제목을 입력해 주세요' : return_message.title = '';
        return return_message;
    }
    const img_upload = async (e) => {
        const message = upload_checker()
        if(message.title !== '') alert(message.title);
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
                    const submit = form_dom_ref.current.submit();
                    // console.log(submit);
                    alert('완료');
                    // const promise = submit.promise();
                    // promise.then(()=>{
                    //     console.log('sbumit callback'); 
                    // })
                    // navigate('../ayoworldrank');
                    // console.log(form_dom_ref.current,form_dom_ref.current.target);
                    // parent.successCallback-
                })    
            })
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
    const explain_text_change = (e) => {
        const index = e.target.id;
        // console.log('explain_text_change 실향 됨, index : ',index,'설명 값 : ',e.target.value);
        explain_text_ref.current[index] = e.target.value;
    }
    const basic_change_img = (files,type) => {
        // console.log('basic change img 에서 files : ',files.length);
        // files 는 배열이 아님 배열로 바꿔서 map
        let files_to_arr = [...files];

        img_arr_ref.current = [...img_arr_ref.current,...files];
        let img_arr_ = [...img_arr]; //element 담고 있는 배열
        // console.log('basic change img 에서 files_to_arr : ',files_to_arr,);
        // lastest_i.current = lastest_i.current +  1;
        const datatransfer = new DataTransfer();
        img_arr_ref.current.map(ev=>{
            datatransfer.items.add(ev);
            file_ref.current.files = datatransfer.files;
        })

        files_to_arr.map(ev=>{
            // console.log('file ev',ev);
            const reader = new FileReader();
            reader.readAsDataURL(ev);
            reader.onload = () => {
                // console.log('index 값 들어 가기 전 lastest_i : ',lastest_i.current,'img arr : ',img_arr_);
                img_arr_ = [...img_arr_,
                    <div className="a_queze_img" key={lastest_i.current}>
                        <img src={reader.result} key={lastest_i.current+2}></img>  
                        <button onClick={delete_img} id={lastest_i.current} key={lastest_i.current+5} title="이미지 삭제 버튼">X</button>                                 
                        <textarea type="text" value={explain_text_ref.current[lastest_i.current]} placeholder="설명" rows={1} name="text" id={lastest_i.current} key={lastest_i.current+3} onKeyDown={preventDefault} onChange={(e)=>processChange(explain_text_change(e))}></textarea>
                        <input type="hidden" name="img_name" value={ev.name} key={lastest_i.current+4}></input>
                    </div> 
                ];
                const image = new Image();
                // console.log(reader.result);
                image.src = reader.result;
                image.name = ev.name;
                // console.log('image object',image);
                image.onload = function() {
                    imageSizeChange(image);
                };
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
        const datatransfer = new DataTransfer();
        // [...file_ref.current.files].map((e,i)=>{
        //     datatransfer.items.add(e);
        // })
        for(let i=0;i < file_ref.current.files.length-1;i++){
            datatransfer.items.add(file_ref.current.files[i]);
        }
        datatransfer.items.add(file);
        file_ref.current.files = datatransfer.files;
        // console.log(datatransfer.files);
        // img_src_arr.current = [...img_src_arr.current,file];
    }

    const file_size_checker = (ev) => {
        if(ev.size > 1024) { //1024 * 1024
        alert('이미지 파일 1MB 이상 !!');
        return false;
        }
        else return true;
    }
    const delete_img = (e) => {
        e.preventDefault();
        const arr_num = e.target.id;
        // console.log('delete img index : ',arr_num);
        img_arr_ref.current = [...file_ref.current.files];
        // console.log('delete img img_arr_ref : ',img_arr_ref.current);
        let new_img_arr = [];
        img_arr_ref.current = img_arr_ref.current.filter((_,ev)=>{return(ev !== Number(arr_num))});
        explain_text_ref.current = explain_text_ref.current.filter((_,ev)=>{return(ev !== Number(arr_num))});
        img_src_arr.current = img_src_arr.current.filter((_,ev)=>{return(ev !== Number(arr_num))});
        // console.log('delete img 삭제 후 img_arr_ref : ',img_arr_ref.current,'explain_text_ref : ',explain_text_ref.current);
        lastest_i.current = 0;
        const datatransfer = new DataTransfer();
        if(img_arr_ref.current.length === 0) setImg_arr([]);
        else {
            img_arr_ref.current.map(ev=>{
                // console.log('delete img map 안에서 ev : ',ev);
                datatransfer.items.add(ev);
                file_ref.current.files = datatransfer.files;
                const reader = new FileReader();
                reader.readAsDataURL(ev);
                reader.onload = () => {
                    new_img_arr = [...new_img_arr,
                        <div className="a_queze_img" key={lastest_i.current}>
                            <img src={reader.result} key={lastest_i.current+2}></img>  
                            <button onClick={delete_img} id={lastest_i.current} key={lastest_i.current+5} title="이미지 삭제 버튼">X</button>                                 
                            <textarea type="text" value={explain_text_ref.current[lastest_i.current]} placeholder="설명" rows={1} name="text" id={lastest_i.current} key={lastest_i.current+3} onKeyDown={preventDefault} onChange={(e)=>processChange(explain_text_change(e))}></textarea>
                            <input type="hidden" name="img_name" value={ev.name} key={lastest_i.current+4}></input>
                        </div>
                    ]
                    // console.log('delete img map 안에서 img_arr에 ev element 추가 new_img_arr: ',new_img_arr);
                    lastest_i.current = lastest_i.current + 1;
                    // console.log('file 삭제 new img arr : ',new_img_arr);
                    setImg_arr(new_img_arr);

                }
            });
        }
        
    }
    
    return(
        <div className="Main2_root">
            <canvas ref={canvas_ref}></canvas>
            <Header></Header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <iframe id="iframe" name="iframe" style={{display:'none'}} ></iframe>
            <form encType="multipart/form-data" ref={form_dom_ref} className="form_main2" method="POST" action={process.env.REACT_APP_SERVER_URL+'/upload_img'} target="iframe"> {/* action="http://localhost:45509/upload_img" method="POST" action={process.env.REACT_APP_SERVER_URL+'/upload_img'} */}
                <div className="main_title">
                    <input type="text" placeholder="제목" name="title" ref={title_ref}></input>
                </div>

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
                    img_arr
                    }
                </div>
                    
                <div className="Main2_sumit_btn">
                    <input type="button" value="완료"  onClick={img_upload}></input>
                </div>
                
                <Footer></Footer>
            </form>
        </div>
    )
}
export default Main2_make_queze;
// onChange={processChange(change_text)}
