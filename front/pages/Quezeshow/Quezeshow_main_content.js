import React, {memo, useState} from "react";
// import { useNavigate } from "react-router-dom";
import img from '../../public/Img_folder/no_image.jpg';
import Comment_likes from "../Comment_likes";
const Quezeshow_main_content= ({index,src,uuid,title,roomnum,quezeshow_type,explain_text,likes_queze,change_queze_likes}) => {
    const navigate = useNavigate();

    const [mouse_hover, setMouse_hover] = useState(false);

    const result_click = () => {
        navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid}&quezeshow_type=${quezeshow_type}&title=${title}`);
    }
    const A_queze_click = () => {
        // console.log('click');
        // if(quezeshow_type === 'Continue_speak'){
            navigate(`/quezeshow_before/${roomnum}`);
        // }else if(quezeshow_type === 'New_word_queze'){
        //     navigate(`/quezeshow_before/${roomnum}`);
        // }else if(quezeshow_type === 'queze'){
        //     navigate(`/quezeshow_before/${roomnum}`);
        // }else if(quezeshow_type === 'vote'){
        //     navigate(`/quezeshow_before/${roomnum}`);
        // }
    }
    const onMouseOver = () => {
        setMouse_hover(mouse_hover => true);
    }
    const onMouseOut = () => {
        setMouse_hover(mouse_hover => false);

    }
    return(
        <button className="plus_queze" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            {
                src === 'data:image/jpeg;base64,' ? <img src={img}></img> : <img src={src}></img>
            }
            {
                mouse_hover ?
                <section className="hover_section">
                {
                    quezeshow_type === 'vote' 
                    ?
                    <>
                        <input type="button" value="결과 보기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click()}}></input>
                        <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click()}}></input>
                        <Comment_likes uuid={uuid} type={'quezeshow'} likes_queze={likes_queze} change_queze_likes={change_queze_likes} index={index}></Comment_likes>
                    </>
                    :
                    <>
                        <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click()}}></input>
                        <Comment_likes uuid={uuid} type={'quezeshow'} likes_queze={likes_queze} change_queze_likes={change_queze_likes} index={index}></Comment_likes>
                    </>
                }
                </section> :
                null

            }
            <div>
                <p className="quezeshow_p">{title}</p>
            </div>
        </button>
    )

}
export default memo(Quezeshow_main_content);