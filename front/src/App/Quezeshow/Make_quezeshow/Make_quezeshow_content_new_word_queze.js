import React, {useEffect, useRef, useState} from "react";
import '../../css.css';
import { dragenter, dragover, processChange } from "../../public/WorldRank";
import img from '../../Img_folder/no_image.jpg';
import {chenge_textarea_height} from '../../public/WorldRank';
const Make_quezeshow_content_new_word_queze = ({index,file_ref,content_object,delete_,onpaste, change_text, change_title, change_img}) => {
    
    return(
        <section className="make_quezeshow_content_root">
            <input className="make_quezeshow_content_deletebtn" type="button" onClick={()=>delete_(index)} value={"X"}></input>
            {
                content_object[index].src === '' || content_object[index].src === 'data:image/jpeg;base64,' 
                ?
                <img src={img} className="make_quezeshow_content_img"></img>
                :
                <img src={content_object[index].src} className="make_quezeshow_content_img"></img>
            }
            {
                content_object[index].src === '' || content_object[index].src === 'data:image/jpeg;base64,'
                ?
                <input type="text" hidden value={false} name="img_tinyint" readOnly></input>
                :
                <input type="text" hidden value={true} name="img_tinyint" readOnly></input>
            }
            <input id="file" type="file" className="make_quezeshow_content_file allbtn" onChange={e=>{change_img(e,index)}} onDragEnter ={dragenter} onDragLeave={dragover}></input>
            <div className="make_quezeshow_content_file_onpaste allbtn" onPaste={(e)=>{onpaste(e,index)}}>
                <p className="allbtn">이미지 붙여 넣기</p>
            </div>
            <textarea type="text" maxLength={40} value={content_object[index].title} rows={1} name="content_title" className="Make_quezeshow_content_title" placeholder={`문제 제목`} onChange={(e)=>{change_title(e,index);chenge_textarea_height(e)}}></textarea>
            <p>ex 얼죽아</p>
            <textarea type="text" maxLength={120} value={content_object[index].text} rows={1} name="answer" className="Make_quezeshow_content_title" placeholder={`정답`} onChange={(e)=>{change_text(e,index);chenge_textarea_height(e)}}></textarea>
            <p>","로 구분지어 주세요, ex 얼어, 죽어도, 아이스 아메리카노</p>
        </section>
    )
}
export default Make_quezeshow_content_new_word_queze;
