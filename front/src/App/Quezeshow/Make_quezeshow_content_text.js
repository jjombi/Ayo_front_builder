import React, {useEffect, useRef, useState} from "react";
import '../css.css';
import { dragenter, dragover, processChange } from "../public/WorldRank";
import img from '../Img_folder/no_image.jpg';
import {chenge_textarea_height} from '../public/WorldRank';
const Make_quezeshow_content_text = ({}) => {
    
    return(
        <section className="make_quezeshow_content_root">
            <textarea type="text" maxLength={40} rows={1} name="content_title" className="Make_quezeshow_content_title" placeholder={`문제 제목을 입력해 주세요`} onChange={chenge_textarea_height}></textarea>
            <textarea type="text" maxLength={120} rows={1} name="answer" className="Make_quezeshow_content_title" placeholder="답을 입력해 주세요" onChange={chenge_textarea_height}></textarea>
        </section>
    )
}
export default Make_quezeshow_content_text;
