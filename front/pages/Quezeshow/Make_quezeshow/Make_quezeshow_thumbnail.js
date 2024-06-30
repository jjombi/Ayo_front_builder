import React from "react";
import { dragenter, dragover, processChange } from "../../../functions/WorldRank";    

const Make_quezeshow_thumbnail = ({main_img,change_img,onpaste,delete_thumnail}) => {


    return(
    <section className="make_quezeshow_main_img_content_root">
        <p>섬네일</p>
        <p>선택하지 않으면 가장 먼저 들어온 이미지를 사용합니다</p>
        <div className="make_quezeshow_content_content_img_area">
        {
            main_img[1] === null 
            ?
                <section className="img_select_area">
                    <input id="file" type="file" className="make_quezeshow_content_file allbtn" onChange={e=>{change_img(e,null,'main_img')}} onDragEnter ={dragenter} onDragLeave={dragover}></input>
                    <div className="img_select_area_onpaste allbtn" onPaste={(e)=>onpaste(e,null,'main_img')}>
                        <p className="allbtn">이미지 붙여 넣기</p>
                    </div>
                </section>
            :
            <>
            <img src={main_img[1]} className="make_quezeshow_content_img"></img>
            <button className="all_btn" type="button" title="섬네일 삭제" onClick={(e)=>{e.preventDefault();delete_thumnail(e)}}>X</button>
            </>
        }
        </div>
    </section>
    )
}

export default Make_quezeshow_thumbnail;