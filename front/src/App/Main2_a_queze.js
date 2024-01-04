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
    const [initialization_drop, setInitialization_drop] = useState([]);
    const [initialization_drag, setInitialization_drag] = useState([]);
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
            setInitialization_drop([...dropState_]);
            setInitialization_drag([...dragState_]);
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
        // console.log(dragState,dragState.length);
        let boolean = true;
        // console.log('투표 완료 버튼 누름, dropState',dropState);
        dragState.map((e,i)=>{
            if(e.uuid !== ''){
                boolean = false;
            }
        })
        // console.log(boolean);
        if(!boolean){
            alert('모두 선택 해줘');
        }
        else{
            const rank = dropState.map((e,i)=>{
                return e.uuid
            })
            console.log('rank 값',rank);
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
    const initialization = () => {
        setDragState(...[initialization_drag]);
        setDropState(...[initialization_drop]);
    }
    return(
        <div className="Main2_a_queze_root">
            <Header></Header>
            <header className="Main2_a_queze_header">
                {
                    publicAccess === true ? <button title="최애티어에 세로운 선택요소를 만들 수 있습니다." className="all_btn a_queze_header_btn" onClick={()=>{ window.open(`https://ay0.site/makeaquezemodify?roomName=${roomName_ref.current}&title=${title_ref.current}`, "_blank", "noopener, noreferrer");}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                        <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" stroke-linecap="round"/>
                        </svg>
                        최애 티어 수정 하기
                  </button> : <button title="최애티어를 만든 제작자께서 수정을 허용하지 않았습니다">수정 불가</button>
                }
                {/*<h3>{title_ref.current}</h3>*/}
                {/* <h3>test title text</h3> */}
            </header>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <h3 className="a_queze_title">{title_ref.current}</h3>
            {/* {
                modify ? <Main2_make_queze_basic type="modify" roomName={roomName_ref.current} setModify={setModify} serverurl={"/upload_img_plus"}></Main2_make_queze_basic> : null
            } */}
            <div>
                <button className="initialization_btn all_btn" title="" onClick={initialization}>초기화</button>
            </div>
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
            <Footer tinyint={false}></Footer>
            <div className="margin"></div>
        </div>
    )
}

export default Main2_a_queze;

