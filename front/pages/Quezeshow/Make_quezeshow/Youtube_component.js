import React,{useEffect, useState} from "react";
import YouTube from 'react-youtube';

const Youtube_component = ({id,index,setMax_video_length,setMax_video_length_func}) => {
    // useEffect(()=>{
    //     // console.log(id);
    // })
    const opts = {
        height: '180',
        width: '320',
        playerVars: {
            autoplay: 1, // Do not autoplay the video initially
            controls: 1, // Hide video controls
            loop: 1, // Loop the video
            iv_load_policy: 3, // Don't show video annotations
            modestbranding: 1, // Hide YouTube logo
            fs: 0, // Hide full screen button
            disablekb: 1, // Disable keyboard control
            start: 0, // Start from the beginning
            end: 999999, // Set a large value for end time to effectively play the entire video
            enablejsapi : 1,
            rel : 0,
        },
    };
    const onPlayerReady_ = (e) => {
        // console.log('onPlayerReady_');
        // console.log('event',e,e.target.getDuration());
        e.target.playVideo();
        e.target.hideVideoInfo();
        e.target.setLoop();
        setMax_video_length(max_video_length => e.target.getDuration());
        setMax_video_length_func(e.target.getDuration(),index);
    } 
    const onPlayerEnd_ = (e) => {
        // console.log('onPlayerEnd_');
        // console.log('onPlayerEnd e:',e);
        e.target.playVideo();
        e.target.hideVideoInfo();
        e.target.setLoop();
    }
    return(
        <YouTube videoId={id} opts={opts} onReady={onPlayerReady_}  onEnd={onPlayerEnd_}/>
    )
}
export default Youtube_component;