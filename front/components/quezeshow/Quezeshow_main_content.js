import React, {memo, useState} from "react";
// import { useNavigate } from "react-router-dom";
import img from '@image/Img_folder/no_image.jpg';
import Comment_likes from "@comments_likes/Comment_likes";
import Image from 'next/image';
import { useRouter } from "next/router";
const Quezeshow_main_content= ({index,src,uuid,title,roomnum,quezeshow_type,explain_text,likes_queze,change_queze_likes}) => {


    const router_ = useRouter();
    const [mouse_hover, setMouse_hover] = useState(false);
    const result_click = () => {
        router_(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid}&quezeshow_type=${quezeshow_type}&title=${title}`);
    }
    const A_queze_click = () => {
        router_.push({
            pathname : `Quezeshow/${roomnum}`,
        });
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
                src === 'data:image/jpeg;base64,' ? <Image src={img} alt={title+'image'}></Image> : <img src={src}></img>
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