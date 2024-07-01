import React, { useEffect, useState, memo } from "react";
// import Header from "../ayo_world_rank_header";
// import axios from "axios";
const Quezeshow_queze_content = ({index,img,text,title,uuid, clicked, setClicked, value,data_type}) => {
    const [style_, setStyle_] = useState('rgb(239, 239, 239)');
    useEffect(()=>{
        // axios({
        //     url : process.env.REACT_APP_SERVER_URL + '/',
        //     method : 'GET',
        // }).then(res=>{

        // })
        clicked === index ? setStyle_(style_ => 'rgb(199, 199, 199)') : setStyle_(style_ => 'rgb(239, 239, 239)')
    },[clicked])
    const content_click = () => {
        if(clicked === index){
            setClicked(clicked => null);
        }else{
            setClicked(clicked => index);
        }
    }
    return(
        <>
        {
            clicked !== '' 
            ?
            <button type="button" className="quezeshow_queze_content_root all_btn" onClick={content_click}>
                <h1>{index+1}</h1>
                {
                    img === 'data:image/jpeg;base64,' || data_type === 'text' ? null : 
                    <div className="img_area">
                        <img src={img}></img>
                        <div></div>
                    </div>
                }
                <div className="quezeshow_queze_content_title_text_area">
                    <p className="quezeshow_queze_content_title">{title}</p>
                    <p className="quezeshow_queze_content_text">{text}</p>
                    <div style={{backgroundColor : style_, width : '100%'}}></div>
                </div>
            </button>
            :
            <div className="quezeshow_queze_content_root quezeshow_queze_content_root_color">
                {/* <h1>{index+1}</h1> */}
                <div className="quezeshow_queze_content_value_p">
                    <p>{value}%</p>
                    <div></div>
                </div>
                {
                    img === 'data:image/jpeg;base64,' || data_type === 'text' ? null : 
                    <div className="img_area">
                        <img src={img}></img>
                        <div></div>
                    </div>
                }
                <div className="quezeshow_queze_content_title_text_area">
                    <p className="quezeshow_queze_content_title">{title}</p>
                    <p className="quezeshow_queze_content_text">{text}</p>
                    <div style={{width : `${value}%`}}></div>
                </div>
            </div>
        }
        </>
    )

}
export default memo(Quezeshow_queze_content);