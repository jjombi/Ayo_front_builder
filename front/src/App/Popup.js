import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = () => {
    const navigate = useNavigate();
    const navi_fun = () =>{
        navigate('/');
    }
    return(
        <>
            <div className="Popup_main popup">
                <p className="popup_p popup">메세지</p>
                <input type="button" value="확인" className="popup popup_btn" onClick={navi_fun}></input>
            </div>
        </>
    );
}
export default Popup;