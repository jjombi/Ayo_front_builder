import React, { memo, useRef, useState } from "react";
import {chenge_textarea_height} from '@functions/WorldRank';
import axios from "axios";
import { customAxiosGet } from "@functions/Custom_axios/Custom_axios";
const Declaration = ({change_declaration, roomnum, uuid}) => {
    const declaration_reasion_ref = useRef();
    const [clicked,setClicked] = useState(null);
    
    const declaration_submit = () => {
        console.log(roomnum,uuid);
        customAxiosGet({
            url : '/declaration',
            params : {
                roomnum : roomnum,
                type    : clicked,
                resaion : declaration_reasion_ref.current.value
            }
        }).then((res)=>{
            console.log(res);
        })
        change_declaration();
    }
    const change_clicked = (e) => {
        setClicked(clicked => e.target.textContent);
    } 
    return(
        <section className="declaration_root" onClick={change_declaration}>
            <div className="declaration_content_area" onClick={(e)=>e.stopPropagation()}>
                <p>퀴즈쇼 신고</p>
                <button type="button" className="all_btn" style={clicked === '성적인 콘텐츠' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>성적인 콘텐츠</button>
                <button type="button" className="all_btn" style={clicked === '폭력적 또는 혐오스러운 콘텐츠' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>폭력적 또는 혐오스러운 콘텐츠</button>
                <button type="button" className="all_btn" style={clicked === '증오 또는 악의적인 콘텐츠' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>증오 또는 악의적인 콘텐츠</button>
                <button type="button" className="all_btn" style={clicked === '괴롭힘 또는 폭력' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>괴롭힘 또는 폭력</button>
                <button type="button" className="all_btn" style={clicked === '유해하거나 위험한 행위' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>유해하거나 위험한 행위</button>
                <button type="button" className="all_btn" style={clicked === '잘못된 정보' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>잘못된 정보</button>
                <button type="button" className="all_btn" style={clicked === '아동 학대' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>아동 학대</button>
                <button type="button" className="all_btn" style={clicked === '테러 조장' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>테러 조장</button>
                <button type="button" className="all_btn" style={clicked === '스팸 또는 혼동을 야기하는 콘텐츠' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>스팸 또는 혼동을 야기하는 콘텐츠</button>
                <button type="button" className="all_btn" style={clicked === '법적 문제' ? {backgroundColor : '#757575'} : null} onClick={(e)=>{e.stopPropagation();change_clicked(e)}}>법적 문제</button>
                <textarea type="text" rows={2} ref={declaration_reasion_ref} placeholder="추가 세부정보를 입력하세요" onChange={(e)=>{chenge_textarea_height(e)}}></textarea>
                <input type="button" className="all_btn" onClick={declaration_submit} value="신고"></input>
            </div>
        </section>
    )
}
export default memo(Declaration);