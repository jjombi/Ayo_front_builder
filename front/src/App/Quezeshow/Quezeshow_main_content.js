import React from "react";
import '../css.css';
import { useNavigate } from "react-router-dom";
import img from '../Img_folder/no_image.jpg';
import Comment_likes from "../Comment_likes";
const Quezeshow_main_content= ({index,src,uuid,title,roomnum,quezeshow_type,explain_text}) => {
    const navigate = useNavigate();
    const result_click = () => {
        navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid}&quezeshow_type=${quezeshow_type}&title=${title}`);
    }
    const A_queze_click = () => {
        navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&quezeshow_type=${quezeshow_type}&title=${title}&explain_text=${explain_text}`);
    }
    return(
        <button className="plus_queze">
            {
                src === 'data:image/jpeg;base64,' ? <img src={img}></img> : <img src={src}></img>
            }
            <div>
                <p className="quezeshow_p">{title}</p>
                <div>
                    {
                        quezeshow_type === 'vote' 
                        ?
                        <>
                            <input type="button" value="결과 보기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click()}}></input>
                            <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click()}}></input>
                            <Comment_likes uuid={uuid} type={'quezeshow'}></Comment_likes>
                        </>
                        :
                        <>
                            <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click()}}></input>
                            <Comment_likes uuid={uuid} type={'quezeshow'}></Comment_likes>
                        </>
                    }
                    
                    {/* <Comment_likes uuid={uuid} type={'Main_queze'}></Comment_likes> */}
                </div>
            </div>
        </button>
    )

}
export default Quezeshow_main_content;