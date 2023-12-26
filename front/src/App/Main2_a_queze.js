import axios from "axios";
import React, { useEffect, useRef, useState, useReducer } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import './css.css';
import img2 from './Img_folder/ayo_queze_1.png';
import Header from "./ayo_world_rank_header";
import Adfit from "./Adfit";
import Footer from "./Footer";
import { dragenter, dragover } from "./public/WorldRank";
import img1 from "./Img_folder/zzal2.jpg";
import img3 from "./Img_folder/ayo_schoolchoose_1.png";
import Drag from "./Drag";
import Drop from "./Drop";


const Main2_a_queze = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [render, setRender] = useState(0);
    const roomName_ref = useRef();
    const title_ref = useRef();
    const [dragState,setDragState] = useState([]);
    const [dropState,setDropState] = useState([]);
    const dragIndex = useRef();
    const isDraging = useRef(false);
    const [publicAccess,setPublicAccess] = useState(false);
    const [modify,setModify] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        // /**/console.log('rerender');
        
    })

    useEffect(()=>{
        /**/console.log('one first render')
        roomName_ref.current = searchParams.get('roomName');
        title_ref.current = searchParams.get('title');
        const publicAccess = searchParams.get('publicAccess')
        /**/console.log(roomName_ref.current,publicAccess,typeof(publicAccess));

        axios({
            url : process.env.REACT_APP_SERVER_URL +'/main_a_queze',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then((res)=>{
            const img_arr = res.data.img;
            const text_arr = res.data.text;
            const uuid_arr = res.data.uuid;
            let dragState_ = [];
            let dropState_ = [];
            // console.log(res);
            img_arr.map((e,i)=>{
                // console.log('첫 element 생성 a queze img arr :',img_arr[i]);
                dragState_ = [...dragState_,{  img : 'data:image/jpeg;base64,'+img_arr[i], text : text_arr[i], uuid : uuid_arr[i]}];
                dropState_ = [...dropState_,{  img : ''                                  , text : ''         , uuid : ''}]
            })
            // console.log('완성된 첫 element dragstate',dragState_,'drop :',dropState_);
            setDragState([...dragState_]);
            setDropState([...dropState_]);
            if(publicAccess==1) setPublicAccess(true);
        })
        // setDragState([{  img : img1, text : 'test_text', uuid : 'test_uuid'}]);
        // setDropState([{  img : ''                                  , text : ''         , uuid : ''}]);
        // setPublicAccess(true)
    },[])



    const submit =(e)=>{
        e.preventDefault();
        // console.log('투표 완료 버튼 누름, dropState',dropState);
        const rank = dropState.map((e,i)=>{
            return e.uuid
        })
        // console.log('rank 값',rank);
        axios({
            method : 'POST',
            url : process.env.REACT_APP_SERVER_URL +'/result_plus',
            data : {
                roomName : roomName_ref.current,
                rank : rank
            },
            headers : {
                'Content-Type' : 'application/json'
            }

        }).then((res)=>{
            // console.log(res);
            navigate(`/result?roomName=${roomName_ref.current}`);
        })
    }

    const dropFunc = (e) => {
        // console.log('drop 함수 실행 됨',isDraging.current);
        if(isDraging.current){
            const dropIndex = e.target.id;
            let dropstate = [...dropState];
            let dragstate = [...dragState];
            const dragstateValue = {...dragState[dragIndex.current]}
            const dropstateValue = {...dropState[dropIndex]}
            // console.log('drop 값',dropstateValue, dropIndex, 'drag 값', dragstateValue, dragIndex.current);
            dropstate[dropIndex] = dragstateValue;
            dragstate[dragIndex.current] = dropstateValue;
            // console.log('drop 배열 변경 후 ',dropstate, 'drag 배열 변경 후', dragstate);
            setDragState([...dragstate]);
            setDropState([...dropstate]);
            isDraging.current = false;
        }
        e.target.style.backgroundColor = 'white';
    }
    const dragStartFunc = (e) => {
        // console.log('drag 함수 시작 됨');
        dragIndex.current = e.target.id;
        isDraging.current = true;
        // console.log('drag 함수 끝',isDraging.current);

    }
    const dropDelete = (e) => {
        // console.log('dropDelete 이미지 삭제 하는 함수 시작 됨');
        const dropIndex = e.target.id;
        const dragstate = [...dragState];
        let dropstate = [...dropState];
        dropstate[dropIndex] = {img : '', text : '', uuid : ''};
        const dropstateValue = {...dropState[dropIndex]};
        setDragState([dropstateValue,...dragstate])
        setDropState([...dropstate]);
    }
    return(
        <div className="Main2_a_queze_root">
            <Header></Header>
            <header className="Main2_a_queze_header">
                {
                    publicAccess === true ? <button className="all_btn a_queze_header_btn" onClick={()=>{ window.open(`https://ay0.netlify.app/makeaquezemodify?roomName=${roomName_ref.current}`, "_blank", "noopener, noreferrer");}}>월드컵 수정 하기</button> : null
                }
                {/*<h3>{title_ref.current}</h3>*/}
                {/* <h3>test title text</h3> */}
            </header>
            <h3>test title text</h3>
            {/* {
                modify ? <Main2_make_queze_basic type="modify" roomName={roomName_ref.current} setModify={setModify} serverurl={"/upload_img_plus"}></Main2_make_queze_basic> : null
            } */}
            <div className="drop_area">
            {   
                dropState.map((e,i)=>{
                    return(
                        <Drop key={i} drop_element_index={i} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging}></Drop>
                    )
                })
            }
            </div>
            <div className="main2_a_queze_btn_area">
                <button onClick={submit}>투표하기</button>
                <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}`)}}>결과 보기</button>
            </div>

            <div className="drag_area">
                {   
                    dragState.map((e,i)=>{
                        return(
                            <Drag key={i} drag_element_index={i} text={e.text} img={e.img} uuid={e.uuid} dragStartFunc={dragStartFunc}></Drag>
                        )
                    })
                }
            </div>
            <Footer></Footer>
            <div className="margin"></div>
        </div>
    )
}

export default Main2_a_queze;

