import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [content_arr,setContent_arr] = useState([]);
    const [comments_arr, setComments_arr] = useState([]);
    const comment_input_ref = useRef();
    const roomName_ref = useRef();
    useEffect(()=>{
        roomName_ref.current = searchParams.get('roomName');

        axios({
            url : 'http://localhost:45509/main_result',
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
            res.data.map(e=>[
        
                spread_arr.push(
                    <div className="drop">
                        <img src={'data:image/jpeg;base64,'+e.img}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                        <p>{e.text}</p>
                        {/* <p>{e.value}</p> */}
                    </div>
                )
            ])
            setContent_arr(spread_arr);
        })
        axios({
            url : 'http://localhost:45509/main_a_queze_comments',
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
            res.data.map(e=>{
                arr = [...arr,
                <div id={e.parent_room_num}>
                    {e.value}좋아요 : {e.likes}
                    <form action="http://localhost:45509/main_a_queze_plus_comments" method="POST" encType="applcation/json">
                        <input type="hidden" value={roomName_ref.current} name="roomName"></input>
                        <input type="hidden" value={e.parent_room_num} name="type"></input>
                        <input type="text" name="value"></input>
                        <input type="submit" value="하위 댓글 업로드"></input>
                    </form>
                </div>
            ]
            })
            setComments_arr(arr);
            console.log('완성된 부모 댓글',arr);
        })
    },[])
    const upload_comment = (e) => {
        console.log('댓글 달기 함수 ',e);
        // axios({
        //     url : 'http://localhost:45509/main_a_queze_plus_comments',
        //     method : 'POST',
        //     data : {
        //         roomName : roomName_ref.current,
        //         type : Number(comment_input_ref.current.id),//부모인지 자식인지
        //         value : comment_input_ref.current.value
        //     },
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     }
        // }).then(res=>{
        //     console.log(res);
        // })
    }
    return(
        <>
            {content_arr}

            <input type="text" ref={comment_input_ref} id={1}></input>
            <button onClick={upload_comment}>댓글 업로드</button>
            {comments_arr}
        </>
    )
}
export default Result;