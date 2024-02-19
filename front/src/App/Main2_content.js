import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Comment_likes from "./Comment_likes";
import Password_popup from "./Password_popup";
const Main2_content = ({roomName, src, title, existence, uuid, password}) => {
    const navigate = useNavigate();
    const [popup_state,setPopup_state] = useState(false);
    const [type,setType] = useState();
    const A_queze_click = (roomName) => {
        // console.log('move to a queze page, roomName : ',roomName,'title : ',title);
        if(password === ''){
            navigate(`/choosequezetype?roomName=${roomName}&title=${title}`);
        }
        else{
            setPopup_state(true);
            setType('queze');
        }
    }
    const result_click = (roomName) => {
        // console.log('move to result page, roomName : ',roomName);
        if(password === ''){
            navigate(`/result?roomName=${roomName}&title=${title}`);
        }
        else{
            setPopup_state(true);
            setType('result');
        }
    }

    return(
        <>
            {
                popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomName={roomName} title={title} type={type}></Password_popup> : null
            }
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
        </>
    )
}
export default Main2_content;