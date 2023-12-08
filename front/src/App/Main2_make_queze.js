import React,{useEffect, useRef,useState} from "react";
import { useForm } from "react-hook-form"
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import { server_url, dragenter, dragover, processChange } from "./public/WorldRank";
import AWS from "aws-sdk";
import Adfit from "./Adfit";
import Footer from "./Footer";

const Main2_make_queze = () => {
    const [img_arr, setImg_arr] = useState([]); 
    const text_ref = useRef([]);
    const img_arr_ref = useRef([]);
    const text_dom_ref = useRef([]);
    const form_dom_ref = useRef();
    const file_ref = useRef();
    const title_ref = useRef();
    const lastest_i = useRef(0);

    const region = "ap-northeast-2";
    const bucket = "dlworjs";
    const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;


    AWS.config.update({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    });

    console.log('assecc kry',AWS.config.credentials,accessKey,secretAccessKey);

    useEffect(()=>{
        console.log('render');
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
            console.log('이미지 업로드 시작',server_url+'/selectroomname');
            axios({
                method : "GET",
                url : server_url+'/selectroomname',
            }).then((res)=>{
                console.log('select roomName res',res);
                for(let i = 0;i < file_ref.current.files.length; i++){
                
                    console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,' and body :',file_ref.current.files[i]);
                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            ACL: 'public-read',
                            Bucket: bucket, // 버킷 이름
                            Key: `${res.data}/img`+i + ".jpg", // 유저 아이디
                            Body: file_ref.current.files[i], // 파일 객체
                        },
                    });
                    console.log('upload',upload);
                    const promise = upload.promise();
                    promise.then(()=>{
                        console.log('success upload',upload,i,file_ref.current.files.length-1);
                        if(i === file_ref.current.files.length-1){
                            form_dom_ref.current.submit();
                        }
                    });
                }       
            })
        }
        
    
    }
    const preventDefault = (e) => {
        console.log('preventDefault and clicked this input');
        if(e.keyCode === 13){
            console.log('preventDefault and clicked enter');
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
        basic_change_img(e.dataTransfer.files);
        img_arr_ref.current = [...img_arr_ref.current,...e.dataTransfer.files]
        e.target.style.backgroundColor = "white"
        

    }
    const basic_change_img = (files) => {
        console.log('basic change img 에서 files : ',files.length);
        const files_to_arr = [...files]; // files 는 배열이 아님 배열로 바꿔서 map
        let img_arr_ = [...img_arr];
        const datatransfer = new DataTransfer();

        files_to_arr.map(ev=>{
            datatransfer.items.add(ev);
            file_ref.current.files = datatransfer.files;

            const reader = new FileReader();
            reader.readAsDataURL(ev);
            reader.onload = () => {
                img_arr_ = [...img_arr_,
                    <div className="a_queze_img" key={lastest_i.current}>
                        <img src={reader.result} key={lastest_i.current+2}></img>  
                        <button onClick={delete_img} id={lastest_i.current} key={lastest_i.current+5} title="이미지 삭제 버튼">X</button>                                 
                        <textarea type="text" placeholder="설명" rows={1} name="text" key={lastest_i.current+3}  onKeyDown={preventDefault}  ></textarea>
                        <input type="hidden" name="img_name" value={ev.name} key={lastest_i.current+4}></input>
                    </div> 
                ];
                setImg_arr(img_arr_);
                lastest_i.current = lastest_i.current + 1;
            }
        })
        
    }
    const change_img = (e) => {
        e.preventDefault();
        console.log('클릭 후 이미지 선택');
        basic_change_img(e.target.files);
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
        let arr = img_arr_ref.current.filter((_,e)=>{return(e !== Number(arr_num))});
        let img_arr_  = [];
        let i = 0;
        const datatransfer = new DataTransfer();
        console.log('이미지 삭제 ',file_ref.current.files,'arr_num',arr_num,'arr 잘린 후',arr,' & ',img_arr_ref.current,'arr.length',arr.length);
        if(arr.length === 0){
            console.log('arr.length is empty');
            img_arr_ref.current = [];
            file_ref.current.files = datatransfer.files;
            setImg_arr([]);
        }else{
            img_arr_ref.current = arr.map(ev=>{
                const reader = new FileReader();
                reader.readAsDataURL(ev);
                reader.onload = () => {
                    img_arr_ = [...img_arr_,
                        <div className="a_queze_img" key={i}>
                            <img src={reader.result} key={i+2}></img>  
                            <button onClick={delete_img} id={i} key={i+5} title="이미지 삭제 버튼">X</button>                                 
                            <textarea type="text" placeholder="설명" rows={1} name="text" key={i+3}  onKeyDown={preventDefault} ></textarea>
                            <input type="hidden" name="img_name" value={ev.name} key={i+4}></input>
                        </div>  
                    ]
                    datatransfer.items.add(ev);
                    file_ref.current.files = datatransfer.files;
                    console.log(i,img_arr_ref.current,'이미지 드랍해서 바꿀때 img_arr_ref.map img_arr_ : ',img_arr_,'datatransfer.files.length',datatransfer.files.length,'e.target.files',file_ref.current.files);
                    setImg_arr(img_arr_);
                    i++;
                }     
            })
        }
        
    }
    const onpaste = (e) => {
        // datatransfer.items.add(e.clipboardData.files[0]);
        // file_ref.current.files = datatransfer.files;
        console.log('onpaste');

        if (e.clipboardData.files.length) {
            basic_change_img(e.clipboardData.files);
        }
    }
    const focus_start = (e) => {
        e.
        console.log('focus_start');
    }
    return(
        <div className="Main2_root">

            <Header></Header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <form encType="multipart/form-data" ref={form_dom_ref} className="form_main2" method="POST" action={'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/upload_img'}> {/* action="http://localhost:45509/upload_img" method="POST" action={server_url+'/upload_img'} */}
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
