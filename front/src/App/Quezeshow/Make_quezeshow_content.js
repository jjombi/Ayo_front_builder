import React, {useEffect, useRef, useState} from "react";
import '../css.css';
import { dragenter, dragover, processChange } from "../public/WorldRank";

const Make_quezeshow_content = ({index,content_state,setContent_state,canvas_ref,file_ref}) => {
    const [src, setSrc] = useState('');
    const [img_tinyint, setImg_tinyint] = useState(false);
    console.log('index',index);

    useEffect(()=>{
        file_ref.current[index] = '';
    },[])

    const change_img = (e) => {
        e.preventDefault();
        // console.log('클릭 후 이미지 선택');
        basic_change_img(e.target.files,true);
    }
    
    const basic_change_img = (files,type) => {
        console.log(files);
        const file = [...files];
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (ev) => {
            const image = new Image();
            image.src = reader.result;
            image.name = ev.name;
            image.onload = () => {
                imageSizeChange(image);
            };
            setSrc(src=> reader.result);
            setImg_tinyint(img_tinyint=> true);
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
        file_ref.current[index] = file;

    }
    const delete_ = () => {
        file_ref.current = file_ref.current.filter((e,i)=>{return(i !== Number(index))});
        const content_state_ = content_state.filter((e,i)=>{return(i !== Number(index))});
        setContent_state(content_state => [...content_state_]);
    }
    return(
        <section className="make_quezeshow_content_root">
            <input className="make_quezeshow_content_deletebtn" type="button" onClick={delete_} value={"X"}></input>
            <img src={src} className="make_quezeshow_content_img"></img>
            <input type="text" hidden value={img_tinyint} name="img_tinyint"></input>
            <input type="file" className="Make_quezeshow_content_file" onChange={e=>{change_img(e)}} onDragEnter ={dragenter} onDragLeave={dragover}></input>
            <input type="text" name="content_title" className="Make_quezeshow_content_title" placeholder="제목"></input>
            <input type="text" name="explain_text" className="Make_quezeshow_content_text" placeholder="설명"></input>
        </section>
    )
}
export default Make_quezeshow_content;
