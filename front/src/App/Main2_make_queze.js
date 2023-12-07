import React,{useEffect, useRef,useState} from "react";
import { useForm } from "react-hook-form"
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import { server_url, dragenter, dragover, processChange } from "./public/WorldRank";
import AWS from "aws-sdk";

const Main2_make_queze = () => {
    const navigate = useNavigate();
    const [render, setRender] = useState(0);
    const [img_arr, setImg_arr] = useState([]); 
    const text_ref = useRef([]);
    const img_name_ref = useRef([]);
    const img_arr_ref = useRef([]);
    const text_dom_ref = useRef([]);
    const { handleSubmit } = useForm();
    const form_dom_ref = useRef();
    const file_ref = useRef();
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
    const img_upload = async (e) => {
        
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
        img_arr_ref.current = [...img_arr_ref.current,...e.dataTransfer.files]
        console.log('img_arr_ref.current in change img drop',img_arr_ref.current,e.dataTransfer.files.length);

        let img_arr_ = [];
        let i = 0;
        const datatransfer = new DataTransfer();
        console.log('i 초기화 이후',i,img_arr_ref.current);

        img_arr_ref.current.map(ev=>{
            const reader = new FileReader();
            reader.readAsDataURL(ev);
            console.log('ev',ev);
            if(ev.size > 1000) console.log('이미지 파일 1MB 이상 !!');
            if(ev.size > 1024 * 1024) alert('이미지 파일 1MB 이상 !!');
            reader.onload = () => {
                img_arr_ = [...img_arr_,
                    <div className="a_queze_img" key={i}>
                        <img src={reader.result} key={i+2}></img>  
                        <button onClick={delete_img} id={i} key={i+5} title="이미지 삭제 버튼">X</button>                                 
                        <textarea type="text" placeholder="설명" rows={1} name="text" key={i+3}  onKeyDown={preventDefault}  ></textarea>
                        <input type="hidden" name="img_name" value={ev.name} key={i+4}></input>
                    </div> 
                ]
                datatransfer.items.add(ev);
                e.target.files = datatransfer.files;
                console.log(i,'이미지 드랍해서 바꿀때 img_arr_ref.map img_arr_ : ',img_arr_,'datatransfer.files.length',datatransfer.files.length,'e.target.files',e.target.files);
                setImg_arr(img_arr_);
                i++;
            }     

            e.target.style.backgroundColor = "white"
        })

        console.log('e.target.files in drop change img',e.target.files);

    }
    const change_img = (e) => {
        e.preventDefault();
        console.log('change img func',e);
        console.log('change img func dataTransfer is undefind',e.target.files.length,'img_arr_ref.current : ',img_arr_ref.current);
        img_arr_ref.current = [...img_arr_ref.current,...e.target.files];
        let text_dom_let = [...text_dom_ref.current];
        let img_arr_ = [];
        let i = 0;
        const datatransfer = new DataTransfer();

        img_arr_ref.current.map(ev=>{
            // const result = file_size_checker(ev);
            // if(result){
                const reader = new FileReader();
                reader.readAsDataURL(ev);
                reader.onload = () => {
                    console.log(i,img_arr_);
                    img_arr_ = [...img_arr_,
                        <div className="a_queze_img" key={i}>
                            <img src={reader.result} key={i+1}></img> 
                            <button onClick={delete_img} id={i} key={i+5} title="이미지 삭제 버튼">X</button>                                 
                            <textarea type="text" placeholder="설명" rows={1} name="text" key={i+4} onKeyDown={preventDefault} ></textarea>
                            <input type="hidden" name="img_name" value={ev.name} key={i+3}></input>
                        </div>
                    ]
                    datatransfer.items.add(ev);
                    text_dom_ref.current = text_dom_let;
                    e.target.files = datatransfer.files;
                    console.log('arr[i]',text_dom_ref.current,i,ev);
                    setImg_arr(img_arr_);
                    i++;
                }   
            // }  
            // else{
            //     e.target.files[]
            // }
        })

        console.log('datatransferdatatransferdatatransfer datatransfer : ',e.target.files.length,'img_arr_ref.current',img_arr_ref.current);
    }
    const file_size_checker = (ev) => {
        if(ev.size > 1024) { //1024 * 1024
        alert('이미지 파일 1MB 이상 !!');
        return false;
    }
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
    return(
        <div className="Main2_root">

            <Header></Header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <form encType="multipart/form-data" ref={form_dom_ref} className="form_main2" method="POST" > {/* action="http://localhost:45509/upload_img" method="POST" action={server_url+'/upload_img'} */}
                <div className="main_title">
                    {/* <p>제목 : </p> */}
                    <input type="text" placeholder="제목" name="title"></input>
                </div>

                <div className="drop_img_area">
                    {/* <input type="fils"  name="img"></input> */}
                    <input type="file" accept="image/*" ref={file_ref} multiple placeholder="이미지 선택" id={0} onChange={e=>{change_img(e)}} onDrop={change_img_drop} onDragEnter ={dragenter} onDragLeave={dragover} name="img"></input>
                    <p>이미지를 드레그 하세요</p>
                </div>

                <div className="queze_area">
                    {/* <div className="a_queze_img" >
                        <img src={img}></img>     
                        <button onClick={delete_img}>X</button>                                 
                        <input type="text" placeholder="설명" name="text"></input>
                        <input type="hidden" name="img_name"></input>
                    </div>
                    <div className="a_queze_img" >
                        <img src={img}></img>     
                        <button>X</button>                                 
                        <input type="text" placeholder="설명" name="text"></input>
                        <input type="hidden" name="img_name"></input>
                    </div> */}
                    {   
                    img_arr
                    }
                </div>
                {/* <div className="plus_queze" >
                    <img ></img>                    
                    <input type="text" placeholder="제목" ></input>
                </div><div className="plus_queze" >
                    <img  ></img>                    
                    <input type="text" placeholder="제목"></input>
                </div> */}
                {/* <iframe name='submitAction' ></iframe> */}


            </form>
            <div className="Main2_sumit_btn">
                <button type="button" value="완료"  onClick={img_upload}></button>
            </div>
        </div>
    )
}
export default Main2_make_queze;
// onChange={processChange(change_text)}
