import React,{useEffect, useRef,useState} from "react";
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
const Main2_make_queze = () => {
    const navigate = useNavigate();
    const [render, setRender] = useState(0);
    const plus_queze_arr_ref = useRef();
    const plus_queze_arr_ref2 = useRef();
    const file_ref = useRef([]);
    const [img_arr, setImg_arr] = useState([]); 
    const img_arr_ref = useRef([]);

    useEffect(()=>{
        plus_queze_arr_ref2.current = plus_queze_arr_ref.current;
        setRender({...render, render : render +1});
        console.log('render');
    },[plus_queze_arr_ref])
    useEffect(()=>{
        console.log('render');
    })
    const navigate_main2_make_queze = () => {
        navigate('/main2_make_queze');


    }
    const navigate_main2 = () => {
        navigate('/main');
    }
    const debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
    }
    const processChange = debounce();
 
    const change_img = (e) => {
        e.preventDefault();
        console.log('change img func',e);
        if(e.dataTransfer !== undefined){
            console.log('change img func dataTransfer is not undefind',e.dataTransfer.files.length);
            if(e.dataTransfer.files.length !== 0){
                img_arr_ref.current = [...img_arr_ref.current,...e.dataTransfer.files];
                console.log('drop으로 이미지 옴김',);
            }
            else{
                console.log('change img func dataTransfer is not undefind but empty',e.dataTransfer.files.length);
                img_arr_ref.current = [...img_arr_ref.current,...e.target.files];

            }
        }else {
            console.log('change img func dataTransfer is undefind',e.target.files.length);
            img_arr_ref.current = [...img_arr_ref.current,...e.target.files];
        }
        let img_arr_ = [];
        let i = 0;
        img_arr_ref.current.map(ev=>{
            const reader = new FileReader();
            reader.readAsDataURL(ev);
            reader.onload = () => {
                img_arr_ = [...img_arr_,
                    <div className="a_queze_img" key={i}>
                        <img src={reader.result} key={i}></img>                    
                        <input type="text" placeholder="설명" name="text"></input>
                        <input type="hidden" name="img_name" value={ev.name}></input>
                    </div>
                ]
                console.log('arr[i]',ev);
                setImg_arr(img_arr_);
            }     
            i++;
            e.target.style.backgroundColor = "white"
        })

        console.log('img_arr_',img_arr_);
        setImg_arr(img_arr_);
    }

    const dragenter = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = "rgb(107, 104, 255)";
    }
    const dragover = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = "white";

    } 
    return(
        <div className="Main2_root">

            <header className="Main2_header">
                <button className="" onClick={navigate_main2}>전체 문제 보기</button>
                <button className="" onClick={navigate_main2_make_queze}>문제 만들기</button>
            </header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <form encType="multipart/form-data" className="form_main2" action="http://localhost:45509/upload_img" method="POST"> {/* action="http://localhost:45509/upload_img" method="POST" */}
                <div className="main_title">
                    {/* <p>제목 : </p> */}
                    <input type="text" placeholder="제목" name="title"></input>
                </div>

                <div className="drop_img_area">
                    <input type="file" accept="image/*" multiple placeholder="이미지 선택" id={0} onChange={e=>{change_img(e)}} onDrop={change_img} onDragEnter ={dragenter} onDragLeave={dragover} name="img"></input>
                    <p>이미지를 드레그 하세요</p>
                </div>

                <div className="queze_area">
                    {/* <div className="a_queze_img" >
                        <img src={img}></img>                    
                        <input type="text" placeholder="설명" name="text"></input>
                        <input type="hidden" name="img_name"></input>
                    </div>
                    <div className="a_queze_img" >
                        <img src={img}></img>                    
                        <input type="text" placeholder="설명" name="text"></input>
                        <input type="hidden" name="img_name"></input>
                    </div> */}
                    {   
                    img_arr
                    }
                </div>
                {/* <div className="plus_queze" >
                    <img ></img>                    
                    <input type="text" placeholder="제목" ></input>
                </div><div className="plus_queze" >
                    <img  ></img>                    
                    <input type="text" placeholder="제목"></input>
                </div> */}

                <div className="Main2_sumit_btn">
                    <input type="submit" value="완료"></input>
                </div>


            </form>
        </div>
    )
}
export default Main2_make_queze;