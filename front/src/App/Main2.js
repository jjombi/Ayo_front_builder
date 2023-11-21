import React, { useEffect, useState,useRef } from "react";
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
const Main2 = () => {
    const navigate = useNavigate();
    const [img_base64_arr,setImg_base64_arr] = useState();
    const a_ref = useRef(); 
    const [render, setRender] = useState(0);

    const navigate_main2_make_queze = () => {
        navigate('/main2_make_queze');
    }
    const navigate_main2 = () => {
        navigate('/main');
    }
    useEffect(()=>{
        console.log('render');
    })
    useEffect(()=>{
        axios({
            url          : 'http://localhost:45509/main_select_queze',
            method       : 'GET',
            headers      : {
                'Content-Type' : 'application/json'
            } 
        }).then((res)=>{
            let roomName_arr = [];
            let res_data_arr = [];
            let title_arr = [];
            console.log('res',res);
            res.data.result.map(e=>{
                console.log(e);
                roomName_arr.push(e.roomName);
                title_arr.push(e.title);
            })

            for(let e in res.data){
                res_data_arr.push(res.data[e]); // res.data object -> array로 변환
            }
            console.log('res_data_arr',res_data_arr[1]); // base64 /wr2f234f/wrfw4f
            a_ref.current = [];
            for(let i=0; i < res_data_arr[1].length;i++){
                console.log("i",i,'res_data_arr[i]',res_data_arr[1][i])
                const str = 'data:image/jpeg;charset=utf\-8;base64,'+res_data_arr[1][i];
                console.log('sds',str);
                a_ref.current.push(
                    <button className="plus_queze" key={i} onClick={(e)=>{e.preventDefault();A_queze_click(roomName_arr[i])}}>
                        <img src={str} key={i+1}></img>
                        <p key={i+2}>{title_arr[i]}</p>
                    </button>
                )
                
            }
            console.log(a_ref.current);
            setImg_base64_arr(a_ref.current);
        })
    },[])
    const A_queze_click = (roomName) => {
        console.log('roomName : ',roomName);
        navigate(`/main2_a_queze?roomName=${roomName}`);
    }
    const render_fn = () => {
        setRender({...render, render : render +1});
    }
    return(
        <div className="Main2_root">
            <header className="Main2_header">
                <button className="" onClick={navigate_main2}>전체 문제 보기</button>
                <button className="" onClick={navigate_main2_make_queze}>문제 만들기</button>
            </header>
            {/* <button onClick={render_fn}>asdasd</button> */}
            <div className="queze_list">
                {
                    a_ref.current
                }
                {/* <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <p >asd</p>
                </button> */}
            </div>
        </div>
    )
}
export default Main2;