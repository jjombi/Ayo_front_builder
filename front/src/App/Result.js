import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./ayo_world_rank_header";
import { server_url } from "./public/WorldRank";
import './css.css';
import likes_img from '/src/App/Img_folder/thumb_up-1.svg';
// import {great_icon} from './Img_folder/great_icon.svg';
const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [content_arr,setContent_arr] = useState([]);
    const [comments_arr, setComments_arr] = useState([]);
    const comment_input_ref = useRef();
    const roomName_ref = useRef();
    // const [boolean,setBoolean] = useState([]);
    useEffect(()=>{
        roomName_ref.current = searchParams.get('roomName');

        axios({
            url : server_url +'/main_result',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                roomName : roomName_ref.current
            }

        }).then(res=>{
            let spread_arr = [];
            console.log(res);
            res.data.map(e=>{
        
                spread_arr = [...spread_arr,
                    <div className="result_area">
                        <img src={'data:image/jpeg;base64,'+e.img}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                        <p>{e.text}</p>
                        {/* <p>{e.value}</p> */}
                    </div>
                ]
            })
            setContent_arr(spread_arr);
        })
        axios({
            url : server_url +'/main_a_queze_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            console.log('main_a_queze_comments res : ',res);
            let arr = [];
            let boolean_arr = [];
            res.data.map(e=>{
                arr = [...arr,
                    <div className="children_comment_area">
                        <div id={e.parent_room_num} className="children_comment">
                            <p className="value">{e.value}</p>
                            <p className="likes">{e.likes}</p>
                            <img src={likes_img}></img>
                            <img ></img>
                        </div>
                        <form action= {server_url + '/main_a_queze_plus_comments'} method="POST" encType="applcation/json">
                            <input type="hidden" value={roomName_ref.current} name="roomName"></input>
                            <input type="hidden" value={e.parent_room_num} name="type"></input>
                            {/* <input type="text" name="value" className="value" placeholder="답글"></input>
                            <input type="submit" value="^" className="button all_btn" title="답글 달기"></input> */}
                        </form>
                        {/* {
                            boolean[e.parent_room_num] === true ? 
                            <div>
                                <div id={e.parent_room_num} className="children_comment">
                                    <p className="value">{e.value}</p>
                                    <p className="likes">{e.likes}</p>
                                    <img></img>
                                </div>
                            </div> 
                            : null
                        } */}
                    </div>
                ];
                // boolean_arr = [...boolean_arr,false];
                // console.log('boolean_arr',boolean_arr);
            })
            setComments_arr(arr);
            // setBoolean(boolean_arr);
            console.log('완성된 부모 댓글',arr);
        })
    },[])
    const upload_comment = (e) => {
        console.log('댓글 달기 함수 ',e);
        axios({
            url : server_url +'/main_a_queze_plus_comments',
            method : 'POST',
            data : {
                roomName : roomName_ref.current,
                type : Number(comment_input_ref.current.id),//부모인지 자식인지
                value : comment_input_ref.current.value
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            console.log(res);
        })
    }
    // const children_comments = (e) => {
    //     let arr = [...boolean];
    //     arr[e.id] = true;
    //     console.log(boolean,arr);
    //     setBoolean(arr);
    //     console.log(boolean,arr);
    //     axios({
    //         url : server_url +"/main_a_queze_children_comments",
    //         method : "POST",
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         },
    //         data : {
    //             roomName : roomName_ref.current,
    //             parent_room_num : e.target.id
    //         }
    //     }).then(res=>{
    //         console.log(res);
    //         let arr = [...content_arr];

    //     })
    // }
    return(
        <>
            <Header></Header>
            {content_arr}

            <div className="comment_area">
                <div>
                    <input type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력"></input>
                    <button onClick={upload_comment} className="all_btn" >^</button>
                </div>
            </div>
            {comments_arr}
        </>
    )
}
export default Result;