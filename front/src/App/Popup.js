import { useEffect,useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = (props) => {

    // const [margin_,setMargin_] = useState();

    // useEffect(()=>{
    //     setMargin_(35);
    // },[])
    
    return(
        <>
            <div className="Popup_main popup">
                <div className="Popup_main_content" >{/*style={{backgroundColor : `rgba(0,0,0,${props.opacity_.current})`}}  style={{marginTop : `${margin_}%`}} onClick={props.func}*/}
                    <p className="popup_p ">{props.text}</p>
                    <input type="button" value="확인" className=" btn_basic popup_btn" onMouseDown={(e) => {e.preventDefault()}} onClick={props.func}></input>
                </div>
                </div>
        </>
    );
}
export default Popup;