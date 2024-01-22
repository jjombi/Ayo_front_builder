import React, { useEffect, useState } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import axios from "axios";
const Quezeshow_queze_content = ({index,img,text,title,uuid, clicked, setClicked, value}) => {
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
                    img === 'data:image/jpeg;base64,' ? null : 
                    <div className="img_area">
                        <img src={img}></img>
                        <div></div>
                    </div>
                }
                <p className="quezeshow_queze_content_title_text_area">
                    <p className="quezeshow_queze_content_title">{title}</p>
                    <p className="quezeshow_queze_content_text">{text}</p>
                    <div style={{backgroundColor : style_, width : '100%'}}></div>
                </p>
            </button>
            :
            <div className="quezeshow_queze_content_root" style={{border : style_}}>
                {/* <h1>{index+1}</h1> */}
                <p className="quezeshow_queze_content_value_p">
                    <p>{value}%</p>
                    <div></div>
                </p>
                {
                    img === 'data:image/jpeg;base64,' ? null : 
                    <div className="img_area">
                        <img src={img}></img>
                        <div></div>
                    </div>
                }
                <p className="quezeshow_queze_content_title_text_area">
                    <p className="quezeshow_queze_content_title">{title}</p>
                    <p className="quezeshow_queze_content_text">{text}</p>
                    <div style={{width : `${value}%`}}></div>
                </p>
            </div>
        }
        </>
    )

}
export default Quezeshow_queze_content;