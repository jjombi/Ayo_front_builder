import React,{useEffect, useState} from "react";
import YouTube from 'react-youtube';

const Youtube_component_in_content = ({id,start,end,style}) => {
    useEffect(()=>{
        console.log(id);
    })
    const opts = {
        height: '270',
        width: '480',
        playerVars: {
            autoplay: 0, // Do not autoplay the video initially
            controls: 0, // Hide video controls
            loop: 1, // Loop the video
            iv_load_policy: 3, // Don't show video annotations
            modestbranding: 1, // Hide YouTube logo
            fs: 0, // Hide full screen button
            disablekb: 1, // Disable keyboard control
            start: start, // Start from the beginning
            end: end, // Set a large value for end time to effectively play the entire video
            enablejsapi : 1,
            rel : 0,
        },
    };
    const onPlayerReady_ = (e) => {
        console.log('onPlayerReady_');
        console.log('event',e,e.target.getDuration());
        e.target.playVideo(); 
        e.target.hideVideoInfo();
        e.target.setLoop();
    } 
    const onPlayerEnd_ = (e) => {
        console.log('onPlayerEnd_');
        console.log('onPlayerEnd e:',e);
        e.target.playVideo();
        e.target.hideVideoInfo();
        e.target.setLoop();
    }
    return(
        <YouTube style={style} videoId={id} opts={opts} onReady={onPlayerReady_}  onEnd={onPlayerEnd_}/>
    )
}
export default Youtube_component_in_content;