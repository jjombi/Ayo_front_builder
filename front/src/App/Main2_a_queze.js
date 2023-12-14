import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import './css.css';
import img2 from './Img_folder/ayo_queze_1.png';
import Header from "./ayo_world_rank_header";
import Adfit from "./Adfit";
import Footer from "./Footer";
import { dragenter, dragover } from "./public/WorldRank";
import img1 from "./Img_folder/zzal2.jpg";
import img3 from "./Img_folder/ayo_schoolchoose_1.png";

const Main2_a_queze = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const drop_ref = useRef();
    const [render, setRender] = useState(0);
    const roomName_ref = useRef();
    const column_ref = useRef([]);
    const [drag_element,setDrag_element] = useState([]);
    const drag_element_ref = useRef([]);
    const drop_element_ref = useRef([]);
    const drag_element_dom = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
        // /**/console.log('rerender');
    })

    useEffect(()=>{
        // /**/console.log('one first render')
        roomName_ref.current = searchParams.get('roomName');
        // /**/console.log(roomName_ref.current);

        axios({
            url : process.env.REACR_APP_SERVER_URL +'/main_a_queze',
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
            // console.log(res);
            let drag_element_ = [];
            let drop_element_ = [];
            img_arr.map((e,i)=>{

                drag_element_ = [...drag_element_,
                    <div className="drag" key={i+1}>
                       <img className="all_btn" onDragStart={drag} id="drag" src={'data:image/jpeg;base64,'+img_arr[i]} key={i}></img> {/*'data:image/jpeg;base64,'+*/}
                       <p key={i+2}>{text_arr[i]}</p>
                   </div>
                ]
                drop_element_ = [...drop_element_,
                    <>
                        <p className = "drop_rank" key={i+3}>{i+1} 등</p>
                        <div className="drop" key={i+1}>
                            <button onClick={delete_img}>X</button>
                            <img onDragStart={drag} id="drop" onDrop={drop} onDragOver={(e)=>e.preventDefault()} onDragEnter ={dragenter} onDragLeave={dragover} key={i}></img>
                            <p key={i+2}>{i}</p>
                        </div>  
                    </>
                ]
            })
            drag_element_ref.current = [...drag_element_];
            drop_element_ref.current = [...drop_element_];
            setRender({...render, render : render +1});
        })
    },[])
    const drop = (e) => {
        // console.log('drop element e : ',e,drag_element,'src : ',e.target.currentSrc.length,typeof(e.target.currentSrc)); //nextElementSibling
        const drop_src = e.target.currentSrc;
        const drag_src = drag_element_dom.current.target.currentSrc;
        const drag_text = drag_element_dom.current.target.nextElementSibling.textContent;
        const drop_text = e.target.nextElementSibling.textContent;
        
        if(drag_element_dom.current.target.id === 'drag'){         // drag 하는 element가 drag 라면
            if(drop_src === ''){    // drop 당하는 element에 이미 이미지가 있으면
                e.target.src = drag_src;
                e.target.nextElementSibling.textContent = drag_text;
                // console.log('삭제 전:',drag_element_ref.current);
                let drag_element_ = [...drag_element_ref.current];
                drag_element_ = drag_element_.filter((i,ev)=>{
                    // console.log(drag_element_dom.current.target.currentSrc,i.props.children[0].props.src,drag_element_);
                    if(drag_element_dom.current.target.currentSrc === i.props.children[0].props.src){
                        // console.log('조건 맞음');
                        return false;
                    }
                    else return true;
                });

                // console.log('삭제 후:',drag_element_);
                drag_element_ref.current = [...drag_element_];
                setRender({...render, render : render +1});
            }else{

            }
        }
        else{
            // console.log('drop to drop',drag_element_ref.current);
            e.target.src = drag_src;
            e.target.nextElementSibling.textContent = drag_text;
            drag_element_dom.current.target.src = drop_src;
            drag_element_dom.current.target.nextElementSibling.textContent = drop_text;
            setRender({...render, render : render +1});

        }
        e.target.style.backgroundColor = "white";
}
    const delete_img  = (e) => {
        // console.log('delete mothed start',e);
        const img = e.target.nextElementSibling.currentSrc;
        const text = e.target.nextElementSibling.nextElementSibling.textContent;
        e.target.nextElementSibling.src = '';
        e.target.nextElementSibling.nextElementSibling.textContent = '';
        drag_element_ref.current = [
            <div className="drag" key={text}>
                <img className="all_btn" onDragStart={drag} id="drag" src={img} key={text}></img> {/*'data:image/jpeg;base64,'+*/}
                <p key={text}>{text}</p>
            </div>,
            ...drag_element_ref.current
        ]
        setRender({...render, render : render +1});

    }
    
    const drag = (e) => {
        // /**/console.log('drag',e);
        // e_ref.current = e;
        drag_element_dom.current = e;
    }
    const submit =(e)=>{
        e.preventDefault();
        let column_name = []

        // console.log('column_ref.current',column_ref.current);
        for(let i=0; i<drop_ref.current.length; i++){
            // console.log('submit e2 : ',JSON.parse(drop_ref.current[i].props.children[0].props.id).text);
            column_name.push([JSON.parse(drop_ref.current[i].props.children[0].props.id).text,drop_ref.current.length-i]);
        }
        axios({
            method : 'POST',
            url : process.env.REACR_APP_SERVER_URL +'/result_plus',
            data : {
                roomName : roomName_ref.current,
                column : column_ref.current
            },
            headers : {
                'Content-Type' : 'application/json'
            }

        }).then((res)=>{
            // console.log(res);
            navigate(`/result?roomName=${roomName_ref.current}`);
        })
    }

    return(
        <div className="Main2_a_queze_root">
            <Header></Header>
            <div className="drop_area">
                {drop_element_ref.current}

            </div>
            {/* <button onClick={()=>console.log(drag_element)}>kjnskdj </button> */}
            <div className="main2_a_queze_btn_area">
                <button onClick={submit}>투표하기</button>
                <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}`)}}>결과 보기</button>
            </div>

            <div className="drag_area">
                {drag_element_ref.current}

            </div>
            <Footer></Footer>
            <div className="margin"></div>
        </div>
    )
}

export default Main2_a_queze;

