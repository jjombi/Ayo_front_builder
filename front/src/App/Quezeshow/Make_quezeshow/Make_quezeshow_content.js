import React, {useEffect, useRef, useState} from "react";
import YouTube from 'react-youtube';
import '../../css.css';
import { dragenter, dragover, processChange,chenge_textarea_height } from "../../public/WorldRank";
import img from '../../Img_folder/no_image.jpg';
import YouTubeComponent from "./Youtube_component";
import Make_quezeshow_content_basic from "./Make_quezeshow_content_basic";
// import { ReactComponent as yt_svg } from "../../Img_folder/icon8-youtube.svg";
const Make_quezeshow_content = ({index,file_ref,content_object,delete_,onpaste, change_text, change_title, change_img, queze_option_click,change_video_url,change_video_end_input_number,change_video_start_input_number,change_video_start,change_video_end, setMax_video_length_func}) => {
    const [src, setSrc] = useState(img);
    // const [video_id, setVideo_id] = useState(null);
    const [max_video_length,setMax_video_length] = useState(0);

    // console.log('index',index);
    useEffect(()=>{
        file_ref.current[index] = '';
        setSrc(src => img);
    },[])
    // useEffect(()=>{
    //     if(src === '' || src === 'data:image/jpeg;base64,'){
    //         setSrc(src =>img);
    //     }
    //     else{
    //         setSrc(src => content_object[index].src);
    //     }
    // },[content_object[index].src])
    useEffect(()=>{
        console.log(file_ref.current,content_object);
    })
    // const change_img = (e) => {
    //     e.preventDefault();
    //     // console.log('클릭 후 이미지 선택');
    //     basic_change_img(e.target.files);
    // }
    // const onpaste = (e) => {
    //     // console.log('onpaste');
    //     if (e.clipboardData.files.length) {
    //         basic_change_img(e.clipboardData.files);
    //     }
    // }
    // const basic_change_img = (files) => {
    //     // console.log(files);
    //     const file = [...files];
    //     // console.log(file,index);
    //     // if(file.length === 0) return null;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file[0]);
    //     reader.onload = (ev) => {

    //         const image = new Image();
    //         image.src = reader.result;
    //         image.name = ev.name;

    //         image.onload = () => {
    //             imageSizeChange(image);
    //         };

    //         setSrc(src=> reader.result);
    //         let content_object_ = [...content_object];

    //         let content_object__ = {
    //             src : reader.result,
    //             title : content_object[index].title,
    //             text : content_object[index].text
    //         };

    //         content_object_[index] = content_object__;
    //         setContent_object(content_object => [...content_object_]);
    //         setImg_tinyint(img_tinyint=> true);
    //     }
    // }
    // const imageSizeChange = ( image ) => {
    //     // console.log('image',image.alt,image.name);
    //     const canvas = canvas_ref.current

    //     let width = image.width;
    //     let height = image.height;
    //     // console.log(image.width,image.height);
    //     if(width > height){ // 가로가 더 길때
    //         // console.log(width / height);
    //         if(width / height <= 2){ // 비율이 2배 이하이면
    //             if(width > 4000){
    //                 width = image.width / 2;
    //                 height = image.height / 2;
    //             }


    //         }
    //     }else{              // 세로가 더 길때
    //         // console.log(height / width);
    //         if(width / height <= 2){ // 비율이 2배 이하이면
    //             if(height > 4000){
    //                 width = image.width / 2;
    //                 height = image.height / 2;
    //             }


    //         }

    //     }
    //     canvas.width = width;
    //     canvas.height = height;
    //     canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    //     const imgUrl = canvas.toDataURL("image/jpeg", 0.5);
    //     // console.log('결과물 imgUrl : ',imgUrl);
    //     const binary = window.atob(imgUrl.split(',')[1]);
    //     // console.log('binary',binary);
    //     const arraybuffer = new ArrayBuffer(binary.length);
    //     let bytes = new Uint8Array(arraybuffer);
    //     for(let i=0;i < binary.length; i++){
    //         bytes[i] = binary.charCodeAt(i);
    //     }
    //     // console.log('arrbuffer',bytes.buffer);
    //     const file = new File([bytes.buffer],image.name+'.jpg',{
    //         type : 'image/jpeg'
    //     });
    //     file_ref.current[index] = file;

    // }
    // const delete_ = () => {
    //     // console.log('index',index,'file_ref.current',file_ref.current,'content_state',content_state);
    //     file_ref.current = file_ref.current.filter((e,i)=>{return(i !== Number(index))});
    //     const content_state_ = content_state.filter((e,i)=>{return(i !== Number(index))});
    //     const content_object_ = content_object.filter((e,i)=>{return(i !== Number(index))});
    //     // console.log(file_ref.current,content_state_,content_object_);
    //     setContent_state(content_state => [...content_state_]);
    //     setContent_object(content_object => [...content_object_]);
    // }
    // const change_title = (e) => {
    //     let content_object_ = [...content_object];
    //     let content_object__ = {
    //         src : content_object[index].src,
    //         title : e.target.value,
    //         text : content_object[index].text
    //     };
    //     content_object_[index] = content_object__;
    //     setContent_object(content_object => [...content_object_]);
    // }
    // const change_text = (e) => {
    //     let content_object_ = [...content_object];
    //     let content_object__ = {
    //         src : content_object[index].src,
    //         title : content_object[index].title,
    //         text : e.target.value
    //     };
    //     content_object_[index] = content_object__;
    //     setContent_object(content_object => [...content_object_]);
    // }
    
    // const onPlayerReady = (e) => {
    //     console.log('event',e,e.target.getDuration());
    //     e.target.playVideo();
    //     e.target.hideVideoInfo();
    //     e.target.setLoop();
    //     setMax_video_length(max_video_length => e.target.getDuration());
    //     setMax_video_length_func(e.target.getDuration(),index);
    //     // setVideo_end(video_end => e.target.getDuration());
    // }
    // const onPlayerEnd = (e) => {
    //     console.log('onPlayerEnd e:',e);
    //     e.target.playVideo();
    //     e.target.hideVideoInfo();
    //     e.target.setLoop();
        
    // }
    // const onPlayerStateChange = (e) => {
    //     console.log('onPlayerStateChange e:',e);
    // }
    
    return(
        <section className="make_quezeshow_content_root">
            <input className="make_quezeshow_content_deletebtn" type="button" onClick={(e)=>{delete_(index)}} value={"X"}></input>
            <textarea type="text" rows={1} maxLength={80} name="content_title" className="title" placeholder={"선택지"+(index+1)+'제목'} value={content_object[index].title} onChange={(e)=>{change_title(e,index);chenge_textarea_height(e)}}></textarea>
            <textarea type="text" rows={1} maxLength={3000} name="explain_text" className="text" placeholder="설명" value={content_object[index].text} onChange={(e)=>{change_text(e,index);chenge_textarea_height(e)}}></textarea>
            {
                content_object[index].data_type === null
                ?
                <section className="make_quezeshow_queze_option">

                <div id="video" className="make_quezeshow_queze_option1">
                    <div className="all_btn" id="video" onClick={(e)=>{queze_option_click('video',index)}}>
                        <svg id="video" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="24px" height="24px"><g id="video" fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g id="video" transform="scale(5.12,5.12)"><path id="video" d="M24.40234,9c-6.60156,0 -12.80078,0.5 -16.10156,1.19922c-2.19922,0.5 -4.10156,2 -4.5,4.30078c-0.39844,2.39844 -0.80078,6 -0.80078,10.5c0,4.5 0.39844,8 0.89844,10.5c0.40234,2.19922 2.30078,3.80078 4.5,4.30078c3.50391,0.69922 9.5,1.19922 16.10156,1.19922c6.60156,0 12.59766,-0.5 16.09766,-1.19922c2.20313,-0.5 4.10156,-2 4.5,-4.30078c0.40234,-2.5 0.90234,-6.09766 1,-10.59766c0,-4.5 -0.5,-8.10156 -1,-10.60156c-0.39844,-2.19922 -2.29687,-3.80078 -4.5,-4.30078c-3.5,-0.5 -9.59766,-1 -16.19531,-1zM24.40234,11c7.19922,0 12.99609,0.59766 15.79688,1.09766c1.5,0.40234 2.69922,1.40234 2.89844,2.70313c0.60156,3.19922 1,6.60156 1,10.10156c-0.09766,4.29688 -0.59766,7.79688 -1,10.29688c-0.29687,1.89844 -2.29687,2.5 -2.89844,2.70313c-3.60156,0.69922 -9.60156,1.19531 -15.60156,1.19531c-6,0 -12.09766,-0.39844 -15.59766,-1.19531c-1.5,-0.40234 -2.69922,-1.40234 -2.89844,-2.70312c-0.80078,-2.80078 -1.10156,-6.5 -1.10156,-10.19922c0,-4.60156 0.40234,-8 0.80078,-10.09766c0.30078,-1.90234 2.39844,-2.50391 2.89844,-2.70312c3.30078,-0.69922 9.40234,-1.19922 15.70313,-1.19922zM19,17v16l14,-8zM21,20.40234l8,4.59766l-8,4.59766z"></path></g></g></svg>
                        <p id="video">영상</p>
                    </div>
                    <div id="video">

                    </div>
                </div>
                <div className="make_quezeshow_queze_option1">
                    <div className="all_btn" id="audio" onClick={(e)=>{queze_option_click('audio',index)}}>
                        <svg id="audio" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.2111 11.1056L9.73666 7.86833C8.93878 7.46939 8 8.04958 8 8.94164V15.0584C8 15.9504 8.93878 16.5306 9.73666 16.1317L16.2111 12.8944C16.9482 12.5259 16.9482 11.4741 16.2111 11.1056Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="9" stroke="white"/>
                        </svg>
                        <p id="audio">음악</p> 
                    </div>
                    <div id="audio">

                    </div>
                </div>
                <div className="make_quezeshow_queze_option1">
                    <div className="all_btn" id="image" onClick={(e)=>{queze_option_click('image',index)}}>
                        <svg id="image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.9976 14.2904L18.6544 13.9471L18.6385 13.9313C18.238 13.5307 17.9149 13.2077 17.6314 12.9687C17.3394 12.7226 17.055 12.5353 16.7221 12.4349C16.2512 12.2928 15.7488 12.2928 15.2779 12.4349C14.945 12.5353 14.6606 12.7226 14.3686 12.9687C14.0851 13.2077 13.762 13.5307 13.3615 13.9313L13.3456 13.9471C13.0459 14.2469 12.8458 14.4462 12.6832 14.5807C12.5218 14.7142 12.452 14.7359 12.4237 14.7408C12.3029 14.762 12.1785 14.7381 12.0742 14.6735C12.0498 14.6584 11.993 14.6123 11.8928 14.4285C11.7917 14.2432 11.68 13.9838 11.513 13.5942L11.4596 13.4696L11.4475 13.4414L11.4475 13.4414C11.0829 12.5907 10.7931 11.9144 10.5107 11.4126C10.2237 10.9026 9.90522 10.4984 9.44575 10.268C9.03426 10.0618 8.57382 9.97308 8.11515 10.0118C7.603 10.055 7.15716 10.3121 6.70134 10.6789C6.25273 11.04 5.73245 11.5603 5.07799 12.2148L5.07798 12.2148L5.05634 12.2364L5 12.2928V12.9999C5 13.2462 5.00007 13.4816 5.00044 13.7065L5.76344 12.9435C6.44443 12.2626 6.92686 11.7811 7.32835 11.458C7.72756 11.1366 7.98255 11.0265 8.19924 11.0082C8.47444 10.985 8.75071 11.0382 8.9976 11.162C9.192 11.2594 9.38786 11.4564 9.63918 11.903C9.89194 12.3521 10.1611 12.9783 10.5404 13.8635L10.5938 13.9881L10.6034 14.0105L10.6034 14.0105C10.7583 14.3719 10.8884 14.6754 11.0149 14.9073C11.1448 15.1455 11.3038 15.3727 11.5479 15.5238C11.8608 15.7175 12.2341 15.7894 12.5966 15.7258C12.8794 15.6761 13.1114 15.5242 13.3204 15.3513C13.524 15.183 13.7575 14.9495 14.0355 14.6714L14.0527 14.6542C14.4728 14.2341 14.766 13.9416 15.013 13.7334C15.2553 13.5292 15.4185 13.437 15.5667 13.3922C15.8493 13.307 16.1507 13.307 16.4333 13.3922C16.5815 13.437 16.7447 13.5292 16.987 13.7334C17.234 13.9416 17.5272 14.2341 17.9473 14.6542L18.9755 15.6825C18.9887 15.2721 18.9948 14.812 18.9976 14.2904Z" fill="white"/>
                            <circle cx="16.5" cy="7.5" r="1.5" fill="white"/>
                        </svg>
                        <p id="image">이미지</p> 
                    </div>
                    <div id="image">

                    </div>
                </div>
                </section>
                :
                content_object[index].data_type === 'video'//----------------------------------
                ?
                <div className="video_area">
                    <div className="youtube_component">
                        {
                            content_object[index].src === ''
                            ?
                            <div>영상 주소가 없습니다</div>
                            :
                            // <YouTube videoId={content_object[index].src} opts={opts} onReady={onPlayerReady}  onEnd={onPlayerEnd} onStateChange={onPlayerStateChange}/>
                            <YouTubeComponent id={content_object[index].src} index={index} setMax_video_length={setMax_video_length} setMax_video_length_func={setMax_video_length_func}/>
                        }
                        
                    </div>
                    <div className="text_area">
                        <input type="text" name="video_url" placeholder="영상 주소" onChange={(e)=>{change_video_url(e,index)}}></input>
                        <p>https://www.youtube.com/watch?v=M7lc1UVf-VE</p>
                        <p>https://www.youtube.com/live/M7lc1UVf-VE?si=dvn0bA8OZz8m53dL</p>
                        <div className="sliders_control">
                            <input id="fromSlider" type="range" value={content_object[index].start} min="0" max={max_video_length} onChange={(e)=>change_video_start(e,index)}/>
                            <input id="toSlider" type="range" value={content_object[index].end} min="0" max={max_video_length} onChange={(e)=>change_video_end(e,index)}/>
                        </div>
                        <div className="video_length">
                            <input type="number" name="start" id="1" value={Math.floor(content_object[index].start/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_start_input_number(e,Math.floor(content_object[index].start/60),'m',index)}}></input>
                            <div className="icon">:</div>
                            <input type="number" id="2" value={(content_object[index].start%60).toString()} max={60} onChange={(e)=>{e.target.value > 60 ? e.target.value = 60 : change_video_start_input_number(e,content_object[index].start%60,'s',index)}}></input>
                            <div className="icon">~</div>
                            <input type="number" id="1" value={Math.floor(content_object[index].end/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_end_input_number(e,Math.floor(content_object[index].end/60),'m',index)}}></input>
                            <div className="icon">:</div>
                            <input type="number" name="end" id="2" value={(content_object[index].end%60).toString()} max={60} onChange={(e)=>{ e.target.value > 60 ? e.target.value = 60 : change_video_end_input_number(e,content_object[index].end%60,'s',index)}}></input>
                        </div>
                    </div>
                </div>
                :
                content_object[index].data_type === 'audio'//-----------------------------------
                ?
                <div className="video_area">
                    <div className="youtube_component">
                        {
                            content_object[index].src === ''
                            ?
                            <div>영상 주소가 없습니다</div>
                            :
                            <YouTubeComponent id={content_object[index].src} index={index} setMax_video_length={setMax_video_length} setMax_video_length_func={setMax_video_length_func}/>
                        }
                    </div>
                    <div className="text_area">
                        <input type="text" name="video_url" placeholder="영상 주소" onChange={(e)=>{change_video_url(e,index)}}></input>
                        <p>https://www.youtube.com/watch?v=M7lc1UVf-VE</p>
                        <p>https://www.youtube.com/live/M7lc1UVf-VE?si=dvn0bA8OZz8m53dL</p>
                        <div className="sliders_control">
                            <input id="fromSlider" type="range" value={content_object[index].start} min="0" max={max_video_length} onChange={(e)=>change_video_start(e,index)}/>
                            <input id="toSlider" type="range" value={content_object[index].end} min="0" max={max_video_length} onChange={(e)=>change_video_end(e,index)}/>
                        </div>
                        <div className="video_length">
                            <input type="number" name="start" id="1" value={Math.floor(content_object[index].start/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_start_input_number(e,Math.floor(content_object[index].start/60),'m',index)}}></input>
                            <div className="icon">:</div>
                            <input type="number" id="2" value={(content_object[index].start%60).toString()} max={60} onChange={(e)=>{e.target.value > 60 ? e.target.value = 60 : change_video_start_input_number(e,content_object[index].start%60,'s',index)}}></input>
                            <div className="icon">~</div>
                            <input type="number" id="1" value={Math.floor(content_object[index].end/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_end_input_number(e,Math.floor(content_object[index].end/60),'m',index)}}></input>
                            <div className="icon">:</div>
                            <input type="number" name="end" id="2" value={(content_object[index].end%60).toString()} max={60} onChange={(e)=>{ e.target.value > 60 ? e.target.value = 60 : change_video_end_input_number(e,content_object[index].end%60,'s',index)}}></input>
                        </div>
                    </div>
                </div>
                :
                content_object[index].data_type === 'image'//-------------------------------
                ?
                <section className="make_quezeshow_content_content">
                    <div className="make_quezeshow_content_content_img_area">
                    {
                        content_object[index].src === '' || content_object[index].src === 'data:image/jpeg;base64,' 
                        ?
                        <section className="img_select_area">
                            <input id="file" type="file" className="make_quezeshow_content_file allbtn" onChange={e=>{change_img(e,index)}} onDragEnter ={dragenter} onDragLeave={dragover}></input>
                            <div className="img_select_area_onpaste allbtn" onPaste={(e)=>onpaste(e,index)}>
                                <p className="allbtn">이미지 붙여 넣기</p>
                            </div>
                        </section>
                        :
                        <img src={content_object[index].src} className="make_quezeshow_content_img"></img>
                    }
                    </div>
                </section>
                :
                null
            }
            
        </section>
    )
}
export default Make_quezeshow_content;
