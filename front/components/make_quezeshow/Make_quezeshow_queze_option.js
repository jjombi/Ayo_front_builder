import React from "react";

const Make_quezeshow_queze_option = ({quezeshow_type_clicked_btn,time_ref,time_checkbox,setTime_checkbox}) => {
    return(
        <section className="make_quezeshow_queze_option">
            {
                quezeshow_type_clicked_btn === 'vote'
                ?
                <div className="make_quezeshow_queze_option1">
                <div>
                </div>
                <div>
                    
                    <input type="number" hidden ref={time_ref} defaultValue={-1} name="settime"></input>
                    
                </div>
                </div>
                :
                <div className="make_quezeshow_queze_option1">
                <div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="14" r="8" stroke="white"/>
                    <path d="M12 14L12 11" stroke="white" strokeLinecap="round"/>
                    <path d="M17.5 7.5L19 6" stroke="white" strokeLinecap="round"/>
                    <path d="M10.0681 2.37059C10.1821 2.26427 10.4332 2.17033 10.7825 2.10332C11.1318 2.03632 11.5597 2 12 2C12.4403 2 12.8682 2.03632 13.2175 2.10332C13.5668 2.17033 13.8179 2.26427 13.9319 2.37059" stroke="white" strokeLinecap="round"/>
                    </svg>
                    <p>제한 시간</p> 
                    <input type="checkbox" id="checkbox" onChange={()=>{setTime_checkbox(time_checkbox => !time_checkbox)}}></input>
                </div>
                <div>
                    {
                        time_checkbox?
                        <>
                        <input type="number" ref={time_ref} value={5} min={0} max={100} name="settime"></input>초
                        </>
                        : 
                        <input type="number" ref={time_ref} defaultValue={-1} hidden name="settime"></input>
                    }
                </div>
                </div>
            }
        </section>
    )
}

export default Make_quezeshow_queze_option;