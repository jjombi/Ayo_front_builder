import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import './css.css';
import img from './Img_folder/zzal2.jpg';
import img2 from './Img_folder/ayo_queze_1.png';
import Header from "./ayo_world_rank_header";
import { dragenter, dragover, server_url } from "./public/WorldRank";
const Main2_a_queze = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const e_ref = useRef();
    const content_arr_ref = useRef();
    const drop_ref = useRef();
    const [render, setRender] = useState(0);
    const roomName_ref = useRef();
    const column_ref = useRef([]);
    const navigate = useNavigate();
    useEffect(()=>{
        /**/console.log('rerender');
    })

    useEffect(()=>{
        /**/console.log('one first render')
        roomName_ref.current = searchParams.get('roomName');
        /**/console.log(roomName_ref.current);

        axios({
            url : server_url +'/main_a_queze',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then((res)=>{
            const img_arr           = res.data.img;
            const text_arr          = res.data.text;
            let   queze_element_arr = []; 
            let   drop_element_arr  = [];
            /**/console.log(res,img_arr,text_arr);

            for(let i = 0 ; i < img_arr.length ; i++){

                // column [['text1',3],['text2',2],['text3',1]] 만들기
                column_ref.current = [...column_ref.current,['',img_arr.length - i]];

                const src = 'data:image/jpeg;base64,'+img_arr[i];
                queze_element_arr = [...queze_element_arr, 
                    <div className="drag" key={i+1}>
                        <img className="all_btn" src={src} key={i} onDragStart={drag} id={`{"text": "${text_arr[i]}","tinyint":"drag", "a":${i},"drag_index" : ${i}}`}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                        <p key={i+2}>{text_arr[i]}</p>
                    </div>
                ];

                drop_element_arr = [...drop_element_arr,
                    <>
                    <p className = "drop_rank" key={i+3} id={i}>{i+1} 등</p>
                    <div className="drop" onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={i+1} >
                        <img  key={i} id={`{"a" : ${i},"tinyint":"drop","rank_num":${i}}`} onDragStart={drag} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                        <p key={i+2}></p>
                    </div>  
                    </>
                ]
                
                /**/console.log('i',i,queze_element_arr);
                
            }
            /**/console.log('after for',queze_element_arr,drop_element_arr);
            content_arr_ref.current = queze_element_arr;
            drop_ref.current = drop_element_arr;
            // setContent_arr_state(queze_element_arr);
            // setDrop_state(drop_element_arr);
            /**/console.log('useeffrct ',content_arr_ref.current,drop_ref.current);
            setRender({...render, render : render +1})
        })
    },[])
    const drop2 = (e) => {
        e.target.style.backgroundColor = "white";
        let   queze_element_arr_d = [...content_arr_ref.current]; 
        let   drop_element_arr_d  = [...drop_ref.current];
        
        /**/console.log('drage e : ',e_ref.current,'drop e : ',e);

        const drag_obj = JSON.parse(e_ref.current.target.id); //드레그이미지 배열 위치
        const drag_src = e_ref.current.target.currentSrc; // 드레그이미지 src

        /**/console.log('i',drag_obj,drag_src);
        let drop_src;
        let drop_obj;
        let drop_dbj_parent_e_id = JSON.parse(e.target.id);
        /**/console.log('e.name',e,drop_dbj_parent_e_id);

        if(drop_dbj_parent_e_id.type   === 'first_drop'){
            console.log('e.target.id === first_drop',drop_dbj_parent_e_id);
            drop_src = e.target.firstChild.currentSrc;
            drop_obj = JSON.parse(e.target.firstChild.id); // drop {teXt : aa, a : 배열 위치}
            console.log('------------------------------',e,drop_src,drop_obj);
        }
        else {
            console.log('e.target.id !== first_drop',drop_dbj_parent_e_id);
            drop_src = e.target.currentSrc;
            drop_obj = JSON.parse(e.target.id); // drop {teXt : aa, a : 배열 위치}
            console.log('------------------------------',drop_src,drop_obj);
        }
        console.log('drag_obj.tinyint : ',drag_obj.tinyint);
        if(drag_obj.tinyint === 'drag'){
            console.log('drag_obj.tinyint === drag',drop_dbj_parent_e_id.type);
            queze_element_arr_d[Number(drag_obj.a)] = ( // 
                <div className="drag" key={drag_obj.a+1}>
                    <img className="all_btn" src={drop_src} key={drag_obj.a} onDragStart={drag}  id={`{"text" : "${drop_obj.text}", "a" : ${drag_obj.a},"tinyint":"drag"}`}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                    <p key={drag_obj.a+2}>{drop_obj.text}</p>
                </div>
                // drop_ref.current[Number(drop_obj.a)]
            )
            drop_element_arr_d[Number(drop_obj.a)] = ( // 
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drop_obj.a}>{Number(drop_dbj_parent_e_id.rank_num)+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDrop={(e)=> {e.preventDefault();drop2(e)}} onDragOver={(e)=>e.preventDefault()} key={drop_obj.a+1}>
                    <img src={drag_src} key={drop_obj.a} id={`{"text" : "${drag_obj.text}", "a" : ${drop_obj.a},"tinyint":"drop","rank_num":${drop_dbj_parent_e_id.rank_num},"drag_index" : ${drag_obj.drag_index}}`} onDragStart={drag} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                    <p key={drop_obj.a+2}>{drag_obj.text}</p>
                    <button key={drop_obj.a+3} id={`{"drop_index" : ${drop_obj.a},"src" : "${drag_src}"}`} onClick={(e)=>{e.preventDefault();delete_img(e,drag_obj)}}>X</button>
                </div> 
                </>
                 
                // content_arr_ref.current[Number(drag_obj.a)]
            )
            column_ref.current[drop_obj.a][0] = drag_obj.text;
        }
        else if(drag_obj.tinyint === 'drop'){

            console.log('tinyint = drop, drop()',e);

            drop_element_arr_d[Number(drag_obj.a)] = ( // drag 시작 위치 drop꺼 들어감
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drop_obj.a}>{drag_obj.rank_num+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={drag_obj.a+1}>
                    <img src={drop_src} key={drag_obj.a} id={`{"text" : "${drop_obj.text}", "a" : ${drag_obj.a},"tinyint":"drop","rank_num":${drag_obj.rank_num}, "drag_index" : ${drag_obj.drag_index}}`} onDragStart={drag} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                    <button key={drop_obj.a+3} id={`{"drop_index" : ${drop_obj.a},"src" : "${drag_src}"}`} onClick={(e)=>{e.preventDefault();delete_img(e,drag_obj)}}>X</button>
                    <p key={drag_obj.a+2}>{drop_obj.text}</p>
                </div>
                </>
                
                // drop_ref.current[Number(drop_obj.a)]
            )
            drop_element_arr_d[Number(drop_obj.a)] = ( // drop된 위치 drag꺼 들어감
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drag_obj.rank_num}>{drop_dbj_parent_e_id.rank_num+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drag_obj.rank_num}}`} onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={drop_obj.a+1}>
                    <img src={drag_src} key={drop_obj.a} id={`{"text" : "${drag_obj.text}", "a" : ${drop_obj.a},"tinyint":"drop","rank_num":${drop_dbj_parent_e_id.rank_num},"drag_index" : ${drag_obj.drag_index}}`} onDragStart={drag} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                    <p key={drop_obj.a+2}>{drag_obj.text}</p>
                    <button key={drop_obj.a+3} id={`{"drop_index" : ${drop_obj.a},"src" : "${drag_src}"}`} onClick={(e)=>{e.preventDefault();delete_img(e,drag_obj)}}>X</button>
                </div>  
                </>
                
                // drop_ref.current[Number(drag_obj.a)]
            )
            column_ref.current[drop_obj.a][0] = drag_obj.text;
            column_ref.current[drag_obj.a][0] = drop_obj.text;


        }
        content_arr_ref.current = queze_element_arr_d;
        drop_ref.current = drop_element_arr_d;
        setRender({...render, render : render +1})
    }
    const delete_img  = (e,drag_obj) => {
        console.log('delete mothed start');
        let drop_element_arr_d = [...drop_ref.current];
        let queze_element_arr_d = [...content_arr_ref.current]; 
        let e_id = JSON.parse(e.target.id);
        drop_element_arr_d[e_id.drop_index] = (
            <>
            <p className = "drop_rank" key={e_id.drop_index+3} id={e_id.drop_index}>{e_id.drop_index+1} 등</p>
            <div className="drop" onDrop={drop2} id={`{"type" : "first_drop","rank_num":${e_id.drop_index}}`} onDragOver={(e)=>e.preventDefault()} key={e_id.drop_index+1}>
                <img src={''} key={e_id.drop_index} id={`{"a" : ${e_id.drop_index},"tinyint":"drop"}`} onDragStart={drag} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                <p key={e_id.drop_index+2}></p>
            </div>  
            </>
        )
        queze_element_arr_d[drag_obj.drag_index] = (
            <div className="drag" key={drag_obj.drag_index+1}>
                <img src={e_id.src} key={drag_obj.drag_index} onDragStart={drag} id={`{"text": "${drag_obj.text}","tinyint":"drag", "a":${drag_obj.drag_index},"drag_index" : ${drag_obj.drag_index}}`}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                <p key={drag_obj.drag_index+2}>{drag_obj.text}</p>
            </div>
        )
        column_ref.current[e_id.drop_index][0] = '';

        content_arr_ref.current = queze_element_arr_d;
        drop_ref.current = drop_element_arr_d;
        setRender({...render, render : render +1})
    }
    
    const drag = (e) => {
        /**/console.log('drag',e);
        e_ref.current = e;
    }
    const submit =(e)=>{
        e.preventDefault();
        let column_name = []
        // drop_ref.current.map((e)=>{
        //     console.log('submit e : ',JSON.parse(e.props.children[0].props.id).text);
        // })
        console.log('column_ref.current',column_ref.current);
        for(let i=0; i<drop_ref.current.length; i++){
            console.log('submit e2 : ',JSON.parse(drop_ref.current[i].props.children[0].props.id).text);
            column_name.push([JSON.parse(drop_ref.current[i].props.children[0].props.id).text,drop_ref.current.length-i]);
        }
        axios({
            method : 'POST',
            url : server_url +'/result_plus',
            data : {
                roomName : roomName_ref.current,
                column : column_ref.current
            },
            headers : {
                'Content-Type' : 'application/json'
            }

        }).then((res)=>{
            console.log(res);
            navigate(`/result?roomName=${roomName_ref.current}`);
        })
    }
    const navigate_main2_make_queze = () => {
        navigate('/main2_make_queze');
    }
    const navigate_main2 = () => {
        navigate('/main');
    }
    return(
        <div className="Main2_a_queze_root">
            <Header></Header>
            <div className="drop_area">
                {drop_ref.current}
                {/* <div className="drop">
                    <img src={img} ></img>
                    <p>text </p>
                </div>  */}
            </div>
            <div className="main2_a_queze_btn_area">
                <button onClick={submit}>투표하기</button>
                <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}`)}}>결과 보기</button>
            </div>
            {/* <button onClick={setRender({...render, render : render +1})}>asdasd</button> */}
            <div className="drag_area">
                {content_arr_ref.current}
                {/* <div className="drag" >
                    <img src={img}></img>
                    <p >text</p>
                </div>
                <div className="drag" >
                    <img src={img}></img> 
                    <p >text</p>
                </div>
                <div className="drag" >
                    <img src={img2}></img> 
                    <p >text</p>
                </div>
                <div className="drag" >
                    <img src={img}></img> 
                    <p >texasddddddddddddddddddddddddddddddddddddddddddddddd ddddddddddddddddddcdtasd</p>
                </div>
                <div className="drag" >
                    <img src={img}></img> 
                    <p >text</p>
                </div>
                <div className="drag" >
                    <img src={img}></img> 
                    <p >text</p>
                </div>
                <div className="drag" >
                    <img src={img}></img> 
                    <p >text</p>
                </div> */}
            </div>
        </div>
    )
}

export default Main2_a_queze;
