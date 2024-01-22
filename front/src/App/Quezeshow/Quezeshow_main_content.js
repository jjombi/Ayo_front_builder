import React from "react";
import '../css.css';
import { useNavigate } from "react-router-dom";

const Quezeshow_main_content= ({index,src,uuid,title,roomnum}) => {
    const navigate = useNavigate();
    const result_click = () => {
        navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid}`);
    }
    const A_queze_click = () => {
        navigate(`/quezeshow_queze?roomnum=${roomnum}`);
    }
    return(
        <button className="plus_queze">
            <img src={src}></img>
            <div>
                <p>{title}</p>
                <div>
                    <input type="button" value="결과 보기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click()}}></input>
                    <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click()}}></input>
                    {/* <Comment_likes uuid={uuid} type={'Main_queze'}></Comment_likes> */}
                </div>
            </div>
        </button>
    )

}
export default Quezeshow_main_content;