import React from "react";
import {useNavigate} from 'react-router-dom';
import Comment_likes from "./Comment_likes";

const Main2_content = ({roomName, src, title, existence, uuid, publicAccess}) => {
    const navigate = useNavigate();
    const A_queze_click = (roomName) => {
        console.log('move to a queze page, roomName : ',roomName,'title : ',title);
        navigate(`/ayoworldrankaqueze?roomName=${roomName}&title=${title}&publicAccess=${publicAccess}`);
    }
    const result_click = (roomName) => {
        // console.log('move to result page, roomName : ',roomName);
        navigate(`/result?roomName=${roomName}&title=${title}`);
    }

    return(
        <button className="plus_queze">
            <img src={src}></img>
            <div>
                <p>{title}</p>
                <div>
                    <input type="button" value="결과 보기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click(roomName)}}></input>
                    <input type="button" value="시작 하기" className="all_btn all_btn_hover" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click(roomName)}}></input>
                    <Comment_likes uuid={uuid} type={'Main_queze'}></Comment_likes>
                </div>
            </div>
        </button>
    )
}
export default Main2_content;