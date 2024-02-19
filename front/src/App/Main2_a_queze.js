import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import './css.css';
import Header from "./ayo_world_rank_header";
import Adfit from "./Adfit";
import Footer from "./Footer";
import Drag from "./Drag";
import Drop from "./Drop";
import img from './Img_folder/zzal2.jpg';

const Main2_a_queze = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const roomName_ref = useRef();
    const title_ref = useRef();
    const [dragState, setDragState] = useState([]);
    const [dropState1,setDropState1] = useState([]);
    const [dropState2,setDropState2] = useState([]);
    const [dropState3,setDropState3] = useState([]);
    const [dropState4,setDropState4] = useState([]);
    const [dropState5,setDropState5] = useState([]);
    const [initialization_drag, setInitialization_drag] = useState([]);
    const dragIndex = useRef();
    const isDraging = useRef(false);
    // const [publicAccess,setPublicAccess] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        // /**/console.log('rerender');
        
    })

    useEffect(()=>{
        // /**/console.log('one first render')
        roomName_ref.current = searchParams.get('roomName');
        title_ref.current = searchParams.get('title');
        // const publicAccess = searchParams.get('publicAccess')
        // /**/console.log(roomName_ref.current,publicAccess,typeof(publicAccess));

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
            // console.log(res);
            img_arr.map((e,i)=>{
                // console.log('첫 element 생성 a queze img arr :',img_arr[i]);
                dragState_ = [...dragState_,{  img : img_arr[i], text : text_arr[i], uuid : uuid_arr[i]}];
            })
            // console.log('완성된 첫 element dragstate',dragState_);
            setInitialization_drag([...dragState_]);
            setDragState([...dragState_]);
            setDropState1(()=>[{  img : '', text : '', uuid : ''}]);
            setDropState2(()=>[{  img : '', text : '', uuid : ''}]);
            setDropState3(()=>[{  img : '', text : '', uuid : ''}]);
            setDropState4(()=>[{  img : '', text : '', uuid : ''}]);
            setDropState5(()=>[{  img : '', text : '', uuid : ''}]);
            // if(publicAccess==1) setPublicAccess(true);
        })
        // setDragState([{  img : img, text : 'test_text', uuid : 'test_uuid'}]);
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
            const dropState1_ = dropState1.filter((e,i)=>{
                if(e.uuid !== ''){
                    return true;
                }
                else return false;
            }).map((e,i)=>{
                return e.uuid;
            })
            const dropState2_ = dropState2.filter((e,i)=>{
                if(e.uuid !== ''){
                    return true;
                }
                else return false;
            }).map((e,i)=>{
                return e.uuid;
            })
            const dropState3_ = dropState3.filter((e,i)=>{
                if(e.uuid !== ''){
                    return true;
                }
                else return false;
            }).map((e,i)=>{
                return e.uuid;
            })
            const dropState4_ = dropState4.filter((e,i)=>{
                if(e.uuid !== ''){
                    return true;
                }
                else return false;
            }).map((e,i)=>{
                return e.uuid;
            })
            const dropState5_ = dropState5.filter((e,i)=>{
                if(e.uuid !== ''){
                    return true;
                }
                else return false;
            }).map((e,i)=>{
                return e.uuid;
            })
            axios({
                method : 'POST',
                url : process.env.REACT_APP_SERVER_URL +'/result_plus',
                data : {
                    roomName : roomName_ref.current,
                    rank : [...dropState1_,...dropState2_,...dropState3_,...dropState4_,...dropState5_]
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
        const id = JSON.parse(e.target.id); 
        const index = id.index;
        const tier = id.tier;
        // console.log( id,'index', index, 'tier', tier);
        const dragstateValue = {...dragState[dragIndex.current]};
        let dropstate;
        let dragstate = [...dragState];
        if(isDraging.current){
            if(tier === 1){
                dropstate = [...dropState1];
            }
            else if(tier === 2){
                dropstate = [...dropState2];
            }
            else if(tier === 3){
                dropstate = [...dropState3];
            }
            else if(tier === 4){
                dropstate = [...dropState4];
            }
            else if(tier === 5){
                dropstate = [...dropState5];
            }
            // console.log('dropstate',dropstate);
            if(index === 0 && dropstate.length === 1){
                // console.log('처음');
                dropstate = [{  img : '', text : '', uuid : ''} , dragstateValue, {  img : '', text : '', uuid : ''}];
            }
            else {
                // console.log('else');
                dropstate[index] = dragstateValue;
                dropstate.splice(index,0,{  img : '', text : '', uuid : ''});
                dropstate.splice(index+2,0,{  img : '', text : '', uuid : ''});
            }
            const newDrageState = dragstate.filter((e,i)=>{
                if(i === Number(dragIndex.current)){
                    // console.log('return false');
                    return false;
                }
                else return true;
            })
            // console.log('newDrageState',newDrageState);
            if(tier === 1){
                setDropState1(()=>dropstate);
            }
            else if(tier === 2){
                setDropState2(()=>dropstate);            
            }
            else if(tier === 3){
                setDropState3(()=>dropstate);            
            }
            else if(tier === 4){
                setDropState4(()=>dropstate);            
            }
            else if(tier === 5){
                setDropState5(()=>dropstate);            
            }
            setDragState(()=>newDrageState);

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
        const id = JSON.parse(e.target.id);
        const index = id.index;
        const tier = id.tier;
        let dropstate;
        if(tier === 1){
            dropstate = [...dropState1];
        }
        else if(tier === 2){
            dropstate = [...dropState2];
        }
        else if(tier === 3){
            dropstate = [...dropState3];
        }
        else if(tier === 4){
            dropstate = [...dropState4];
        }
        else if(tier === 5){
            dropstate = [...dropState5];
        }
        const dragstate = [dropstate[index],...dragState];
        const new_dropstate = dropstate.filter((e,i)=>{
            if(i === index){
                return false;
            }
            else if(i === index-1){
                return false;
            }
            else{
                return true;
            }
        })
        if(tier === 1){
            setDropState1(dropstate1=>new_dropstate);
        }
        else if(tier === 2){
            setDropState2(dropstate2=>new_dropstate);            
        }
        else if(tier === 3){
            setDropState3(dropstate3=>new_dropstate);            
        }
        else if(tier === 4){
            setDropState4(dropstate4=>new_dropstate);            
        }
        else if(tier === 5){
            setDropState5(dropstate5=>new_dropstate);            
        }
        setDragState(()=>[...dragstate])
    }
    const initialization = () => {
        setDragState(...[initialization_drag]);
        setDropState1( dropstate1=>[{  img : '', text : '', uuid : ''}]);
        setDropState2( dropstate2=>[{  img : '', text : '', uuid : ''}]);
        setDropState3( dropstate3=>[{  img : '', text : '', uuid : ''}]);
        setDropState4( dropstate4=>[{  img : '', text : '', uuid : ''}]);
        setDropState5( dropstate5=>[{  img : '', text : '', uuid : ''}]);
    }
    return(
        <div className="Main2_a_queze_root">
            <Header></Header>
            <header className="Main2_a_queze_header">
                <button title="이상형월드컵 수정하기." className="all_btn a_queze_header_btn" onClick={()=>{ window.open(`https://ay0.site/makeaquezemodify?roomName=${roomName_ref.current}&title=${title_ref.current}`, "_blank", "noopener, noreferrer");}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                    <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                    이상형 월드컵 수정 하기
                </button>
                
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
            {/* <section className="Main2_a_queze_section">
                <div className="tier_line"></div> */}
                <div className="drop_area">
                    <p className="tier1">1</p>
                {   
                    dropState1.map((e,i)=>{
                        return(
                            <Drop key={i} index={i} tier={1} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging} length={dropState1.length}  ></Drop>
                        )
                    })
                    
                }
                </div>
                <div className="drop_area">
                    <p className="tier2">2</p>
                {   
                    dropState2.map((e,i)=>{
                        return(
                            <Drop key={i} index={i} tier={2} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging} length={dropState2.length} ></Drop>
                        )
                    })
                    
                }
                </div>
                <div className="drop_area">
                    <p className="tier3">3</p>
                {   
                    dropState3.map((e,i)=>{
                        return(
                            <Drop key={i} index={i} tier={3} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging} length={dropState3.length} ></Drop>
                        )
                    })
                    
                }
                </div>
                <div className="drop_area">
                    <p className="tier4">4</p>
                {   
                    dropState4.map((e,i)=>{
                        return(
                            <Drop key={i} index={i} tier={4} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging} length={dropState4.length} ></Drop>
                        )
                    })
                    
                }
                </div>
                <div className="drop_area">
                    <p className="tier5">5</p>
                {   
                    dropState5.map((e,i)=>{
                        return(
                            <Drop key={i} index={i} tier={5} text={e.text} img={e.img} uuid={e.uuid} dropFunc={dropFunc} dropDelete={dropDelete} isDraging={isDraging} length={dropState5.length} ></Drop>
                        )
                    })
                    
                }
                </div>
            {/* </section>  */}
            <div className="main2_a_queze_btn_area">
                <button onClick={submit}>투표하기</button>
                {/* <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}&roomName=${roomName_ref.current}&publicAccess=${publicAccess}`)}}>결과 보기</button> */}
                <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}&roomName=${roomName_ref.current}`)}}>결과 보기</button>
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

