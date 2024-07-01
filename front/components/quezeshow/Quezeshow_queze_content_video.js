import React, { useState } from "react";
import Youtube_component_in_content from "./Youtube_component_in_content";
import Audio_canvas from './Audio_canvas';
const Quezeshow_queze_content_video = ({data_type,img,start,end}) => {
    const [loading_state, setLoading_state] = useState(true);
    return(
        <div className="quezeshow_video_audio_image_area">
            {
                data_type === 'video'
                ?
                <Youtube_component_in_content style={{}} id={img} start={start} end={end}/>
                :
                data_type === 'audio'
                ?
                <div className="audio_area">
                    {/* <canvas className="audio_area_canvas" ref={canvas_ref}></canvas> */}
                    {/* <Audio_canvas></Audio_canvas> */}
                    {
                    loading_state 
                    ? 
                    <div className="loading">
                        <p>로딩중</p>
                    </div>
                    :
                    <Audio_canvas></Audio_canvas>
                    }
                    <Youtube_component_in_content style={{display: 'none'}} id={img} start={start} end={end} setLoading_state={setLoading_state}/>
                </div>
                :
                data_type === 'image' 
                ?
                    <img src={'data:image/jpeg;base64,'+img}></img>
                :
                data_type === 'text'
                ?
                <></>
                :
                null
            }
        </div>
    )
}
export default Quezeshow_queze_content_video;