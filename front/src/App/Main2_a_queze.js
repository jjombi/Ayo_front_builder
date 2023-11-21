import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import './css.css';
import img from './Img_folder/zzal2.jpg';
const Main2_a_queze = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const [content_arr_ref.current,setContent_arr_state] = useState([]);
    // const [drop_ref.current, setDrop_state] = useState([]);
    const e_ref = useRef();
    const content_arr_ref = useRef();
    const drop_ref = useRef();
    const [render, setRender] = useState(0);
    const roomName_ref = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
        /**/console.log('rerender');
    })

    useEffect(()=>{
        /**/console.log('one first render')
        roomName_ref.current = searchParams.get('roomName');
        /**/console.log(roomName_ref.current);

        axios({
            url : 'http://localhost:45509/main_a_queze',
            method : 'POST',
            data : {
                roomName : roomName_ref.current
            },
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then((res)=>{
            const img_arr     = res.data.img;
            const text_arr    = res.data.text;
            let   queze_element_arr = []; 
            let   drop_element_arr = [];
            /**/console.log(res,img_arr,text_arr);

            for(let i = 0 ; i < img_arr.length ; i++){
                const src = 'data:image/jpeg;base64,'+img_arr[i];
                queze_element_arr = [...queze_element_arr, 
                    <div className="drag" onDrop={drop2} onDragOver={e=>e.preventDefault()} key={i+1}>
                        <img src={src} key={i} onDragStart={drag} id={`{"text": "${text_arr[i]}","tinyint":"drag", "a":${i}}`}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                        <p key={i+2}>{text_arr[i]}</p>
                    </div>
                ];
                drop_element_arr = [...drop_element_arr,
                    <>
                    <p className = "drop_rank" key={i+3} id={i}>{i+1} 등</p>
                    <div className="drop" onDrop={drop2} id={`{"type" : "first_drop","rank_num":${i}}`} onDragOver={(e)=>e.preventDefault()} key={i+1}>
                        <img src={''} key={i} id={`{"a" : ${i},"tinyint":"drop"}`} onDragStart={drag}></img>
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

        let   queze_element_arr_d = [...content_arr_ref.current]; 
        let   drop_element_arr_d  = [...drop_ref.current];
        
        /**/console.log(e_ref.current);

        const drag_obj = JSON.parse(e_ref.current.target.id); //드레그이미지 배열 위치
        const drag_src = e_ref.current.target.currentSrc; // 드레그이미지 src

        /**/console.log('i',drag_obj,drag_src);
        let drop_src;
        let drop_obj;
        let drop_dbj_parent_e_id = JSON.parse(e.target.id);
        /**/console.log('e.name',e);

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
            console.log('asdddddddddddddddddddd',drop_dbj_parent_e_id.type);
            queze_element_arr_d[Number(drag_obj.a)] = ( // 
                <div className="drag" onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={drag_obj.a+1}>
                    <img key={drag_obj.a} onDragStart={drag}  id={`{"text" : "", "a" : ${drag_obj.a}},"tinyint":"drag"`}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
                    <p key={drag_obj.a+2}></p>
                </div>
                // drop_ref.current[Number(drop_obj.a)]
            )
            drop_element_arr_d[Number(drop_obj.a)] = ( // 
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drop_obj.a}>{Number(drop_dbj_parent_e_id.rank_num)+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDrop={(e)=> {e.preventDefault();drop2(e)}} onDragOver={(e)=>e.preventDefault()} key={drop_obj.a+1}>
                    <img src={drag_src} key={drop_obj.a} id={`{"text" : "${drag_obj.text}", "a" : ${drop_obj.a},"tinyint":"drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDragStart={drag}></img>
                    <p key={drop_obj.a+2}>{drag_obj.text}</p>
                </div> 
                </>
                 
                // content_arr_ref.current[Number(drag_obj.a)]
            )

        }
        else if(drag_obj.tinyint === 'drop'){

            console.log('tinyint = drop, drop()',e);

            drop_element_arr_d[Number(drag_obj.a)] = ( // drag 시작 위치 drop꺼 들어감
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drop_obj.a}>{drag_obj.rank_num+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={drag_obj.a+1}>
                    <img src={drop_src} key={drag_obj.a} id={`{"text" : "${drop_obj.text}", "a" : ${drag_obj.a},"tinyint":"drop","rank_num":${drag_obj.rank_num}}`} onDragStart={drag}></img>
                    <p key={drag_obj.a+2}>{drop_obj.text}</p>
                </div>
                </>
                
                // drop_ref.current[Number(drop_obj.a)]
            )
            drop_element_arr_d[Number(drop_obj.a)] = ( // drop된 위치 drag꺼 들어감
                <>
                <p className = "drop_rank" key={drop_obj.a+3} id={drag_obj.rank_num}>{drop_dbj_parent_e_id.rank_num+1} 등</p>
                <div className="drop" id={`{"type" : "!first_drop","rank_num":${drag_obj.rank_num}}`} onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={drop_obj.a+1}>
                    <img src={drag_src} key={drop_obj.a} id={`{"text" : "${drag_obj.text}", "a" : ${drop_obj.a},"tinyint":"drop","rank_num":${drop_dbj_parent_e_id.rank_num}}`} onDragStart={drag}></img>
                    <p key={drop_obj.a+2}>{drag_obj.text}</p>
                </div>  
                </>
                
                // drop_ref.current[Number(drag_obj.a)]
            )

        }
        content_arr_ref.current = queze_element_arr_d;
        drop_ref.current = drop_element_arr_d;
        setRender({...render, render : render +1})
    }
    const drag = (e) => {
        /**/console.log('drag',e);
        e_ref.current = e;
    }
    const submit =()=>{
        let column_name = []
        // drop_ref.current.map((e)=>{
        //     console.log('submit e : ',JSON.parse(e.props.children[0].props.id).text);
        // })
        for(let i=0; i<drop_ref.current.length; i++){
            console.log('submit e2 : ',JSON.parse(drop_ref.current[i].props.children[0].props.id).text);
            column_name.push([JSON.parse(drop_ref.current[i].props.children[0].props.id).text,drop_ref.current.length-i]);
        }
        axios({
            method : 'POST',
            url : 'http://localhost:45509/result_plus',
            data : {
                roomName : roomName_ref.current,
                column_name : column_name
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
            <header className="Main2_header">
                <button className="" onClick={navigate_main2}>전체 문제 보기</button>
                <button className="" onClick={navigate_main2_make_queze}>문제 만들기</button>
            </header>
            <div className="drop_area">
                {drop_ref.current}
                {/* <div className="drop">
                    <img src={img} ></img>
                    <p>text </p>
                </div>  */}
            </div>
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
            <div className="main2_a_queze_btn_area">
                <button onClick={submit}>투표하기</button>
                <button onClick={e=>{e.preventDefault();navigate(`/result?roomName=${roomName_ref.current}`)}}>결과 보기</button>
            </div>
            {/* <button onClick={setRender({...render, render : render +1})}>asdasd</button> */}
        </div>
    )
}

export default Main2_a_queze;
// const drop = (e) => {
//     /**/console.log('drop',e,content_arr_ref.current,drop_ref.current);

//     let   queze_element_arr_d = [...content_arr_ref.current]; 
//     let   drop_element_arr_d  = [...drop_ref.current];
    
//     /**/console.log(queze_element_arr_d,drop_element_arr_d);

//     const i = e_ref.current.target.name; //드레그이미지 key, type is str
//     const src = e_ref.current.target.currentSrc; // 드레그이미지 src
//     const text = JSON.parse(e_ref.current.target.id); // 드레그이미지 text
//     const arr_ = JSON.parse(e.target.id);

//     /**/console.log('i',i,src,text,typeof(text),e.target.id,arr_.a,e);

//     queze_element_arr_d[Number(i)] = ( // 하단 퀴즈 아래
//         <div className="drop" key={i+1}>
//             <img key={i} onDragStart={drag} name={i} id={i}></img> {/* e.target.currentSrc  = data:image;jpeg;base64 */}
//         </div>
//     )
//     drop_element_arr_d[Number(arr_.a)] = ( // 왼쪽 상단 위
//         <div className="drop" onDrop={drop2} onDragOver={(e)=>e.preventDefault()} key={i+1}>
//             <img src={src} key={i} id={`{"text" : "${text.text}", "a" : ${arr_.a}}`} onDragStart={drag}></img>
//             <p key={i+2}>{text.text}</p>
//         </div>  
//     )
//     /**/console.log(drop_element_arr_d,queze_element_arr_d,arr_.a);
//     // setContent_arr_state(queze_element_arr_d);
//     // setDrop_state(drop_element_arr_d);
//     content_arr_ref.current = queze_element_arr_d;
//     drop_ref.current = drop_element_arr_d;
//     setRender({...render, render : render +1})

// }