import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Quezeshow_queze_content from "@quezeshow/Quezeshow_queze_content";
import Quezeshow_comment from "@quezeshow/Quezeshow_comment";
import Header from "@header/ayo_world_rank_header";
import Adfit from "@components/Adfit";   
import Password_popup from "@password_popup/Password_popup";
import { router } from "@functions/WorldRank";
import { useSearchParams } from 'next/navigation'


export async function getServerSideProps(context) {
    // 미리 정적으로 생성할 페이지 경로들을 반환.
    return {
      props: {
        id: 'vote',
        id: 'multiple',
        id: 'descriptive',
      },
    };
}

const Quezeshow_result = ({params}) => {
    const searchParams = useSearchParams()
    const uuid = searchParams.get('uuid'); 
    const roomnum = searchParams.get('roomnum');
    const quezeshow_type = searchParams.get('quezeshow_type');
    const quezeshow_title = searchParams.get('title');
    const explain_text = searchParams.get('explain_text');

    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    // const quezeshow_title = useRef('');
    const quezeshow_explain_text = useRef('');
    const comment_input_ref = useRef();
    const allvalue = useRef(0);
    const [popup_state, setPopup_state] = useState(false);
    // const [quezeshow_type, setQuezeshow_type] = useState('');
    useEffect(()=>{
            // axios({
            //     url : process.env.REACT_APP_SERVER_URL + '/quezeshowtitle',
            //     method : 'GET',
            //     params : {roomnum : roomnum}
            // }).then(res=>{
            //     // console.log('select * from quezeshowqueze',res);
            //     if(res.data.length !== 0){
            //         quezeshow_title.current = res.data[0].title;
            //         quezeshow_explain_text.current = res.data[0].explainText;
            //         setQuezeshow_type(quezeshow_type => res.data[0].quezeshow_type);
            //     }
            // })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze',
                method : 'GET',
                params : {roomnum : roomnum}
                
            }).then(res=>{
                console.log('content',res);
                if(res.data.length === 0){
                    alert('퀴즈쇼 없음');
                }else{
                    setContent_state( content_state => [...res.data]);
                    res.data.map((e,i)=>{
                        allvalue.current += e.value;
                    })
                }
            })
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                method : 'GET',
                params : {roomnum : roomnum}
                
            }).then(res=>{
                // console.log('comment',res);
                setComment_state( content_state => [...res.data]);
            })
        // }
    },[roomnum])
    const upload_comment = () => {
        // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
        // console.log(uuid2);
        // if(uuid2 !== null){
        //     console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
        //         method : 'POST',
        //         data : {
        //             roomnum : roomnum,
        //             uuid : uuid.current,
        //             uuid2 : uuid2,
        //             title : '없음',
        //             text : comment_input_ref.current.value
        //         },
        //         headers : {
        //             'Content-Type' : 'application/json'
        //         }
        //     }).then(res=>{
        //         console.log('comment upload rres',res);
        //         axios({
        //             url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
        //             method : 'GET',
        //             params : {
        //                 roomnum : roomnum,
        //                 uuid : uuid.current,
        //                 uuid2 : uuid2,
        //                 text : comment_input_ref.current.value
        //             }
                    
        //         }).then(res=>{
        //             console.log('comment',res);
        //             setComment_state( content_state => [...res.data]);
        //             // return(
        //             //   res.data
        //             // )
        //         })
        //     })
        // }
        // else{
            const today = new Date();

            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const seconds = ('0' + today.getSeconds()).slice(-2); 

            const timeString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
                method : 'POST',
                data : {
                    roomnum : roomnum,
                    uuid : uuid.current,
                    title : '없음',
                    text : comment_input_ref.current.value,
                    date : timeString
                },
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>{
                // console.log('comment upload rres',res);
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                    method : 'GET',
                    params : {roomnum : roomnum}
                    
                }).then(res=>{
                    // console.log('comment',res);
                    setComment_state( content_state => [...res.data]);
                })
            })
        // }
      }
    const navi = () => {
        // if(uuid2 !== null){
        //     navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=${uuid2}`);
        // }else{
            // navigate(`/quezeshow_queze?roomnum=${roomnum}&uuid=${uuid}&uuid2=undefined`);
        // }
        router(`/quezeshow_queze?uuid=${uuid}&title=${quezeshow_title}&explain_text=${explain_text}&quezeshow_type=${quezeshow_type}&roomnum=${roomnum}`,{state:{tinyint : true}});
    }
    const password_checker = () => {
        setPopup_state(popup_state => !popup_state);
    }
    return(
        typeof window === 'undefined' ?
        <></>
        :
        <>
        {
            popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomName={''} title={quezeshow_title.current} publicAccess={null} type={null} typeWhere={'modify_password'} explain_text={quezeshow_explain_text.current} quezeshow_type={quezeshow_type}/> : null
        }
        <Header/>
        <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
        <div className="quezeshow_result_root">
            <section className="content">
            {
                content_state.map((e,i)=>{
                    return(
                        <Quezeshow_queze_content key={i} index={i} img={'data:image/jpeg;base64,'+e.img} text={e.text} title={e.title} uuid={e.uuid} clicked={''} setClicked={''} uuid2={e.uuid2} value={isNaN(Math.floor(e.value / allvalue.current * 100)) ? 0 : Math.floor(e.value / allvalue.current * 100)}/>
                    )
                })
            }
            </section>
            <section className="comment">
                <div className="comment_area">
                    <div className="quezeshow_result_div">
                        <input type="text" ref={comment_input_ref} id={1} placeholder="댓글 입력"></input>
                        <button onClick={upload_comment} className="all_btn" >^</button>
                    </div>
                </div>
                {
                    comment_state.map((e,i)=>{
                        // console.log('comment',e);
                        return(
                        <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid} uuid2={e.uuid2} uuid3={e.uuid3} date={e.date}/>
                        )
                    })
                }
                <div className="main2_a_queze_btn_area">
                    <button onClick={navi}>퀴즈쇼 참여하기</button>
                </div>
            </section>
        </div>
        </>
    )
}
export default Quezeshow_result;