import React from "react";

const Tag_area = ({tag,change_tag, droptag, tag_arr}) => {
    return(
        <div className="tag_area">
        {/* <input type="button" id="tag" value="없음" style={tag === '' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input>
        <input type="button" id="tag" value="이어말하기" style={tag === '(이어말하기)' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input>
        <input type="button" id="tag" value="이모지퀴즈" style={tag === '(이모지퀴즈)' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input>
        <input type="button" id="tag" value="신조어퀴즈" style={tag === '(신조어퀴즈)' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input>
        <input type="button" id="tag" value="음악퀴즈" style={tag === '(음악퀴즈)' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input>
        <input type="button" id="tag" value="이미지퀴즈" style={tag === '(이미지퀴즈)' ? {backgroundColor : '#8b8b8b'}:{backgroundColor : '#ffffff'}} onClick={change_tag}></input> */}
        {
            tag_arr.map((e,i)=> {
                return(
                    <div key={i}>  
                        <p id="tag" value="이미지퀴즈">{e}</p>
                        <button type="button" className="all_btn" onClick={(ev)=>{ev.preventDefault();droptag(i)}}>x</button>
                    </div>
                )
            })
        }
        </div>
    )
}
export default Tag_area;