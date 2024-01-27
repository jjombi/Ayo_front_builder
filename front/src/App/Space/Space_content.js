
import React from "react";
import '../css.css';
import { useNavigate } from "react-router-dom";
import img from '../Img_folder/no_image.jpg';
const Space_content= ({src,uuid,title,intro_text}) => {
    const navigate = useNavigate();
    // const result_click = () => {
    //     navigate(`/quezeshow_result?roomnum=&uuid=${uuid}`);
    // }
    const navi_to_space = () => {
        navigate(`/quezeshow_main?space_uuid=${uuid}&space_title=${title}&intro_text=${intro_text}`);
    }
    return(
        <button className="plus_queze">
            {
                src === 'data:image/jpeg;base64,' ? <img src={img}></img> : <img src={src}></img>
            }
            <div>
                <p>{title}</p>
                <div>
                    {/* <input type="button" value="결과 보기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click()}}></input> */}
                    <input type="button" value="입장하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();navi_to_space()}}></input>
                    {/* <Comment_likes uuid={uuid} type={'Main_queze'}></Comment_likes> */}
                </div>
            </div>
        </button>
    )

}
export default Space_content;